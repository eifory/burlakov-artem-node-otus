const fs = require('fs');
const path = require('path');

const toChildSymbol = '└──';

const getDirTree = (dirName, depth) => {
  const fullPath = (path.isAbsolute(dirName)) ? dirName : path.join(__dirname, dirName);
  const iter = (elem, curDepth, acc) => { 
    if (curDepth > depth -1) {
      return acc;
    }
    const beforeValue = (curDepth === -1) ? '' : ' '.repeat(curDepth * toChildSymbol.length) + toChildSymbol;
    acc += `${beforeValue}${path.basename(elem)}\n`;
    const stats = fs.statSync(elem);
    if (stats.isFile()) {
      return acc;
    }
    const names = fs.readdirSync(elem);
    const fullNames = names.map((name) => path.join(elem, name)); 
    return fullNames.reduce((cAcc, nn) => iter(nn, curDepth + 1, cAcc), acc);
  }  
  return iter(fullPath, -1, '');
}
  
module.exports = getDirTree;