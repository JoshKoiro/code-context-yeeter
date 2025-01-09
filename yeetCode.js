// file-yeet-combinator-9000.js
// Where files go to become one with everything
const fs = require('fs').promises;
const path = require('path');

// The sacred scroll of commenting styles
const commentFormats = {
  '.js': (path) => `// NEW FILE: ${path}`,
  '.jsx': (path) => `// NEW FILE: ${path}`,
  '.ts': (path) => `// NEW FILE: ${path}`,
  '.tsx': (path) => `// NEW FILE: ${path}`,
  '.py': (path) => `# NEW FILE: ${path}`,
  '.sh': (path) => `# NEW FILE: ${path}`,
  '.go': (path) => `// NEW FILE: ${path}`,
  '.rb': (path) => `# NEW FILE: ${path}`,
  '.html': (path) => `<!-- NEW FILE: ${path} -->`,
  '.htm': (path) => `<!-- NEW FILE: ${path} -->`,
  '.css': (path) => `/* NEW FILE: ${path} */`,
  '.scss': (path) => `/* NEW FILE: ${path} */`,
  '.less': (path) => `/* NEW FILE: ${path} */`,
  '.md': (path) => `<!-- NEW FILE: ${path} -->`,
  '.xml': (path) => `<!-- NEW FILE: ${path} -->`,
  '.php': (path) => `// NEW FILE: ${path}`,
  '.java': (path) => `// NEW FILE: ${path}`,
  '.c': (path) => `// NEW FILE: ${path}`,
  '.cpp': (path) => `// NEW FILE: ${path}`,
  '.h': (path) => `// NEW FILE: ${path}`,
  '.hpp': (path) => `// NEW FILE: ${path}`,
  'default': (path) => `### NEW FILE: ${path} ###`
};

// Checks if file is binary (the forbidden format)
async function isFileSpicyBinary(filePath) {
  try {
    const chonkyBits = await fs.readFile(filePath);
    // The first 1024 bytes determine if file is cursed
    for (let i = 0; i < Math.min(1024, chonkyBits.length); i++) {
      if (chonkyBits[i] === 0) return true;  // Found the forbidden NULLment
    }
    return false;  // Safe for human consumption
  } catch (error) {
    return true;  // If we can't read it, it's probably cursed
  }
}

// Summons the appropriate comment format from the ancient texts
function summonCommentFormat(filePath) {
  const extensionLoremaster = path.extname(filePath).toLowerCase();
  return commentFormats[extensionLoremaster] || commentFormats.default;
}

async function yeetFilesIntoOneMegafile(rootDir, options = { yoinkHiddenFiles: false }) {
  let megaFileContent = '';
  const absoluteWinners = [];  // Successfully processed files
  const bigOofs = [];  // Files that didn't make it

  async function recursiveFileYoink(currentPath, relativePath = '') {
    try {
      const dirLoot = await fs.readdir(currentPath, { withFileTypes: true });

      for (const lootDrop of dirLoot) {
        const epicPath = path.join(currentPath, lootDrop.name);
        const lootRelativePath = path.join(relativePath, lootDrop.name);

        // Stealth check for sneaky hidden files
        if (!options.yoinkHiddenFiles && lootDrop.name.startsWith('.')) {
          bigOofs.push({ path: lootRelativePath, reason: 'too sneaky (hidden)' });
          continue;
        }

        if (lootDrop.isDirectory()) {
          // We need to go deeper ⊂(▀¯▀⊂)
          await recursiveFileYoink(epicPath, lootRelativePath);
        } else if (lootDrop.isFile()) {
          try {
            if (await isFileSpicyBinary(epicPath)) {
              bigOofs.push({ path: lootRelativePath, reason: 'too spicy (binary)' });
              continue;
            }

            const fileGoodies = await fs.readFile(epicPath, 'utf8');
            const commentRitual = summonCommentFormat(epicPath);
            megaFileContent += `\n\n${commentRitual(lootRelativePath)}\n\n${fileGoodies}`;
            absoluteWinners.push(lootRelativePath);
          } catch (error) {
            bigOofs.push({ 
              path: lootRelativePath, 
              reason: `task failed successfully: ${error.message}`
            });
          }
        }
      }
    } catch (error) {
      console.error(`Big oof in directory ${currentPath}:`, error);
    }
  }

  await recursiveFileYoink(rootDir);

  return {
    content: megaFileContent.trim(),
    poggers: absoluteWinners,
    fails: bigOofs
  };
}

// CLI goes brrrrr
async function yoloMain() {
  const userWisdom = process.argv.slice(2);
  if (userWisdom.length === 0) {
    console.error('¯\\_(ツ)_/¯ Where directory?');
    process.exit(1);
  }

  const dirOfDestiny = userWisdom[0];
  const sneakyMode = userWisdom.includes('--hidden');
  const destinyManifest = 'combined_output.md';

  try {
    console.log(`Initiating file yoinking ritual: ${dirOfDestiny}`);
    console.log(`Sneaky mode activated: ${sneakyMode}`);

    const epicResult = await yeetFilesIntoOneMegafile(dirOfDestiny, { yoinkHiddenFiles: sneakyMode });

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