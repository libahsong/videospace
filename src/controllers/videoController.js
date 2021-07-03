import User from "../models/User";
import Video from "../models/Video";

export const home = async (req, res) => {
  const videos = await Video.find({});
  res.render("home", { pageTitle: "Home", videos });
};
export const search = async (req, res) => {
  const { keyword } = req.query;
  let videos = [];
  if (keyword) {
    videos = await Video.find({ title: keyword });
    console.log("result:", videos);
  }
  res.render("search", { pageTitle: "Search", keyword, videos });
};

export const watch = async (req, res) => {
  const {
    params: { id },
  } = req;
  const video = await Video.findById(id).populate("owner");
  if (!video) {
    return res.render("404", { pageTitle: "Video not found" });
  }
  return res.render("watch", { pageTitle: video.title, video });
};

export const getUpload = (req, res) => {
  res.render("upload", { pageTitle: "Upload Video" });
};

export const postUpload = async (req, res) => {
  const {
    session: {
      user: { _id },
    },
    body: { title, description, hashtags },
    file: { path: fileUrl },
  } = req;
  console.log(_id, title, description, hashtags, fileUrl);
  try {
    const newVideo = await Video.create({
      title,
      fileUrl,
      description,
      createdAt: Date.now(),
      owner: _id,
      hashtags: Video.formatHashtags(hashtags),
    });
    const user = await User.findById(_id);
    user.videos.push(newVideo._id);
    user.save();
    return res.redirect("/");
  } catch (error) {
    return res.status(400).render("upload", {
      pageTitle: "Upload Video",
      errorMessage: error._message,
    });
  }
};

export const getEdit = async (req, res) => {
  const {
    params: { id },
  } = req;
  // const {
  //   user: {
  //     session: { _id },
  //   },
  // } = req;
  const video = await Video.findById(id);
  console.log(video);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }

  // if (String(video.owner) !== String(_id)) {
  //   req.flash("error", "Not authorized");
  //   return res.status(403).redirect("/");
  // }
  res.render("edit", { pageTitle: `Edit: ${video.title}`, video });
};

export const postEdit = async (req, res) => {
  // const { session: {user:{ _id }} } = req;
  const {
    params: { id },
  } = req;
  const {
    body: { title, description, hashtags },
  } = req;
  const video = await Video.exists({ _id: id });
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video no found" });
  }
  // if (String(video.owner) !== _id) {
  //     req.flash("error", "You are not the owner of he video");
  //     return res.status(403).redirect("/");
  // }
  await Video.findByIdAndUpdate(id, {
    title,
    description,
    hashtags: Video.formatHashtags(hashtags),
  });
  // req.flash("success", "Changes saved.");
  return res.redirect(`/videos/${id}`);
};

export const deleteVideo = async (req, res) => {
  // const { session: {user:{ _id }} } = req;
  const {
    params: { id },
  } = req;
  const video = await Video.findById(id);
  if (!video) {
    return res.status(404).render("404", { pageTitle: "Video not found" });
  }
  // if (String(video.owner) !== String(_id)) {
  //     return res.status(403).rediret("/")
  // }
  await Video.findByIdAndDelete(id);
  return res.redirect("/");
};
