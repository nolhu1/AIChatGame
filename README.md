# AI Chat Game Prototype

## 🧠 Overview
A mobile prototype that enables real-time, AI-augmented chat rooms ("lobbies") with gameplay elements.

## 🏗️ Architecture
See [assets/architecture.png](./assets/architecture.png).

- React Native (Expo)
- Node.js + Socket.IO server
- OpenAI (ChatGPT) for AI agents

## 💬 Prompt Strategy
- Each AI bot uses a lightweight prompt like:
  > "You are an energetic trivia game host. Keep it short, lively, and fun."

- Chat is streamed using OpenAI's `/v1/chat/completions` with `stream=true`.

## 🚀 Build Instructions

### Mobile
```bash
npm install
npx expo start --dev-client
# AIChatGameProject
