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
var otpService_exports = {};
__export(otpService_exports, {
  sendLoginOTPEmail: () => sendLoginOTPEmail,
  sendSignupOTPEmail: () => sendSignupOTPEmail
});
module.exports = __toCommonJS(otpService_exports);
var import_nodemailer = __toESM(require("nodemailer"));
const transporter = import_nodemailer.default.createTransport({
  service: "yahoo",
  secure: false,
  auth: {
    user: "tap_n_taste_info@yahoo.com",
    pass: "Rajalove@22"
  }
});
const sendSignupOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Signup",
    text: `Your OTP for signup is ${otp}. It expires in 5 minutes.`
  });
};
const sendLoginOTPEmail = async (email, otp) => {
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Your OTP for Login",
    text: `Your OTP for login is ${otp}. It expires in 5 minutes.`
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendLoginOTPEmail,
  sendSignupOTPEmail
});
