import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/api/spotifytoken", async (req, res) => {
    // https://open.spotify.com/get_access_token
    const url = "https://open.spotify.com/get_access_token";
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    res.send(data);
});

app.get("/api/itunes", async (req, res) => {
    const { artist, name = "", mediaType = "song" } = req.query;
    console.log(req.query);

    if (!artist) {
        res.status(400).send("Missing required query parameters");
        return;
    }

    const url = `https://itunes.apple.com/search?term=${artist}${"+" + name}&entity=${mediaType}`;
    const response = await fetch(url);
    const data = await response.json();

    console.log(data);

    res.send(data);
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
