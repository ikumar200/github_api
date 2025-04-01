const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/github/:username", async (req, res) => {
    try {
        const { username } = req.params;
        const response = await axios.get(`https://api.github.com/users/${username}`);
        res.json({
            name: response.data.name,
            bio: response.data.bio,
            avatar: response.data.avatar_url,
            repos: response.data.public_repos,
            followers: response.data.followers,
            following: response.data.following,
            profileUrl: response.data.html_url
        });
    } catch (error) {
        res.status(404).json({ message: "User not found" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
