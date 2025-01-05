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
var main_exports = {};
__export(main_exports, {
  io: () => io
});
module.exports = __toCommonJS(main_exports);
var import_express = __toESM(require("express"));
var import_database = __toESM(require("./config/database"));
var import_restaurant = __toESM(require("./routes/restaurant.routes"));
var import_auth = __toESM(require("./routes/auth.routes"));
var import_dotenv = __toESM(require("dotenv"));
var import_errorHandler = __toESM(require("./middlewares/errorHandler"));
var import_uploadMiddleware = require("./middlewares/uploadMiddleware");
var import_googleAuth = __toESM(require("./utils/googleAuth"));
var import_http = __toESM(require("http"));
var import_socket = __toESM(require("socket.io"));
var import_cors = __toESM(require("cors"));
import_dotenv.default.config();
const app = (0, import_express.default)();
const server = import_http.default.createServer(app);
const io = new import_socket.default.Server(server);
const PORT = process.env.PORT || 3e3;
const corsOptions = {
  origin: ["http://localhost:4200", "http://localhost:4300"],
  // Allow both frontend URLs
  credentials: true
  // Allow cookies to be sent with requests
};
app.use((0, import_cors.default)(corsOptions));
app.use(import_express.default.json());
(0, import_database.default)();
app.use(import_express.default.urlencoded({ extended: true }));
app.use(import_uploadMiddleware.handleFileUpload);
app.use(import_googleAuth.default.initialize());
app.use("/api/auth", import_auth.default);
app.use("/api/restaurants", import_restaurant.default);
app.use(import_errorHandler.default);
app.get("/health", async (req, res) => {
  const healthReport = {
    status: "OK",
    uptime: process.uptime(),
    timestamp: /* @__PURE__ */ new Date(),
    database: "Unknown",
    memoryUsage: process.memoryUsage()
    // loadAverage: process.loadavg(),
  };
  try {
    const isDatabaseConnected = await checkDatabaseConnection();
    healthReport.database = isDatabaseConnected ? "Connected" : "Disconnected";
  } catch (err) {
    healthReport.database = "Error";
  }
  res.status(200).json(healthReport);
});
app.get("/test", (req, res) => {
  res.status(200).json({ message: "API Test Route is working!" });
});
app.get("/", (req, res) => {
  res.send({ message: "Welcome to the Tap-n-Taste API!" });
});
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
io.on("connection", (socket) => {
  console.log("A user connected");
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
async function checkDatabaseConnection() {
  const mongoose = require("mongoose");
  return mongoose.connection.readyState === 1;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  io
});
