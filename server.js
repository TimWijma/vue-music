import express from "express";
import cors from "cors";
import { Vibrant } from "node-vibrant/node";

const app = express();
app.use(cors());

app.get("/api/spotifytoken", async (_, res) => {
    const url = "https://open.spotify.com/get_access_token";
    const response = await fetch(url);
    const data = await response.json();

    res.send(data);
});

app.get("/api/itunes", async (req, res) => {
    const { search, mediaType = "song" } = req.query;

    if (!search) {
        res.status(400).send("Missing required query parameters");
        return;
    }

    const url = `https://itunes.apple.com/search?term=${search}&entity=${mediaType}`;
    const response = await fetch(url);
    const data = await response.json();

    res.send(data);
});

app.get("/api/vibrant", async (req, res) => {
    const { image } = req.query;

    if (!image) {
        res.status(400).send("Missing required query parameters");
        return;
    }

    const v = new Vibrant(image);
    const palette = await v.getPalette();

    res.send(palette);
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
