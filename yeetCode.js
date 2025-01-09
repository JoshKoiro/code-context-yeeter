const fs = require('fs').promises;
const path = require('path');

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

async function isFileSpicyBinary(filePath) {
  try {
    const chonkyBits = await fs.readFile(filePath);
    for (let i = 0; i < Math.min(1024, chonkyBits.length); i++) {
      if (chonkyBits[i] === 0) return true;  // Found the forbidden NULLment
    }
    return false;  // Safe for human consumption
  } catch (error) {
    return true;  // If we can't read it, it's probably cursed
  }
}

function summonCommentFormat(filePath) {
  const extensionLoremaster = path.extname(filePath).toLowerCase();
  return commentFormats[extensionLoremaster] || commentFormats.default;
}

async function readYeetFile(rootDir) {
  try {
    const yeetPath = path.join(rootDir, '.yeet');
    const yeetContent = await fs.readFile(yeetPath, 'utf8');
    
    // Split by newlines and filter out empty lines and comments
    return yeetContent
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && !line.startsWith('#'))
      .map(pattern => {
        // Convert Windows-style paths to forward slashes
        return pattern.replace(/\\/g, '/');
      });
  } catch (error) {
    if (error.code === 'ENOENT') {
      // No .yeet file? No problem! Return empty array like a chad
      return [];
    }
    // Something else went wrong? Yeet the error up
    throw error;
  }
}

function shouldIgnorePath(filePath, ignorePatterns) {
  if (!ignorePatterns || ignorePatterns.length === 0) return false;
  
  // Normalize the file path, removing any leading slash
  const normalizedPath = filePath.replace(/\\/g, '/').replace(/^\//, '');
  
  return ignorePatterns.some(pattern => {
    // Normalize pattern (convert Windows paths if present)
    let normalizedPattern = pattern.replace(/\\/g, '/');
    
    // Remove leading slash if present
    normalizedPattern = normalizedPattern.replace(/^\//, '');
    
    // If pattern ends with /*, modify it to include all files (including hidden)
    if (normalizedPattern.endsWith('/*')) {
      normalizedPattern = normalizedPattern.slice(0, -2);
      // Match anything in this directory or its subdirectories
      normalizedPattern += '(/.*)?$';
    } else {
      // Convert glob pattern to regex
      normalizedPattern = normalizedPattern
        .replace(/\./g, '\\.')           // Escape dots
        .replace(/\*\*/g, '.*')          // Handle ** (match any depth)
        .replace(/\*/g, '[^/]*')         // Handle * (match within directory)
        .replace(/\?/g, '.')             // Handle ? (match single character)
        .replace(/\/$/, '')              // Remove trailing slash if present
        .replace(/([^/])$/, '$1/?.*');   // Make sure we match entire directory contents
    }

    const regex = new RegExp(`^${normalizedPattern}`);
    return regex.test(normalizedPath);
  });
}

async function yeetFilesIntoOneMegafile(rootDir, options = { yoinkHiddenFiles: false, ignorePatterns: [] }) {
  let megaFileContent = '';
  const absoluteWinners = [];  // Successfully processed files
  const bigOofs = [];  // Files that didn't make it

  async function recursiveFileYoink(currentPath, relativePath = '') {
    try {
      const dirLoot = await fs.readdir(currentPath, { withFileTypes: true });

      for (const lootDrop of dirLoot) {
        const epicPath = path.join(currentPath, lootDrop.name);
        const lootRelativePath = path.join(relativePath, lootDrop.name);

        // Check if path should be ignored first - this takes precedence over everything
        if (shouldIgnorePath(lootRelativePath, options.ignorePatterns)) {
          bigOofs.push({ path: lootRelativePath, reason: 'explicitly ignored' });
          continue;
        }

        // Handle hidden files
        if (!options.yoinkHiddenFiles && lootDrop.name.startsWith('.')) {
          bigOofs.push({ path: lootRelativePath, reason: 'too sneaky (hidden)' });
          continue;
        }

        if (lootDrop.isDirectory()) {
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
  
  // Parse ignore patterns from command line
  const ignoreIndex = userWisdom.indexOf('--ignore');
  let ignorePatterns = [];
  if (ignoreIndex !== -1 && ignoreIndex + 1 < userWisdom.length) {
    let i = ignoreIndex + 1;
    while (i < userWisdom.length && !userWisdom[i].startsWith('--')) {
      ignorePatterns.push(userWisdom[i]);
      i++;
    }
  }

  // Get the forbidden knowledge from .yeet file
  try {
    const yeetPatterns = await readYeetFile(dirOfDestiny);
    if (yeetPatterns.length > 0) {
      console.log('Found .yeet file! Adding its forbidden knowledge to the ignore list...');
      // Combine .yeet patterns with command line patterns
      ignorePatterns = [...ignorePatterns, ...yeetPatterns];
    }
  } catch (error) {
    console.error('Failed to read .yeet file (task failed successfully):', error.message);
    process.exit(1);
  }

  const destinyManifest = 'combined_output.md';

  try {
    console.log(`Initiating file yoinking ritual: ${dirOfDestiny}`);
    console.log(`Sneaky mode activated: ${sneakyMode}`);
    if (ignorePatterns.length > 0) {
      console.log('Ignoring patterns (from CLI and .yeet combined):', ignorePatterns);
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

module.exports = { 
  yeetFilesIntoOneMegafile,
  readYeetFile  // Export for testing purposes
};