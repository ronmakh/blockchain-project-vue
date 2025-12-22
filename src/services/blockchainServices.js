const BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8080';
console.log('BASE_URL from services:', BASE_URL, 'env var:', process.env.VITE_API_BASE_URL);

export async function submitTransaction(data) {
  await fetch(`${BASE_URL}/transaction`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

export async function mineBlock() {
  await fetch(`${BASE_URL}/mine`);
}

export async function getWallets() {
  const res = await fetch(`${BASE_URL}/wallets`);
  return res.json();
}

export async function getBlockchain() {
  const res = await fetch(`${BASE_URL}/blockchain`);
  return res.json();
}
