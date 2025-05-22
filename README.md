# XRPL Vanity Wallet Generator

**Generate custom XRP wallet**

This script brute-forces XRPL wallets that match any prefix you define (e.g. `rCupid`, `rnami`, `rDEGENLORD69`…), and saves the address and seed to file as soon as a match is found.

---

## Why?

The Rust XRPL library is mid.  
And when you're generating vanity wallets, speed doesn’t matter that much, you're running this overnight anyway.

This script is clean, simple, and logs every match while running. Perfect for long hauls.

---

## Example

If `names.txt` contains:
```
cupid
nami
degen
```

It will search for XRPL addresses like:

- `rCupid5xkz...`
- `rnami8WZd...`
- `rDEGEN4utK...`

As soon as a match is found, it’s saved in the `output/` folder:

```
output/
├── 1716313351875_1.txt
├── 1716313410302_2.txt
```

Each file contains:
```
address: rCircle2m7DkWCVXEjk...
seed: sEd7E...LiZ9
```

---

## How to use

1. Clone this repo  
2. Add your targets in `names.txt` (one per line, no `r` needed)  
3. Run:

```bash
npm install
node main.js
```

Then go do something else, cool addresses take time to find.

---

## Features

- Case-insensitive matching (`rCupid`, `rCUPid`, etc.)
- Works until you `Ctrl+C` it (clean exit with stats)
- Supports unlimited prefixes in `names.txt`
- Stats live as it runs (wallets generated, matches found, time elapsed)

---

## License

MIT. Use it, remix it.
