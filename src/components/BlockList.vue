<template>
    <div>
      <div v-for="block in blockchain" :key="block.hash" class="block">
        <p><strong>Block #{{ block.index }}</strong></p>
        <p>Hash: {{ block.hash }}</p>
        <p>Prev: {{ block.prevHash }}</p>
        <p>Tx Count: {{ block.transactions?.length || 0 }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      blockchain: Array
    }
  };
  </script>
  
  <style scoped>
  h2 {
    color: #40c4ff;
  }
  
  .block {
    border: 1px solid #444;
    border-left: 6px solid #40c4ff;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 6px;
    background-color: #1e1e1e;
    transition: transform 0.3s ease;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
  }
  
  .block:hover {
    transform: scale(1.01);
  }
  </style>
  