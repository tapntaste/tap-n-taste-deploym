var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var auth_routes_exports = {};
__export(auth_routes_exports, {
  default: () => auth_routes_default
});
module.exports = __toCommonJS(auth_routes_exports);
var import_express = __toESM(require("express"));
var import_auth = require("../controllers/auth.controller");
var import_auth2 = require("../middlewares/auth.middleware");
var import_googleAuth = __toESM(require("../utils/googleAuth"));
const router = import_express.default.Router();
router.post("/signup", import_auth.signup);
router.post("/signup/verify", import_auth.verifySignupOTP);
router.post("/login", import_auth.login);
router.post("/otp/login", import_auth.sendLoginOTP);
router.post("/otp/login/verify", import_auth.verifyLoginOTP);
console.log("fasd");
router.get("/google", (req, res, next) => {
  const redirect = req.query.redirect;
  const fullRedirectUrl = `${redirect}`;
  import_googleAuth.default.authenticate("google", {
    scope: ["profile", "email"],
    state: encodeURIComponent(fullRedirectUrl)
    // Pass redirect path as state
  })(req, res, next);
});
router.get("/google/callback", import_auth.googleAuthCallback);
router.post("/admin/signup", import_auth.requestAdminSignup);
router.put("/admin/approve/:adminId", import_auth2.authenticate, (0, import_auth2.authorize)("SuperAdmin"), import_auth.approveAdmin);
var auth_routes_default = router;
