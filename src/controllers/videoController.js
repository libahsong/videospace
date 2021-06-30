import Video from "../models/Video";

export const home = async (req, res) => {
    const videos = await Video.find({});
    res.render("home", { pageTitle: "Home", videos });
}
export const search = (req, res) => {
    const { keyword } = req.query;
    res.render("search", { pageTitle: "Search", keyword, videos })
};

export const watch = (req, res) => {
    res.render("watch", { pageTitle: "Watch Video" })
}

export const getUpload = (req, res) => {
    res.render("upload", { pageTitle: "Upload Video" })
}

export const postUpload = async (req, res) => {
    const {
        body: { title, description, hashtags },
        file: { path: fileUrl }
    } = req;
    console.log(title, description, hashtags, fileUrl)
    try {
        const newVideo = await Video.create({
            title,
            fileUrl,
            description,
            createdAt: Date.now(),
            hashtags: Video.formatHashtags(hashtags)
        });
        console.log("newVideo:", newVideo);
        return res.redirect("/");
    } catch (error) {
        return res.status(400).render("upload", {
            pageTitle: "Upload Video",
            errorMessage: error._message
        });
    }

}