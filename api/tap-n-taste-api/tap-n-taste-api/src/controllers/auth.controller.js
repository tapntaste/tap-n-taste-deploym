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
var auth_controller_exports = {};
__export(auth_controller_exports, {
  approveAdmin: () => approveAdmin,
  googleAuthCallback: () => googleAuthCallback,
  login: () => login,
  requestAdminSignup: () => requestAdminSignup,
  sendLoginOTP: () => sendLoginOTP,
  signup: () => signup,
  verifyLoginOTP: () => verifyLoginOTP,
  verifySignupOTP: () => verifySignupOTP
});
module.exports = __toCommonJS(auth_controller_exports);
var import_jsonwebtoken = __toESM(require("jsonwebtoken"));
var import_passport = __toESM(require("passport"));
var import_user = __toESM(require("../models/user.model"));
var import_uuid = require("uuid");
var import_route = require("../constant/route.constant");
const OTP_EXPIRY = 5 * 60 * 1e3;
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_EXPIRY = process.env.JWT_EXPIRY || "7d";
const googleAuthCallback = (req, res) => {
  import_passport.default.authenticate("google", { session: false }, async (err, user) => {
    console.log("Error:", err);
    console.log("User:", user);
    if (err || !user) {
      return res.status(401).json({ message: "Google authentication failed" });
    }
    try {
      let existingUser = await import_user.default.findOne({ email: user.email });
      if (!existingUser) {
        existingUser = new import_user.default({
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
          password: user.password,
          phone: user.email,
          profileImage: user.profileImage,
          GAccessToken: user.GAccessToken,
          GRefreshToken: user.GRefreshToken
        });
        await existingUser.save();
      }
      const token = import_jsonwebtoken.default.sign(
        {
          id: existingUser._id,
          email: existingUser.email,
          role: existingUser.role
        },
        JWT_SECRET,
        { expiresIn: JWT_EXPIRY }
      );
      res.cookie("token", token, {
        httpOnly: true,
        // Prevents client-side JS from accessing the cookie
        secure: process.env.NODE_ENV === "production",
        // Send only over HTTPS in production
        sameSite: "none"
        // Mitigate CSRF attacks
      });
      const providedRestaurantId = req.query.restaurantId;
      let restaurantId;
      if (existingUser.role === "Admin") {
        restaurantId = existingUser.restaurantId;
      } else if (existingUser.role === "User") {
        restaurantId = providedRestaurantId || existingUser.restaurantId || "1";
      }
      let redirectUrl = "";
      if (existingUser.role === "User") {
        redirectUrl = `${import_route.T_SCANNING_FRONTEND_URL}/restaurant/${restaurantId}/user/${existingUser.id}/`;
      } else if (existingUser.role === "Admin") {
        redirectUrl = `${import_route.T_ADMIN_FRONTEND_URL}/restaurant/${restaurantId}/admin/${existingUser.id}/`;
      }
      res.redirect(redirectUrl);
    } catch (error) {
      console.error("Error during callback processing:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  })(req, res);
};
const signup = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !password || !email && !phone) {
      return res.status(400).json({
        message: "Name, password, and either email or phone are required"
      });
    }
    const query = {};
    if (email)
      query.email = email;
    if (phone)
      query.phone = phone;
    const existingUser = await import_user.default.findOne({ email });
    const existingUserPhone = await import_user.default.findOne({ phone });
    if (existingUser || existingUserPhone) {
      return res.status(400).json({
        message: "Email or Phone already registered",
        user: existingUser || existingUserPhone
      });
    }
    const user = new import_user.default({
      name,
      email: email || phone || (0, import_uuid.v4)(),
      // Set to null if not provided
      phone: phone || email || (0, import_uuid.v4)(),
      // Set to null if not provided
      password,
      role: "User",
      // Default role
      status: "verified"
      // Directly set status as verified for signup
    });
    await user.save();
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        status: user.status
      }
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Signup failed" });
  }
};
const login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;
    if (!password || !email && !phone) {
      return res.status(400).json({ message: "Password and either email or phone are required" });
    }
    const query = {};
    if (email)
      query.email = email;
    if (phone)
      query.phone = phone;
    const user = await import_user.default.findOne({
      $or: Object.keys(query).map((key) => ({ [key]: query[key] }))
    });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    if (user.role === "Admin" && user.status !== "verified") {
      return res.status(401).json({ message: "Admin account pending approval" });
    }
    const token = import_jsonwebtoken.default.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRY }
    );
    res.setHeader("token", token).status(200).cookie("token", token, {
      httpOnly: true,
      // Prevents client-side JS from accessing the cookie
      secure: true,
      // Send only over HTTPS in production
      sameSite: "none"
      // For cross-origin requests, SameSite must be 'None'
    }).json({
      token,
      user,
      message: "Login successful",
      id: user?.id,
      restaurantId: user?.restaurantId,
      role: user?.role
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Login failed" });
  }
};
const verifySignupOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await import_user.default.findOne({ email });
    if (!user)
      return res.status(404).json({ error: "User not found" });
    if (user.status !== "pending") {
      return res.status(400).json({ error: "User is already verified" });
    }
    if (user.otp !== otp)
      return res.status(400).json({ error: "Invalid OTP" });
    if (Date.now() > user.otpExpiry) {
      return res.status(400).json({ error: "OTP has expired" });
    }
    user.status = "verified";
    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ error: "OTP verification failed" });
  }
};
const sendLoginOTP = async (req, res) => {
  try {
    const { email, phone } = req.body;
    const user = await import_user.default.findOne({ $or: [{ email }, { phone }] });
    if (!user)
      return res.status(404).json({ error: "User not found" });
    const otp = Math.floor(1e5 + Math.random() * 9e5).toString();
    user.otp = otp;
    user.otpExpiry = Date.now() + OTP_EXPIRY;
    await user.save();
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to send OTP" });
  }
};
const verifyLoginOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await import_user.default.findOne({ email });
    if (!user || user.otp !== otp)
      return res.status(400).json({ error: "Invalid OTP" });
    if (Date.now() > user.otpExpiry)
      return res.status(400).json({ error: "OTP expired" });
    const token = import_jsonwebtoken.default.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRY }
    );
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "OTP verification failed" });
  }
};
const requestAdminSignup = async (req, res) => {
  try {
    const { name, email, password, restaurantId, phone } = req.body;
    const existingUser = await import_user.default.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const admin = new import_user.default({
      name,
      email,
      phone: phone || email,
      password,
      role: "Admin",
      restaurantId,
      status: "pending"
      // Status will be updated once approved
    });
    await admin.save();
    res.status(201).json({
      message: "Admin registration request submitted for approval",
      admin
    });
  } catch (error) {
    res.status(500).json({ errorMessage: "Registration request failed", error });
  }
};
const approveAdmin = async (req, res) => {
  try {
    const { adminId } = req.params;
    if (req.user?.role !== "SuperAdmin") {
      return res.status(403).json({ error: "Unauthorized" });
    }
    const admin = await import_user.default.findById(adminId);
    if (!admin || admin.role !== "Admin" || admin.status !== "pending") {
      return res.status(404).json({ error: "Invalid admin request" });
    }
    admin.status = "verified";
    await admin.save();
    res.status(200).json({ message: "Admin approved successfully" });
  } catch (error) {
    res.status(500).json({ error: "Approval failed" });
  }
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  approveAdmin,
  googleAuthCallback,
  login,
  requestAdminSignup,
  sendLoginOTP,
  signup,
  verifyLoginOTP,
  verifySignupOTP
});
