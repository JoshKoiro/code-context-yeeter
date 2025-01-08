// file-combiner.js
const fs = require('fs').promises;
const path = require('path');

// Define comment formats for different file types
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
  // Default format for unknown file types
  'default': (path) => `### NEW FILE: ${path} ###`
};

// Function to check if a file is binary
async function isBinaryFile(filePath) {
  try {
    const buffer = await fs.readFile(filePath);
    // Check for NULL bytes in first 1024 bytes
    for (let i = 0; i < Math.min(1024, buffer.length); i++) {
      if (buffer[i] === 0) return true;
    }
    return false;
  } catch (error) {
    return true; // If we can't read the file, treat it as binary
  }
}

// Function to get the appropriate comment format
function getCommentFormat(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return commentFormats[ext] || commentFormats.default;
}

async function combineFiles(rootDir, options = { includeHidden: false }) {
  let output = '';
  const processedFiles = [];
  const skippedFiles = [];

  async function processDirectory(currentPath, relativePath = '') {
    try {
      const entries = await fs.readdir(currentPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);
        const entryRelativePath = path.join(relativePath, entry.name);

        // Skip hidden files/directories unless specifically included
        if (!options.includeHidden && entry.name.startsWith('.')) {
          skippedFiles.push({ path: entryRelativePath, reason: 'hidden' });
          continue;
        }

        if (entry.isDirectory()) {
          await processDirectory(fullPath, entryRelativePath);
        } else if (entry.isFile()) {
          try {
            // Check if file is binary
            if (await isBinaryFile(fullPath)) {
              skippedFiles.push({ path: entryRelativePath, reason: 'binary' });
              continue;
            }

            const content = await fs.readFile(fullPath, 'utf8');
            const commentFormat = getCommentFormat(fullPath);
            output += `\n\n${commentFormat(entryRelativePath)}\n\n${content}`;
            processedFiles.push(entryRelativePath);
          } catch (error) {
            skippedFiles.push({ 
              path: entryRelativePath, 
              reason: `error: ${error.message}`
            });
          }
        }
      }
    } catch (error) {
      console.error(`Error processing directory ${currentPath}:`, error);
    }
  }

  await processDirectory(rootDir);

  return {
    content: output.trim(),
    processedFiles,
    skippedFiles
  };
}

// CLI handling
async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    console.error('Please provide a directory path');
    process.exit(1);
  }

  const dirPath = args[0];
  const includeHidden = args.includes('--hidden');
  const outputPath = 'combined_output.md';

  try {
    console.log(`Processing directory: ${dirPath}`);
    console.log(`Including hidden files: ${includeHidden}`);

    const result = await combineFiles(dirPath, { includeHidden });

    // Write output file
    await fs.writeFile(outputPath, result.content);

    // Log results
    console.log('\nProcessed Files:');
    result.processedFiles.forEach(file => console.log(`✓ ${file}`));

    console.log('\nSkipped Files:');
    result.skippedFiles.forEach(({ path, reason }) => 
      console.log(`⨯ ${path} (${reason})`)
    );

    console.log(`\nOutput written to: ${outputPath}`);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { combineFiles };