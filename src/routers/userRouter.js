import express from "express";
import { getEdit, postEdit, see, logout } from "../controllers/userController";


const userRouter = express.Router();

userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get("/password", (req, res) => res.send("User Password"));
userRouter.get("/logout", logout);
userRouter.get("/:id", see);

export default userRouter;