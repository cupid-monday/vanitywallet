const fs = require('fs');
const path = require('path');
const { Wallet } = require('xrpl');
const { formatWithSeparator } = require('./num_format');
const { setImmediate: nextTick } = require('timers/promises');

const lines = fs.readFileSync('names.txt', 'utf-8')
  .split('\n')
  .filter(Boolean);

const totalWallets = { searched: 0, found: 0 };
const startTime = Date.now();

console.log('🔍✨ Searching vanity wallets...');
console.log(`🎯 Targets loaded: ${lines.length} name(s)\n`);

const outputDir = 'output';
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

let isRunning = true;

process.on('SIGINT', () => {
  isRunning = false;
  console.log('\n🛑 Interrupted by user (Ctrl+C)');
  showStats();
  process.exit();
});

function showStats() {
  const duration = (Date.now() - startTime) / 1000;
  console.log(`\n🔄 Wallets generated: ${formatWithSeparator(totalWallets.searched)}`);
  console.log(`✅ Matches found: ${totalWallets.found} / ${lines.length}`);
  console.log(`⏱️ Time elapsed: ${duration.toFixed(2)}s`);
}

async function searchFor(line) {
  const lowerLine = line.toLowerCase();

  while (isRunning) {
    const wallet = Wallet.generate();
    totalWallets.searched++;

    if (wallet.classicAddress.toLowerCase().startsWith('r' + lowerLine)) {
      totalWallets.found++;

      const fileName = `${Date.now()}_${totalWallets.found}.txt`;
      const filePath = path.join(outputDir, fileName);
      fs.writeFileSync(
        filePath,
        `address: ${wallet.classicAddress}\nseed: ${wallet.seed}`
      );

      console.log(`🎯 Match for "${line}": ${wallet.classicAddress}`);
      showStats();
      return;
    }

    if (totalWallets.searched % 1000 === 0) {
      const duration = (Date.now() - startTime) / 1000;
      process.stdout.write(
        `🔄 Wallets generated: ${formatWithSeparator(totalWallets.searched)} | ✅ Found: ${totalWallets.found} / ${lines.length} | ⏱️ ${duration.toFixed(2)}s\r`
      );
    }

    await nextTick();
  }
}

(async () => {
  for (const line of lines) {
    if (!isRunning) break;
    await searchFor(line);
  }

  if (isRunning) {
    console.log('\n✅ Done generating vanity wallets.');
    showStats();
  }
})();
