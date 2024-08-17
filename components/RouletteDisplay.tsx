import React, { useEffect, useRef } from "react";
import SocketService from "@/services/socketService";

const RouletteDisplay: React.FC<{
  numbers: RouletteNumber[];
  targetNumber: number;
  roundNumber: number;
  onAnimationComplete: () => void;
  loading: boolean;
}> = ({ numbers, targetNumber, roundNumber, onAnimationComplete, loading }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const blockWidth = 96; // Width of each block
  const totalWidth = numbers.length * blockWidth;
  const speedRef = useRef(80); // Start with a high speed for random spin
  const offsetRef = useRef(0);
  const phaseRef = useRef<"random" | "landing">("random"); // Control phases

  const applyTransform = (offset: number) => {
    if (contentRef.current) {
      contentRef.current.style.transform = `translateX(-${offset}px)`;
    }
  };

  useEffect(() => {
    let animationFrameId: number;
    let timeoutId: number;

    const animate = () => {
      // Update offset based on current speed
      offsetRef.current += speedRef.current;

      // Reset offset if it exceeds total width
      if (offsetRef.current >= totalWidth) {
        offsetRef.current -= totalWidth;
      }

      // Apply the current transform based on the updated offset
      applyTransform(offsetRef.current);

      if (phaseRef.current === "random") {
        // Gradually reduce speed during random spinning
        speedRef.current *= 0.99;

        // After a certain speed threshold, switch to landing phase
        if (speedRef.current < 10) {
          phaseRef.current = "landing";
          speedRef.current = 10; // Reset to a stable speed for landing
        }
      }

      if (phaseRef.current === "landing") {
        const targetDiv = contentRef.current?.querySelector(
          `[data-number="${targetNumber}"]`
        ) as HTMLDivElement;

        if (!targetDiv) return;

        const targetPosition =
          targetDiv.offsetLeft -
          (containerRef.current?.clientWidth ?? 0) / 2 +
          blockWidth / 2;

        const distance =
          (targetPosition - offsetRef.current + totalWidth) % totalWidth;

        // Gradually reduce speed as we approach the target
        if (Math.abs(distance) < blockWidth) {
          speedRef.current *= 0.9; // Further reduce speed when close to target
        }

        if (speedRef.current < 1 || Math.abs(distance) < 1.5) {
          applyTransform(targetPosition); // Snap to target position
          speedRef.current = 0; // Stop the animation
          console.log("Animation stopped.");
          onAnimationComplete();

          // Wait for 2 seconds after the animation is over
          setTimeout(() => {
            // Emit the event to reset bets
            SocketService.emit("reset-bets-after-animation", {});
          }, 1000);
          clearTimeout(timeoutId);
          return;
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Always trigger the animation when the targetNumber or roundNumber changes
    speedRef.current = 60;
    phaseRef.current = "random";
    offsetRef.current = 0;
    console.log(
      "Starting animation with new target:",
      targetNumber,
      "for round:",
      roundNumber
    );
    animationFrameId = requestAnimationFrame(animate);

    timeoutId = window.setTimeout(() => {
      console.log("Fallback triggered.");
      onAnimationComplete();
      SocketService.emit("reset-bets-after-animation", {});
    }, 5000);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, [targetNumber, roundNumber, numbers]);

  return (
    <div className="relative w-full h-full">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
          <div className="text-white text-2xl">Loading...</div>
        </div>
      )}
      <div
        ref={containerRef}
        className="relative w-full overflow-hidden rounded-lg"
      >
        <div className="absolute inset-y-0 left-1/2 transform -translate-x-1/2 z-10 w-1 bg-yellow-500"></div>
        <div ref={contentRef} className="flex items-center whitespace-nowrap">
          {[...numbers, ...numbers].map((item, index) => (
            <div
              key={index}
              data-number={item.number}
              className={`flex-shrink-0 w-24 h-24 flex justify-center items-center text-white text-4xl font-bold ${
                item.color === "green"
                  ? "bg-green-500"
                  : item.color === "red"
                  ? "bg-red-500"
                  : "bg-gray-700"
              }`}
            >
              {item.number}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RouletteDisplay;
