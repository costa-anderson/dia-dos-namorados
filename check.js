const fs = require('fs');
const files = ['editor-namorados.html', 'editor-stories.html', 'editor-romance.html', 'index.html'];

files.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`File ${file} does not exist.`);
    return;
  }
  const content = fs.readFileSync(file, 'utf8');
  const regex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  let count = 0;
  console.log(`\n=== Checking ${file} ===`);
  while ((match = regex.exec(content)) !== null) {
    count++;
    const scriptContent = match[1];
    try {
      new Function(scriptContent);
      console.log(`  Script Block #${count} is valid.`);
    } catch (err) {
      console.error(`  Syntax Error in Script Block #${count}:\n`, err);
    }
  }
});
