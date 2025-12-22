import { defineStore } from 'pinia';

const API_BASE_URL = process.env.VUE_APP_API_BASE_URL || 'http://localhost:8080';
console.log('API_BASE_URL from store:', API_BASE_URL, 'process.env:', process.env.VUE_APP_API_BASE_URL);

export const useBlockchainStore = defineStore('blockchain', {
  state: () => ({
    wallets: {},
    blockchain: [],
    mine: null
  }),

  actions: {
    async fetchWallets() {
      const res = await fetch(`${API_BASE_URL}/wallets`);
      this.wallets = await res.json();
    },

    async fetchBlockchain() {
      const res = await fetch(`${API_BASE_URL}/blockchain`);
      this.blockchain = await res.json();
    },

    async submitTransaction(sender, receiver, amount) {
      await fetch(`${API_BASE_URL}/transaction`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender, receiver, amount })
      });
    },

    async mineBlock() {
      const res = await fetch(`${API_BASE_URL}/mine`);
      const data = await res.json();
      this.mine = data.blockHash;
      return data;
    }
  }
});
