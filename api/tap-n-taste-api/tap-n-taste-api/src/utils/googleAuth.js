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
var googleAuth_exports = {};
__export(googleAuth_exports, {
  default: () => googleAuth_default
});
module.exports = __toCommonJS(googleAuth_exports);
var import_passport = __toESM(require("passport"));
var import_passport_google_oauth20 = require("passport-google-oauth20");
var import_uuid = require("uuid");
var import_user = __toESM(require("../models/user.model"));
import_passport.default.use(
  new import_passport_google_oauth20.Strategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/api/auth/google/callback"
      // updated URL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log("Google Profile:", profile);
        let user = await import_user.default.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = await import_user.default.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: "gauthUserPassword",
            role: "User",
            phone: profile.emails[0].value || (0, import_uuid.v4)(),
            status: profile.emails[0].verified ? "verified" : "pending",
            profileImage: profile.photos[0]?.value,
            GAccessToken: accessToken,
            GRefreshToken: refreshToken
          });
        }
        done(null, user);
      } catch (error) {
        console.error("Error in GoogleStrategy:", error);
        done(error, null);
      }
    }
  )
);
var googleAuth_default = import_passport.default;
