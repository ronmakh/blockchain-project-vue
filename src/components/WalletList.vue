<template>
    <div>
      <ul>
        <li v-for="(wallet, address) in wallets" :key="address">
          <strong>{{ address }}</strong>: {{ wallet.balance }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      wallets: Object
    }
  };
  </script>
  
  <style scoped>
  h2 {
    color: #00bfa5;
  }
  
  ul {
    list-style: none;
    padding: 0;
  }
  
  li {
    margin: 0.5rem 0;
    padding: 0.5rem;
    background-color: #1d1d1d;
    border-radius: 4px;
    border-left: 4px solid #00bfa5;
  }
  </style>
  