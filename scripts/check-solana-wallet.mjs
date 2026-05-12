const RPC_URL = "https://solana-rpc.publicnode.com";
const RECIPIENT = "GNdNNmfLWSLmMJHf96cvjEHXfyPWDQExNQFUAUQJJwYW";
const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
const LAMPORTS_PER_SOL = 1_000_000_000;

async function rpc(method, params) {
  const response = await fetch(RPC_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ jsonrpc: "2.0", id: 1, method, params }),
  });

  if (!response.ok) {
    throw new Error(`RPC HTTP ${response.status}`);
  }

  const payload = await response.json();
  if (payload.error) {
    throw new Error(payload.error.message || JSON.stringify(payload.error));
  }

  return payload.result;
}

const [tokenAccounts, solBalance] = await Promise.all([
  rpc("getTokenAccountsByOwner", [
    RECIPIENT,
    { mint: USDC_MINT },
    { encoding: "jsonParsed" },
  ]),
  rpc("getBalance", [RECIPIENT]),
]);

const usdc = tokenAccounts.value.reduce((total, account) => {
  const amount = account.account.data.parsed.info.tokenAmount.uiAmount || 0;
  return total + amount;
}, 0);

const sol = solBalance.value / LAMPORTS_PER_SOL;

console.log(`Wallet: ${RECIPIENT}`);
console.log(`USDC token accounts: ${tokenAccounts.value.length}`);
console.log(`USDC balance: ${usdc}`);
console.log(`SOL balance: ${sol}`);
console.log(`Goal met: ${usdc >= 5 ? "yes" : "no"}`);
