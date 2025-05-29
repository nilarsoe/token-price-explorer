# 💱 Token Price Explorer

A simple Token Swap Interface built with React and Tailwind CSS. This tool allows users to input a USD amount, select two tokens (From and To), and get approximate conversion values for both based on real-time price data.

---

## ✨ Features

- Select "From" and "To" crypto tokens
- Input USD amount to get conversion values
- Real-time price fetching from `@funkit/api-base`
- Minimal, responsive UI using Tailwind CSS
- Supports USDC, USDT, ETH, WBTC across multiple chainIds

---

## 🔧 Tech Stack

- React
- Tailwind CSS
- Vite
- TypeScript
- @funkit/api-base

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
git clone https://github.com/nilarsoe/token-price-explorer.git
cd token-price-explorer
npm install
# or
yarn
```

### Run Locally

```bash
npm run dev
# or
yarn dev
```

### Build for Production

```bash
npm run build
# or
yarn build
```

---

## 🌐 Live Demo

Deployed on [Vercel](https://token-price-explorer.vercel.app/)

---

## 🗂️ Project Structure

```
src/
  ├── api/
  │   └── funkitApi.ts       # API integration
  ├── components/
  │   └── TokenSwap.tsx      # Main component
  ├── App.tsx
  └── main.tsx
```

---

## 📌 Notable Decisions

- Used minimal styling to focus on clarity
- Tailwind CSS for utility-first design
- Componentized design to scale easily
- Error states and fallback included in logic

---

## 🧪 Assumptions

- Only basic input validation for demo
- Supported tokens are predefined in code
- Fallbacks in case price API returns invalid response

---

## 📄 License

MIT License

---

## 🙋‍♀️ Author

**Nilar Soe**  
📧 Email: ms.nilarsoe@gmail.com  
📱 Singapore | Available Immediately
