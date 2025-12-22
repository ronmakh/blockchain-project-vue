<template>
  <div v-if="isOpen" class="modal-overlay" @click="closeModal">
    <div class="modal-content" @click.stop>
      <button class="close-btn" @click="closeModal">✕</button>
      
      <h2>ℹ️ How This Blockchain Works</h2>
      
      <div class="info-section">
        <h3>🔄 Transactions</h3>
        <p>
          When you submit a transaction, it's added to a <strong>pending transactions pool</strong>. 
          These transactions wait until a miner creates a new block.
        </p>
        <div class="example">
          <strong>Example:</strong> Ben sends 50 BenCoin to Cam → Transaction goes to pending pool
        </div>
      </div>

      <div class="info-section">
        <h3>⛏️ Mining a Block</h3>
        <p>
          Mining takes all <strong>pending transactions</strong> and bundles them into a new block. 
          The block is then appended to the blockchain with a unique hash. The miner receives a reward for their work.
        </p>
        <div class="example">
          <strong>Example:</strong> Click "Mine Block" → All pending transactions (Ben → Cam: 50 BenCoin) 
          are added to Block #2 → Miner gets 10 BenCoin reward
        </div>
      </div>

      <div class="info-section">
        <h3>📜 Viewing the Blockchain</h3>
        <p>
          The blockchain displays all blocks in order. Each block shows:
        </p>
        <ul>
          <li><strong>Block number:</strong> Position in the chain</li>
          <li><strong>Transactions:</strong> All transfers in that block</li>
          <li><strong>Hash:</strong> Unique fingerprint of the block</li>
          <li><strong>Previous hash:</strong> Links to the previous block</li>
          <li><strong>Timestamp:</strong> When the block was created</li>
        </ul>
        <div class="example">
          <strong>Example:</strong> Block #1 (Genesis) → Block #2 (3 transactions) → Block #3 (1 transaction)
        </div>
      </div>

      <div class="info-section">
        <h3>💼 Wallet Balances</h3>
        <p>
          Wallet balances are calculated by <strong>iterating through the entire blockchain</strong>, 
          adding up all incoming transactions and subtracting all outgoing transactions for each wallet.
        </p>
        <div class="example">
          <strong>Example:</strong> 
          <ul>
            <li>Ben starts with 0 BenCoin</li>
            <li>Ben receives mining reward: +10 BenCoin</li>
            <li>Ben sends to Cam: -50 BenCoin</li>
            <li>Ben receives mining reward: +10 BenCoin</li>
            <li><strong>Ben's balance: -30 BenCoin</strong></li>
          </ul>
        </div>
      </div>

      <div class="info-section highlight">
        <h3>🔐 Key Blockchain Concepts</h3>
        <ul>
          <li><strong>Immutable:</strong> Once a block is added, it cannot be changed</li>
          <li><strong>Decentralized:</strong> No single authority controls the blockchain</li>
          <li><strong>Transparent:</strong> All transactions are visible to everyone</li>
          <li><strong>Secure:</strong> Each block is cryptographically linked to the previous one</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true
    }
  },
  emits: ['close'],
  methods: {
    closeModal() {
      this.$emit('close');
    }
  }
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow-y: auto;
  padding: 2rem;
}

.modal-content {
  background: #1e1e1e;
  color: #f1f1f1;
  padding: 2rem;
  border-radius: 12px;
  max-width: 700px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  border: 2px solid #00e676;
  box-shadow: 0 8px 32px rgba(0, 230, 118, 0.3);
}

.close-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #ff5252;
  color: white;
  border: none;
  border-radius: 50%;
  width: 35px;
  height: 35px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.close-btn:hover {
  transform: scale(1.1);
  background: #ff1744;
}

h2 {
  color: #00e676;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.8rem;
}

.info-section {
  margin-bottom: 1.5rem;
  padding: 1rem;
  background: #2a2a2a;
  border-radius: 8px;
  border-left: 4px solid #00e676;
}

.info-section h3 {
  color: #00e676;
  margin-bottom: 0.75rem;
  font-size: 1.3rem;
}

.info-section p {
  line-height: 1.6;
  margin-bottom: 0.5rem;
}

.info-section ul {
  margin-left: 1.5rem;
  line-height: 1.8;
}

.info-section ul li {
  margin-bottom: 0.5rem;
}

.example {
  margin-top: 0.75rem;
  padding: 0.75rem;
  background: #1a1a1a;
  border-radius: 6px;
  border-left: 3px solid #ffd700;
  font-size: 0.95rem;
  color: #ffd700;
}

.example strong {
  color: #ffeb3b;
}

.example ul {
  margin-top: 0.5rem;
  margin-left: 1rem;
  color: #f1f1f1;
}

.highlight {
  background: linear-gradient(135deg, #2a2a2a 0%, #1e3a1e 100%);
  border-left-color: #00c853;
}

.highlight h3 {
  color: #76ff03;
}

/* Scrollbar styling */
.modal-content::-webkit-scrollbar {
  width: 8px;
}

.modal-content::-webkit-scrollbar-track {
  background: #1a1a1a;
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb {
  background: #00e676;
  border-radius: 4px;
}

.modal-content::-webkit-scrollbar-thumb:hover {
  background: #00c853;
}
</style>
