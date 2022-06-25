# simple-market-data

A simple service to view the real time market data in USD for the two cryptocurrencies BTC and ETH.

### Features

- Endpoint to check real time market data in USD for BTC and ETH
- Endpoint to retrieve historic data for pass 24 hours
- A frontend to view the market data and historic data for pass 24 (assuming hourly charts)

## Tech

- [Node.js](https://nodejs.org/en/) - backend
- [Express](https://expressjs.com/) - node.js network app framework
- [React](https://reactjs.org//) - node.js network app framework

## Installation

Install the dependencies and devDependencies and start the server.

Backend:

```sh
pnpm i
npm run dev
```

Frontend: 

```sh
pnpm i
npm start
```

## Improvement List

- Add Redux or Mobx
- Dockerize