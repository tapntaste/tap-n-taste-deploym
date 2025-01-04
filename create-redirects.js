const fs = require('fs');
const path = require('path');

const createRedirects = (appDir) => {
  const redirectsPath = path.join(appDir, '_redirects');
  const redirectsContent = '/*    /index.html   200\n';
  fs.writeFileSync(redirectsPath, redirectsContent);
  console.log(`_redirects file created in ${appDir}`);
};

// Path for the t-scanning and t-admin apps
createRedirects(path.join(__dirname, 'dist', 't-scanning'));
createRedirects(path.join(__dirname, 'dist', 't-admin'));
