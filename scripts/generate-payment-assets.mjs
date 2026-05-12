import fs from "node:fs/promises";
import path from "node:path";
import QRCode from "qrcode";

const RECIPIENT = "GNdNNmfLWSLmMJHf96cvjEHXfyPWDQExNQFUAUQJJwYW";
const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
const AMOUNT = "5";
const LABEL = "Five Dollar AI Teardown";
const MESSAGE = "Payment for one AI README or landing-page teardown";
const MEMO = "five-dollar-ai-teardown";
const TOKEN_SYMBOL = "USDC";
const NETWORK = "solana-mainnet";

const params = new URLSearchParams({
  amount: AMOUNT,
  "spl-token": USDC_MINT,
  label: LABEL,
  message: MESSAGE,
  memo: MEMO,
});

const paymentUrl = `solana:${RECIPIENT}?${params.toString()}`;

const paymentDetails = {
  network: NETWORK,
  recipient: RECIPIENT,
  usdcMint: USDC_MINT,
  tokenSymbol: TOKEN_SYMBOL,
  amount: AMOUNT,
  label: LABEL,
  message: MESSAGE,
  memo: MEMO,
  paymentUrl,
};

const workspaceRoot = process.cwd();
const assetsDir = path.join(workspaceRoot, "assets");
await fs.mkdir(assetsDir, { recursive: true });

const qrBody = await QRCode.toString(paymentUrl, {
  type: "svg",
  errorCorrectionLevel: "M",
  margin: 2,
  width: 512,
});

const metadataComment = [
  "<!--",
  "Generated Solana Pay QR",
  `recipient: ${RECIPIENT}`,
  `amount: ${AMOUNT} ${TOKEN_SYMBOL}`,
  `usdcMint: ${USDC_MINT}`,
  `paymentUrl: ${paymentUrl}`,
  "-->",
  "",
].join("\n");

await fs.writeFile(
  path.join(workspaceRoot, "payment-details.json"),
  `${JSON.stringify(paymentDetails, null, 2)}\n`,
);
await fs.writeFile(path.join(assetsDir, "payment-qr.svg"), metadataComment + qrBody);

console.log(`Wrote ${path.relative(workspaceRoot, path.join(assetsDir, "payment-qr.svg"))}`);
console.log(`Wrote ${path.relative(workspaceRoot, path.join(workspaceRoot, "payment-details.json"))}`);
console.log(paymentUrl);
