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
var uploadMiddleware_exports = {};
__export(uploadMiddleware_exports, {
  handleFileUpload: () => handleFileUpload
});
module.exports = __toCommonJS(uploadMiddleware_exports);
var import_multer = __toESM(require("multer"));
var import_cloudinary = require("cloudinary");
var import_multer_storage_cloudinary = require("multer-storage-cloudinary");
import_cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});
const storage = new import_multer_storage_cloudinary.CloudinaryStorage({
  cloudinary: import_cloudinary.v2,
  params: async (req, file) => {
    const folder = "uploads";
    const resourceType = file.mimetype.startsWith("video") ? "video" : "image";
    return {
      folder,
      resource_type: resourceType,
      public_id: `${Date.now()}-${file.originalname.split(".")[0]}`
    };
  }
});
const upload = (0, import_multer.default)({ storage });
const handleFileUpload = (req, res, next) => {
  const uploadHandler = upload.any();
  uploadHandler(req, res, (err) => {
    if (err) {
      console.error("File upload error:", err);
      return res.status(400).json({ error: "File upload failed", details: err.message });
    }
    if (req.files && Array.isArray(req.files)) {
      const uploadedFiles = req.files.map((file) => ({
        url: file.path,
        // Cloudinary file URL
        originalname: file.originalname
      }));
      req.body.uploadedFiles = uploadedFiles;
    }
    next();
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handleFileUpload
});
