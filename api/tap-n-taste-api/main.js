const Module = require("module");
const path = require("path");
const fs = require("fs");
const originalResolveFilename = Module._resolveFilename;
const distPath = __dirname;
const manifest = [{ "module": "@tap-n-taste/api", "exactMatch": "libs/services/api/src/index.js", "pattern": "libs/services/api/src/index.ts" }, { "module": "@tap-n-taste/api-types", "exactMatch": "libs/api-types/src/index.js", "pattern": "libs/api-types/src/index.ts" }, { "module": "@tap-n-taste/assets", "exactMatch": "libs/assets/src/index.js", "pattern": "libs/assets/src/index.ts" }, { "module": "@tap-n-taste/features", "exactMatch": "libs/features/src/index.js", "pattern": "libs/features/src/index.ts" }, { "module": "@tap-n-taste/hooks", "exactMatch": "libs/hooks/src/index.js", "pattern": "libs/hooks/src/index.ts" }, { "module": "@tap-n-taste/constant", "exactMatch": "libs/constant/src/index.js", "pattern": "libs/constant/src/index.ts" }, { "module": "@tap-n-taste/libs", "exactMatch": "libs/src/index.js", "pattern": "libs/src/index.ts" }, { "module": "@tap-n-taste/services", "exactMatch": "libs/services/src/index.js", "pattern": "libs/services/src/index.ts" }, { "module": "@tap-n-taste/shared-types", "exactMatch": "shared-types/src/index.js", "pattern": "shared-types/src/index.ts" }, { "module": "@tap-n-taste/state", "exactMatch": "libs/state/src/index.js", "pattern": "libs/state/src/index.ts" }, { "module": "@tap-n-taste/theme", "exactMatch": "libs/theme/src/index.js", "pattern": "libs/theme/src/index.ts" }, { "module": "@tap-n-taste/type", "exactMatch": "libs/type/src/index.js", "pattern": "libs/type/src/index.ts" }, { "module": "@tap-n-taste/types", "exactMatch": "t-scanning/libs/types/src/index.js", "pattern": "t-scanning/libs/types/src/index.ts" }, { "module": "@tap-n-taste/ui", "exactMatch": "libs/ui/src/index.js", "pattern": "libs/ui/src/index.ts" }, { "module": "@tap-n-taste/utils", "exactMatch": "libs/utils/src/index.js", "pattern": "libs/utils/src/index.ts" }, { "module": "@tap-n-taste/admin", "exactMatch": "t-admin/src/index.js", "pattern": "t-admin/src/index.ts" }, { "module": "@mui/icons-material", "pattern": "node_modules/@mui/icons-material" }];
Module._resolveFilename = function(request, parent) {
  let found;
  for (const entry of manifest) {
    if (request === entry.module && entry.exactMatch) {
      const entry2 = manifest.find((x) => request === x.module || request.startsWith(x.module + "/"));
      const candidate = path.join(distPath, entry2.exactMatch);
      if (isFile(candidate)) {
        found = candidate;
        break;
      }
    } else {
      const re = new RegExp(entry.module.replace(/\*$/, "(?<rest>.*)"));
      const match = request.match(re);
      if (match?.groups) {
        const candidate = path.join(distPath, entry.pattern.replace("*", ""), match.groups.rest);
        if (isFile(candidate)) {
          found = candidate;
        }
      }
    }
  }
  if (found) {
    const modifiedArguments = [found, ...[].slice.call(arguments, 1)];
    return originalResolveFilename.apply(this, modifiedArguments);
  } else {
    return originalResolveFilename.apply(this, arguments);
  }
};
function isFile(s) {
  try {
    require.resolve(s);
    return true;
  } catch (_e) {
    return false;
  }
}
module.exports = require("./tap-n-taste-api/src/main.js");
