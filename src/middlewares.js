import multer from "multer";

export const localMiddleware = (req, res, next) => {
    res.locals.loggedIn = true;
    res.locals.loggedInUser = {
        id: 1
    };
    res.locals.siteName = "Video Space";
    next();
}

export const videoUpload = multer({
    dest: "uploads/videos/",
    limits: { fileSize: 10000000 }
})

export const avatarUpload = multer({
    dest: "uploads/avatars/",
    limits: { fileSize: 10000000 }
})