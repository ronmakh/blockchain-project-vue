// src/store/index.js
import { defineStore } from 'pinia';

export const useBlockchainStore = defineStore('blockchain', {
  state: () => ({
    wallets: {},
    blockchain: []
  }),
  actions: {
    async fetchWallets() {
      const res = await fetch('http://localhost:8081/wallets');
      this.wallets = await res.json();
    },
    async fetchBlockchain() {
      const res = await fetch('http://localhost:8081/blockchain');
      this.blockchain = await res.json();
    },
    async submitTransaction(sender, receiver, amount) {
      await fetch('http://localhost:8081/transaction', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender, receiver, amount })
      });
    },
    async mineBlock() {
      await fetch('http://localhost:8081/mine');
    }
  }
});
