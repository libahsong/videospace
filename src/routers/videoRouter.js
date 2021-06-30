import express from "express";
import { getUpload, postUpload, watch } from "../controllers/videoController";
import { videoUpload } from "../middlewares";

const videoRouter = express.Router();

videoRouter.route("/upload").get(getUpload).post(videoUpload.single("video"), postUpload);


videoRouter.get("/:id", watch);


export default videoRouter;