import express from "express";
import { changeTableForUser } from "../controllers/table.controller";

const tableRoutes = express.Router();

tableRoutes.post("/change-table", changeTableForUser);


export default tableRoutes;
