const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'src');
const exts = ['.tsx', '.ts'];

const map = {
  '#8b0000': '#4f3370',
  '#310000': '#2c1b40',
  '#ffb3b3': '#d8b4fe',
  '#fff9f9': '#fcfbfe',
  '#600000': '#3d2757'
};

function walk(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const full = path.join(dir, file);
    if (fs.statSync(full).isDirectory()) {
      walk(full);
    } else {
      if (exts.includes(path.extname(full))) {
        let content = fs.readFileSync(full, 'utf8');
        let changed = false;
        for (const [key, val] of Object.entries(map)) {
          if (content.includes(key)) {
            content = content.split(key).join(val);
            changed = true;
          }
        }
        if (changed) {
          fs.writeFileSync(full, content, 'utf8');
        }
      }
    }
  }
}

walk(dir);
console.log("Done reverting colors!");
