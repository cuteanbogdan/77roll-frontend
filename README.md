# 77Roll Frontend

This is the frontend repository for 77Roll, a web-based gaming platform featuring games like Coinflip and Roulette. The frontend is built with Next.js and integrates with the backend API for authentication, game mechanics, and transactions.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Running the App](#running-the-app)
- [Environment Variables](#environment-variables)

## Features

- **User Interface**: Intuitive and responsive user interface built with React and Tailwind CSS.
- **Real-time Gameplay**: Integration with the backend's WebSocket for real-time multiplayer Coinflip and Roulette games.
- **Authentication**: Secure authentication flow using JWT.
- **Profile Management**: Users can view their statistics, manage account settings, and view transaction history.
- **Cryptocurrency Transactions**: Integrated with CoinPayments for handling deposits and withdrawals.

## Tech Stack

- **Next.js**: React framework for server-side rendering and static site generation.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **Socket.IO**: Real-time communication for interactive gameplay.
- **TypeScript**: Strongly typed JavaScript for improved code reliability.
- **Axios**: HTTP client for communicating with the backend API.

## Prerequisites

Before running the frontend locally, make sure you have:

- Node.js (v18.x or above)
- Backend API running (from the [77Roll Backend](https://github.com/cuteanbogdan/77roll-backend))

## Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/cuteanbogdan/77roll-frontend.git
   cd 77roll-frontend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Configure environment variables**:
   Create a `.env.local` file in the root directory and add the necessary environment variables (see [Environment Variables](#environment-variables)).

## Running the App

To start the frontend app in development mode:

```bash
npm run dev
```

The app should now be running on `http://localhost:3000`.

### Running in Production Mode

To build and start the frontend app in production mode:

```bash
npm run build
npm start
```

## Environment Variables

You need to define the following environment variables in the `.env.local` file:

```env
NEXT_PUBLIC_BACKEND_URL=<Your backend URL, e.g., http://localhost:8080>
```
