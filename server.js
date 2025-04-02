const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
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

// Export the app for Vercel serverless functions
module.exports = app;

// Only start listening locally (for development)
if (require.main === module) {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
