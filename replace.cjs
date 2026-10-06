const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(file => {
    let filepath = path.join(dir, file);
    let stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walk(filepath, callback);
    } else if (filepath.endsWith('.tsx') || filepath.endsWith('.ts') || filepath.endsWith('.css')) {
      callback(filepath);
    }
  });
}

walk('src', (filepath) => {
  let content = fs.readFileSync(filepath, 'utf8');
  content = content.replace(/#4f3370/g, '#dc2626');
  content = content.replace(/#3d2757/g, '#b91c1c');
  content = content.replace(/#ede9f2/g, '#fee2e2');
  content = content.replace(/#f8f5fb/g, '#fef2f2');
  content = content.replace(/#d8b4fe/g, '#fca5a5');
  content = content.replace(/#2c1b40/g, '#450a0a');
  content = content.replace(/#1c1129/g, '#2e0505');
  content = content.replace(/#130b1c/g, '#1a0303');
  content = content.replace(/border-purple-800/g, 'border-red-800');
  fs.writeFileSync(filepath, content);
});
console.log('Done replacement!');
