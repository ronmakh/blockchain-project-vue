<template>
    <div class="container">
      <!-- Top Input & Actions -->
      <div class="top-section">
        <div class="header-container">
          <div class="header-container">
            <h1>
              <img src="/BenCoin.png" alt="BenCoin" class="logo-img" />
              🚀 Vue + Go Blockchain Explorer using BenCoin
            </h1>
            <button class="info-btn" @click="showInfo = true" title="Learn how blockchain works">
              ℹ️ Info
            </button>
          </div>
        </div>
  
        <form class="form" @submit.prevent="submitTx">
          <div class="form-row">
            <div class="form-group">
              <label for="sender">Sender (e.g., John Doe)</label>
              <input id="sender" v-model="sender" placeholder="Ben" />
            </div>
            <div class="form-group">
              <label for="receiver">Receiver (e.g., NotJohn Doe)</label>
              <input id="receiver" v-model="receiver" placeholder="Cam" />
            </div>
            <div class="form-group">
              <label for="amount">BenCoin Amount (e.g., 100)</label>
              <input id="amount" v-model.number="amount" type="number" placeholder="100" />
            </div>
            <div class="form-group button-group">
              <button type="submit">Submit Transaction</button>
            </div>
          </div>
        </form>

        <div class="spacer"></div>
        
        <div class="buttons">
          <button @click="mine">⛏️ Mine Block</button>
          <button @click="loadWallets">🔄 Refresh Wallets</button>
          <button @click="loadBlockchain">📜 Reload Blockchain</button>
        </div>
      </div>
  
      <!-- Bottom Section -->
      <div class="bottom-section">
        <!-- Wallets -->
        <div class="panel wallets">
          <h2>💼 Wallet Balances</h2>
          <transition name="fade">
            <div v-if="walletError" class="error">{{ walletError }}</div>
            <WalletList v-else :wallets="store.wallets" />
          </transition>
        </div>
  
        <!-- Blockchain -->
        <div class="panel blockchain">
          <h2>⛓️ Blockchain</h2>
          <transition name="fade">
            <div v-if="blockchainError" class="error">{{ blockchainError }}</div>
            <BlockList v-else :blockchain="store.blockchain" />
          </transition>
        </div>
      </div>
    </div>

    <!-- Info Modal -->
    <InfoModal :isOpen="showInfo" @close="showInfo = false" />
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useBlockchainStore } from '@/store';
  import WalletList from '@/components/WalletList.vue';
  import BlockList from '@/components/BlockList.vue';
  import InfoModal from '@/components/InfoModal.vue';
  
  export default {
    components: { WalletList, BlockList, InfoModal },
    setup() {
      const store = useBlockchainStore();
      const sender = ref('');
      const receiver = ref('');
      const amount = ref(null);
  
      const walletError = ref('');
      const blockchainError = ref('');
      const showInfo = ref(false);
  
      const submitTx = async () => {
        await store.submitTransaction(sender.value, receiver.value, amount.value);
        alert('Transaction submitted!');
      };
  
      const mine = async () => {
        const block = await store.mineBlock();
        alert('Block mined!\nNew block hash: ' + block.blockHash);
        await loadBlockchain();
      };
  
      const loadWallets = async () => {
        try {
          await store.fetchWallets();
          walletError.value = '';
        } catch (e) {
          walletError.value = '❌ Failed to load wallets. Please try again later.';
        }
      };
  
      const loadBlockchain = async () => {
        try {
          await store.fetchBlockchain();
          blockchainError.value = '';
        } catch (e) {
          blockchainError.value = '❌ Failed to load blockchain. Please try again later.';
        }
      };
  
      onMounted(() => {
        loadWallets();
        loadBlockchain();
      });
  
      return {
        store,
        sender,
        receiver,
        amount,
        submitTx,
        mine,
        loadWallets,
        loadBlockchain,
        walletError,
        blockchainError,
        showInfo
      };
    }
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    padding: 2rem;
    font-family: 'Segoe UI', sans-serif;
    background-color: #121212;
    color: #f1f1f1;
    min-height: 100vh;
  }
  
  /* Top input section */
  .top-section {
    margin-bottom: 2rem;
  }
  
  .header-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
    position: relative;
  }

  h1 {
    text-align: center;
    color: #00e676;
    margin-bottom: 1.5rem;
    flex: 1;
  }

  .info-btn {
    padding: 0.5rem 1rem;
    background-color: #00e676;
    color: #121212;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .info-btn:hover {
    background-color: #00c853;
    transform: translateY(-50%) scale(1.05);
  }
  
  .form {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-bottom: 1rem;
  }
  
  .form input {
    padding: 0.5rem;
    font-size: 1rem;
    background: #1e1e1e;
    color: #f1f1f1;
    border: 1px solid #444;
    border-radius: 6px;
    flex: 1 1 150px;
  }
  
  button {
    padding: 0.6rem 1rem;
    background-color: #00e676;
    color: #121212;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
    transition: transform 0.2s ease;
  }
  
  button:hover {
    background-color: #00c853;
    transform: scale(1.03);
  }
  
  .buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 1rem;
  }
  
  /* Bottom layout */
  .bottom-section {
    display: flex;
    flex-direction: row;
    gap: 2rem;
    flex: 1;
  }
  
  .panel {
    flex: 1;
    padding: 1rem;
    background: #1e1e1e;
    border-radius: 10px;
    overflow-y: auto;
    max-height: 70vh;
  }
  
  h2 {
    margin-bottom: 1rem;
    color: #00e676;
  }
  
  .error {
    color: #ff5252;
    background: #2e2e2e;
    padding: 1rem;
    border-radius: 6px;
    text-align: center;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  </style>
  