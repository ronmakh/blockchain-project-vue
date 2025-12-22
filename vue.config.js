const { defineConfig } = require('@vue/cli-service')

// Load .env file manually if needed
require('dotenv').config()

module.exports = defineConfig({
  transpileDependencies: true
})
