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
var socialLinks_model_exports = {};
__export(socialLinks_model_exports, {
  default: () => socialLinks_model_default
});
module.exports = __toCommonJS(socialLinks_model_exports);
var import_mongoose = __toESM(require("mongoose"));
const socialLinksSchema = new import_mongoose.default.Schema({
  restaurant: {
    type: import_mongoose.default.Schema.Types.ObjectId,
    ref: "Restaurant",
    // Link to the restaurant document
    required: true
    // This is a mandatory field
  },
  facebook: {
    type: String,
    trim: true,
    default: null
  },
  instagram: {
    type: String,
    trim: true,
    default: null
  },
  twitter: {
    type: String,
    trim: true,
    default: null
  },
  website: {
    type: String,
    trim: true,
    default: null
  },
  linkedin: {
    type: String,
    trim: true,
    default: null
  },
  youtube: {
    type: String,
    trim: true,
    default: null
  },
  snapchat: {
    type: String,
    trim: true,
    default: null
  },
  tiktok: {
    type: String,
    trim: true,
    default: null
  },
  pinterest: {
    type: String,
    trim: true,
    default: null
  },
  // Verification statuses for social media profiles
  isFacebookVerified: {
    type: Boolean,
    default: false
  },
  isInstagramVerified: {
    type: Boolean,
    default: false
  },
  isTwitterVerified: {
    type: Boolean,
    default: false
  },
  isLinkedinVerified: {
    type: Boolean,
    default: false
  },
  isYoutubeVerified: {
    type: Boolean,
    default: false
  },
  isSnapchatVerified: {
    type: Boolean,
    default: false
  },
  isTiktokVerified: {
    type: Boolean,
    default: false
  },
  isPinterestVerified: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });
const SocialLinks = import_mongoose.default.model("SocialLinks", socialLinksSchema);
var socialLinks_model_default = SocialLinks;
