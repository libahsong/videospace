export const getLogin = (req, res) => {
    res.render("login", { pagetTitle: "Login" })
}

export const postLogin = (req, res) => {
    res.redirect("/");
};

export const getJoin = (req, res) => {
    res.render("join", { pageTitle: "Join" })
}

export const postJoin = (req, res) => {
    const { body: { name, username, password, password2, location } } = req;
    if (password !== password2) {
        res.status(400);
        res.render("join", { pageTitle: "Join" })
    } else {
        res.redirect("/");
    }
}

export const getEdit = (req, res) => {
    res.render("edit-profile", { pageTitle: "Edit Profile" })
}

export const postEdit = (req, res) => {
    res.send("post edit")
}

export const see = (req, res) => {
    res.send("user profile")
}

export const logout = (req, res) => {
    //To do process logout
    res.redirect("/")
}