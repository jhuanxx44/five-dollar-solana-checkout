# Five Dollar Solana Checkout

This folder contains a static checkout page for a 5 USDC microservice:

> AI README or landing-page teardown.

The page routes payment to the Solana wallet recorded in `payment-details.json`.

## Files

- `index.html` - customer-facing checkout page.
- `assets/payment-qr.svg` - QR code for the Solana Pay request.
- `payment-details.json` - payment metadata used to verify the QR/link.
- `scripts/generate-payment-assets.mjs` - regenerates the QR and metadata.

## Use It

Published page:

https://jhuanxx44.github.io/five-dollar-solana-checkout/

Open `index.html` in a browser, or host this folder as static files. Share the page with a buyer, or paste one of the outreach messages from the page into a relevant chat or marketplace thread.

Ask the buyer to pay 5 USDC on Solana, then send:

- the Solana transaction signature,
- their URL or repository,
- the area they most want improved.

The goal is not complete until the Solana wallet receives at least 5 USDC.

## Regenerate Payment Assets

```bash
npm install
npm run generate:payment
```

The payment request uses:

- recipient: `GNdNNmfLWSLmMJHf96cvjEHXfyPWDQExNQFUAUQJJwYW`
- token: Solana USDC
- amount: `5`

## Check Wallet Receipt

```bash
npm run check:wallet
```

The original earning goal is met only when this reports `Goal met: yes`.
