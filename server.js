import express from "express";
import cors from "cors";
import { Vibrant } from "node-vibrant/node";
import { parse } from "node-html-parser";

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

app.get("/api/lastfm/home", async (req, res) => {
    const { username } = req.query;

    if (!username) {
        res.status(400).send("Missing required query parameters");
        return;
    }

    try {
        const url = `https://www.last.fm/user/${username}`;
        const response = await fetch(url);

        if (!response.ok) {
            return res.status(response.status).send("Failed to fetch Last.fm page");
        }

        const html = await response.text();

        const root = parse(html);
        const recentTracks = root.querySelector(".chartlist");
        if (!recentTracks) return res.status(404).send("No recent tracks found");

        const lastTrack = recentTracks.querySelector("tbody tr");
        if (!lastTrack) return res.status(404).send("No tracks found");

        const currentlyPlaying = lastTrack.classList.contains("chartlist-row--now-scrobbling");
        const img = lastTrack.querySelector(".chartlist-image a img").getAttribute("src");

        res.send({ img, currentlyPlaying });
    } catch (error) {
        console.error("Error scraping Last.fm:", error);
        res.status(500).send("Error scraping Last.fm page");
    }
});

app.get("/api/lastfm", async (req, res) => {
    const { username, type = "artists", period = "ALL" } = req.query;

    if (!username) {
        res.status(400).send("Missing required query parameters");
        return;
    }

    try {
        const url = `https://www.last.fm/user/${username}/partial/${type}?${type}_date_preset=${period}`;

        // Fetch the HTML page
        const response = await fetch(url);
        if (!response.ok) {
            return res.status(response.status).send("Failed to fetch Last.fm page");
        }

        const html = await response.text();

        // console.log(html);`

        const root = parse(html);
        const items = {};

        if (type === "artists" || type === "albums") {
            root.querySelectorAll(".grid-items-cover-image").forEach((entry) => {
                const img = entry
                    .querySelector(".grid-items-cover-image-image img")
                    .getAttribute("src");
                const title = entry.querySelector(".grid-items-item-main-text").textContent.trim();

                items[title] = img;
            });
        } else if (type === "tracks") {
            root.querySelectorAll(".chartlist-row").forEach((entry) => {
                const img = entry.querySelector(".chartlist-image a img").getAttribute("src");
                const title = entry.querySelector(".chartlist-name a").textContent.trim();

                items[title] = img;
            });
        }

        console.log(items);

        res.send(items);
    } catch (error) {
        console.error("Error scraping Last.fm:", error);
        res.status(500).send("Error scraping Last.fm page");
    }
});

const port = 3000;

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
