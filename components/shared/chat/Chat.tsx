import React, { useState } from "react";
import SocketService from "@/services/socketService";
import { User } from "@/types/auth";
import { BaseStateType } from "@/types/roulette";

interface ChatProps {
  user: User | null;
  state: BaseStateType;
}

const Chat: React.FC<ChatProps> = ({ user, state }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    if (!user) {
      console.error("User is not defined");
      return;
    }

    SocketService.emit("send-message", {
      text: newMessage,
      userId: user._id,
    });

    setNewMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="chat-container bg-gray-900 text-white p-4 rounded-lg flex flex-col h-full max-h-[86vh]">
      <div className="chat-header flex justify-between mb-4">
        <h2 className="text-lg font-bold">English Room</h2>
        <span>581 / 830</span>
      </div>

      <div className="chat-messages flex-grow overflow-y-auto relative">
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-gray-900 to-transparent z-10 pointer-events-none"></div>
        {state.messages.map((message, index) => (
          <div key={index} className="message flex items-center mb-2">
            <img
              src={message.profileImage}
              alt="avatar"
              className="w-8 h-8 rounded-full mr-2 object-cover"
            />
            <div className="message-content flex flex-col">
              <div className="flex items-center">
                <span className="text-xs text-gray-400 mr-2">
                  {message.level}
                </span>
                <strong className="username font-semibold text-white mr-2">
                  {message.username}
                </strong>
              </div>
              <span className="text text-gray-300">{message.text}</span>
            </div>
          </div>
        ))}
        <div />
      </div>

      <div className="chat-input mt-4 flex items-center relative">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow p-2 bg-gray-800 rounded-l-lg focus:outline-none text-sm"
          placeholder="Type a message..."
        />
        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="bg-gray-700 p-2 rounded-r-lg focus:outline-none"
          >
            &#x22EE;
          </button>
          {isDropdownOpen && (
            <div className="absolute bottom-full right-0 mb-2 w-[12rem] bg-gray-800 border border-gray-700 rounded shadow-lg z-50">
              <ul className="py-1">
                <li className="block px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer">
                  Option 1
                </li>
                <li className="block px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer">
                  Option 2
                </li>
                <li className="block px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer">
                  Option 3
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .chat-messages::-webkit-scrollbar {
          width: 8px;
        }
        .chat-messages::-webkit-scrollbar-track {
          background: #2d2d2d;
        }
        .chat-messages::-webkit-scrollbar-thumb {
          background-color: #888;
          border-radius: 10px;
          border: 2px solid #2d2d2d;
        }
        .chat-messages::-webkit-scrollbar-thumb:hover {
          background-color: #555;
        }
      `}</style>
    </div>
  );
};

export default Chat;
