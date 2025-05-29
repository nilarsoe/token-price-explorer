# 🪙 Token Price Explorer

A simplified token swap interface built with React that allows users to select two crypto tokens, input a USD amount, and view the estimated equivalent values based on live token price data.

## 🚀 Live Demo

🔗 [https://token-price-explorer.vercel.app](https://token-price-explorer.vercel.app)

## 📦 Tech Stack

- **React** – UI framework
- **TypeScript** – Static typing
- **Vite** – Fast build tool
- **Tailwind CSS** – Styling
- **@funkit/api-base** – For fetching token metadata and price info

## 📚 Features

- Select a **source** and **target** crypto token
- Enter a USD amount
- Instantly view equivalent token values based on live prices
- Responsive and clean UI
- Minimal, intuitive layout

## 🛠️ Getting Started

### Prerequisites

Make sure you have `Node.js` (>=18) and `npm` installed.

### Installation

```bash
git clone https://github.com/nilarsoe/token-price-explorer.git
cd token-price-explorer
npm install
npm run dev
```

Then open your browser at [http://localhost:5173](http://localhost:5173)

## ⚙️ API Integration

This project uses the `@funkit/api-base` package to fetch:

- ERC20 token metadata
- Token price data by chainId and address

### API Key

A development key (`Z9SZaOwpmE40KX61mUKWm5hrpGh7WHVkaTvQJpQk`) is used for testing purposes. You may change this in `src/config.ts` if needed.

## 🧠 Assumptions & Notes

- The token list is **hardcoded** in `tokenList.ts` for simplicity.
- No external state management is used (only React Hooks).
- The UI is based on a wireframe provided in the task but styled freely using Tailwind CSS.
- Error handling and loading states are minimal but structured for easy enhancement.

## 📌 Notable Tokens Supported

| Token           | Symbol | Chain ID |
| --------------- | ------ | -------- |
| USD Coin        | USDC   | 1        |
| Tether          | USDT   | 137      |
| Ethereum        | ETH    | 8453     |
| Wrapped Bitcoin | WBTC   | 1        |

## 🔍 Future Improvements (Optional)

- Add loading indicators and error messages
- Fetch token list dynamically via API
- Add input validation (e.g., USD amount must be > 0)
- Support real token swap logic

## 📄 License

This project is for assessment purposes only.
