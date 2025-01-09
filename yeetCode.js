const fs = require('fs').promises;
const path = require('path');

// ... (previous code remains the same until yoloMain function) ...

async function yoloMain() {
  const userWisdom = process.argv.slice(2);
  if (userWisdom.length === 0) {
    console.error('¯\\_(ツ)_/¯ Where directory?');
    console.error('Usage: node script.js <directory> [--hidden] [--ignore pattern1 pattern2 ...]');
    process.exit(1);
  }

  // Get directory path (first non-flag argument)
  const dirOfDestiny = userWisdom.find(arg => !arg.startsWith('--'));
  if (!dirOfDestiny) {
    console.error('¯\\_(ツ)_/¯ Where directory?');
    process.exit(1);
  }

  const sneakyMode = userWisdom.includes('--hidden');
  
  // Parse ignore patterns
  const ignoreIndex = userWisdom.indexOf('--ignore');
  let ignorePatterns = [];
  if (ignoreIndex !== -1 && ignoreIndex + 1 < userWisdom.length) {
    // Get all patterns until the next flag or end of args
    let i = ignoreIndex + 1;
    while (i < userWisdom.length && !userWisdom[i].startsWith('--')) {
      ignorePatterns.push(userWisdom[i]);
      i++;
    }
  }

  const destinyManifest = 'combined_output.md';

  try {
    console.log(`Initiating file yoinking ritual: ${dirOfDestiny}`);
    console.log(`Sneaky mode activated: ${sneakyMode}`);
    if (ignorePatterns.length > 0) {
      console.log('Ignoring patterns:', ignorePatterns);
    }

    const epicResult = await yeetFilesIntoOneMegafile(dirOfDestiny, { 
      yoinkHiddenFiles: sneakyMode,
      ignorePatterns 
    });

    await fs.writeFile(destinyManifest, epicResult.content);

    console.log('\nFiles that made it (POG):');
    epicResult.poggers.forEach(file => console.log(`✨ ${file}`));

    console.log('\nFiles that got rekt:');
    epicResult.fails.forEach(({ path, reason }) => 
      console.log(`💀 ${path} (${reason})`)
    );

    console.log(`\nGG EZ: Output yeeted to ${destinyManifest}`);
  } catch (error) {
    console.error('Task failed successfully:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  yoloMain();
}

module.exports = { yeetFilesIntoOneMegafile };