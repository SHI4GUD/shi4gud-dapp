<p align="center">
  <a href="https://shi4gud.com" target="_blank">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="public/assets/logos/shi4gud-light.svg">
      <source media="(prefers-color-scheme: light)" srcset="public/assets/logos/shi4gud-dark.svg">
      <img alt="SHI4GUD Logo" src="public/assets/logos/shi4gud-dark.svg" width="250">
    </picture>
  </a>
</p>

<h1 align="center">SHI4GUD - Stake to earn. Donate to burn.</h1>

<p align="center">
  <a href="https://vitejs.dev" target="_blank"><img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white" alt="Vite"></a>
  <a href="https://react.dev" target="_blank"><img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" alt="React"></a>
  <a href="https://www.typescriptlang.org" target="_blank"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://tailwindcss.com" target="_blank"><img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white" alt="Tailwind CSS"></a>
  <a href="https://www.wagmi.sh" target="_blank"><img src="https://img.shields.io/badge/wagmi-black?style=flat&logo=wagmi" alt="Wagmi"></a>
  <a href="https://www.rainbowkit.com" target="_blank"><img src="https://img.shields.io/badge/🌈%20RainbowKit-0052FF?style=flat" alt="RainbowKit"></a>
</p>

<p align="center">
    <a href="./LICENSE" target="_blank"><img src="https://img.shields.io/github/license/SHI4GUD/shi4gud-dapp?style=flat" alt="License"></a>
    <img src="https://img.shields.io/github/package-json/v/SHI4GUD/shi4gud-dapp?style=flat" alt="Version">
    <a href="https://x.com/SHI4GUD" target="_blank"><img src="https://img.shields.io/badge/@SHI4GUD-black?style=flat&logo=x&logoColor=white" alt="Project on X"></a>
    <a href="https://x.com/CryptoMonark" target="_blank"><img src="https://img.shields.io/badge/Dev:-@CryptoMonark-black?style=flat&logo=x&logoColor=white&labelColor=black" alt="Author on X"></a>
</p>

<p align="center">
  A multichain DeFi platform that burns tokens for charity while rewarding stakers. Support good causes through MemeFi.
  <br />
  <a href="https://docs.shi4gud.com"><strong>Explore the docs »</strong></a>
  <br />
  <br />
</p>

<!-- TABLE OF CONTENTS -->
## Table of Contents

1.  [About The Project](#about-the-project)
    *   [Key Features](#key-features)
    *   [Built With](#built-with)
    *   [Architecture Overview](#architecture-overview)
    *   [SHI4GUD Telegram Bot](#shi4gud-telegram-bot)
2.  [Support and Contact](#support-and-contact)
3.  [Technical Documentation](#technical-documentation)
4.  [Getting Started](#getting-started)
    *   [Prerequisites](#prerequisites)
    *   [Installation](#installation)
    *   [Usage](#usage)
        *   [Available Scripts](#available-scripts)
5.  [Acknowledgments](#acknowledgments)

---

## About The Project

**SHI4GUD** is a multichain DeFi platform featuring a Burn Bank mechanism that combines staking with charitable donations and token burning. The core principle is simple: stake your tokens to become part of the ecosystem, then donate ETH to automatically burn tokens from the staking pool. This process creates deflationary pressure on the staked token while supporting good causes and rewarding a lucky staker from the pool.

The dApp integrates directly with the Charity Burn Mechanism (CBM) technology developed by the [Shina Inu (SHI)](https://shinatoken.com) team. It is built with a modern tech stack including Vite, React, TypeScript, and wagmi for a fast and secure user experience.

### Key Features

*   ✅ **Flexible & Multichain**: The architecture supports staking for any ERC-20 token on any EVM-compatible blockchain.
*   🔥 **Token Burning**: Donations trigger automatic burning of tokens from the staking pool.
*   💖 **Charitable Donations**: A portion of every donation is routed to a registered charity through an [Endaoment Fund](https://app.endaoment.org/gud).
*   🎁 **Lottery Rewards**: Win a share of donations in a lottery-like drawing just by staking.
*   📈 **On-Chain Price Oracles**: The burn mechanism relies on Uniswap V2/V3 pools directly for real-time, on-chain pricing.
*   ⚖️ **Weighted, Verifiable Rewards**: Stakers are chosen for rewards based on their minimum stake held throughout an entire epoch, with randomness sourced from future block hashes.
*   🤝 **Decentralized Voting**: A network of off-chain nodes executes the reward selection and votes on-chain to achieve consensus.

### Built With

This project leverages the power of modern web and blockchain development tools.

*   **Frontend Framework**: [Vite](https://vitejs.dev/) (v6+), [React](https://react.dev/) (v19+)
*   **Language**: [TypeScript](https://www.typescriptlang.org/) (v5.8+)
*   **Styling**: [Tailwind CSS](https://tailwindcss.com/) (v4+)
*   **Web3 Integration**: [wagmi](https://wagmi.sh/) (v2.14+), [RainbowKit](https://www.rainbowkit.com/) (v2.2+), [viem](https://viem.sh/) (v2.27+)
*   **State Management**: [TanStack React Query](https://tanstack.com/query/latest) (v5.75+)
*   **Routing**: [React Router DOM](https://reactrouter.com/) (v7.6+)
*   **UI Components**: [Lucide React](https://lucide.dev/) (v0.508+), [React Select](https://react-select.com/) (v5.10+)
*   **Development Tools**: [ESLint](https://eslint.org/) (v9+), [Prettier](https://prettier.io/)

### Architecture Overview
The SHI4GUD dApp is a modern web application built on a robust and transparent stack. Here's a high-level look at its components:

*   **Frontend**: The user interface is built with React and powered by Vite for a fast, modern development experience. The source code for the dApp is available in this repository: [`SHI4GUD/shi4gud-dapp`](https://github.com/SHI4GUD/shi4gud-dapp).
*   **Blockchain Interaction**: We use wagmi and viem to handle blockchain interactions. Wallet connections are managed by RainbowKit.
*   **Smart Contracts**: The application's core logic is decentralized in a suite of smart contracts. The source code is available at [`shi4gud/shi4gud-contracts`](https://github.com/shi4gud/shi4gud-contracts), and you can find detailed documentation for each contract in the ["Contract & Oracles"](https://docs.shi4gud.com/smart-contracts/ktv2factory-contract) section of the docs.
*   **Off-Chain Services**: A network of off-chain nodes executes the reward selection and votes on-chain to achieve consensus. The source code for the node is available at [`shi4gud/shi4gud-node`](https://github.com/shi4gud/shi4gud-node), and you can find detailed documentation in the ["Off-Chain Nodes"](https://docs.shi4gud.com/node/ktoc) section of the docs.

### SHI4GUD Telegram Bot

The SHI4GUD Telegram Bot allows anyone to monitor a Burn Bank smart contract directly within their Telegram group. It provides real-time notifications for key events, helping communities stay up-to-date with a project's Burn Bank activity.

The official bot can be found on Telegram at [@Shi4gudBot](https://t.me/Shi4gudBot). For more details on its features and commands, please refer to the [**Telegram Bot documentation**](https://docs.shi4gud.com/telegram-bot).

---

## Support and Contact

If you find this project useful and want to support its continued development, you can make a donation to the following address on the Ethereum network.

- **ETH/ERC-20 Donation Address**:
  ```text
  0x16078d45dAcAFBBA7F2890C6d8E428657ec9EFFf
  ```

ETH and stablecoins are preferred, but any ERC-20 token is greatly appreciated. Thank you for your support!

You can also reach out through the following channels:

- **Project on X (Twitter)**: [@SHI4GUD](https://x.com/SHI4GUD)
- **Developer on X (Twitter)**: [@CryptoMonark](https://x.com/CryptoMonark)
- **Website**: [shi4gud.com](https://shi4gud.com)

---

## Technical Documentation

To learn about the architecture and core mechanics of the SHI4GUD platform, please explore our official technical documentation. The docs provide in-depth explanations of the smart contracts, off-chain services, and deployment details.

*   [**Official Deployments Addresses**](https://docs.shi4gud.com/official-deployments-addresses/): A complete list of supported chains, tokens, and official contract addresses.
*   [**Contracts & Oracles**](https://docs.shi4gud.com/smart-contracts/ktv2factory-contract): A function-by-function explanation of the core smart contracts and the oracles that power them.
*   [**Off-Chain Nodes**](https://docs.shi4gud.com/node/ktoc): An explanation of the off-chain node system, including the core vote-and-reward process and guides for operators.
*   [**Charitable Donations**](https://docs.shi4gud.com/charity/): An explanation of the on-chain donation mechanism and its integration with our official charity partner, Endaoment.
*   [**dApp Technical Overview**](https://docs.shi4gud.com/dapp-technical-overview/architecture-and-codebase): A technical overview of the dApp, its architecture, and guidance on exploring the open-source codebase.
*   [**Telegram Bot**](https://docs.shi4gud.com/telegram-bot): An explanation of the official Telegram bot for monitoring Burn Bank contracts in real-time.

For a general overview of the platform's features (like staking, rewards, and burning), please refer to the FAQ on our main website.

*   🌐 **Main Website**: [shi4gud.com](https://shi4gud.com)
*   ❓ **FAQ**: [shi4gud.com/faq](https://shi4gud.com/faq)
*   🚀 **dApp**: [app.shi4gud.com](https://app.shi4gud.com)
*   📝 **Docs**: [docs.shi4gud.com](https://docs.shi4gud.com)

---

## Getting Started

Follow these steps to set up a local development environment.

### Prerequisites

*   **Node.js**: Version 20.x or newer is recommended. Download from [nodejs.org](https://nodejs.org/).
*   **API Keys & Project ID**:
    *   **WalletConnect Project ID:** Get a Project ID from [WalletConnect Cloud](https://cloud.walletconnect.com/) to enable wallet connections.
    *   **Alchemy API Key:** An Alchemy API key is required for reliable RPC communication. Get one from [Alchemy's website](https://www.alchemy.com/).
    *   **Infura API Key (Optional):** An Infura API key can be used as a fallback RPC for Alchemy. Get one from [Infura's website](https://www.infura.io/).

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/SHI4GUD/shi4gud-dapp.git
    cd shi4gud-dapp
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    *   Create a `.env` file in the project root.
    *   **Important:** Ensure `.env` is listed in your `.gitignore` file to protect your keys.
    *   Add the following variables to your `.env` file, replacing the placeholder text with your actual credentials.

    ```dotenv
    # WalletConnect Project ID (Required for wallet connections)
    VITE_WALLETCONNECT_PROJECT_ID="your_walletconnect_project_id_here"

    # RPC Provider API Key (Required for fetching blockchain data)
    VITE_ALCHEMY_ID="your_alchemy_id_here"

    # Optional RPC Provider as fallback for Alchemy
    VITE_INFURA_ID="your_infura_id_here"

    # Application URL
    VITE_APP_URL="http://localhost:5173"

    # Optional: URL to a separate main website. If set, the header logo will link here.
    VITE_WEBSITE_URL="https://shi4gud.com"
    ```

### Usage

Run the development server with the following command:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (or the port shown in your terminal).

#### Available Scripts

| Script            | Description                                          |
| ----------------- | ---------------------------------------------------- |
| `npm run dev`     | Starts the development server.                       |
| `npm run build`   | Builds the app for production.                       |
| `npm run preview` | Previews the production build locally.               |
| `npm run lint`    | Lints the codebase using ESLint.                     |
| `npm run lint:fix`| Lints and automatically fixes issues.                |
| `npm run format`  | Formats code using Prettier.                         |
| `npm run typecheck`| Performs a static type check using TypeScript.     |

---

## Acknowledgments

*   The [Shina Inu (SHI)](https://shinatoken.com) team for developing the Charity Burn Mechanism (CBM) technology.
    *   **Website**: [shinatoken.com](https://shinatoken.com)
    *   **X (Twitter)**: [@ShinaToken](https://x.com/ShinaToken)
    *   **Telegram**: [t.me/newShinaTokenPortal](https://t.me/newShinaTokenPortal)
*   All the incredible open-source libraries that made this project possible.