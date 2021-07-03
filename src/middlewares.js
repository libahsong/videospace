import multer from "multer";

export const localMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.user || {};
  res.locals.siteName = "Video Space";
  next();
};

export const videoUpload = multer({
  dest: "uploads/videos/",
  limits: { fileSize: 10000000 },
});

export const avatarUpload = multer({
  dest: "uploads/avatars/",
  limits: { fileSize: 10000000 },
});

export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    //req.flash("error", "Log in first");
    return res.redirect("/");
  }
};

export const publicOnlyMiddleware = (req, res, next) => {
  if (!req.session.loggedIn) {
    return next();
  } else {
    //req.flash("error","Not autorized");
    return res.redirect("/");
  }
};
