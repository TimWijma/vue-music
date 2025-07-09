import express from "express";
import cors from "cors";
import { Vibrant } from "node-vibrant/node";
import { parse } from "node-html-parser";

const app = express();
app.use(cors());

app.get("/api/lastfm/latest", async (req, res) => {
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

        const title = lastTrack.querySelector(".chartlist-name a").textContent.trim();
        const artist = lastTrack.querySelector(".chartlist-artist a").textContent.trim();
        const track_url = lastTrack.querySelector(".chartlist-name a").getAttribute("href");

        const currentlyPlaying = lastTrack.classList.contains("chartlist-row--now-scrobbling");
        const img = lastTrack.querySelector(".chartlist-image a img").getAttribute("src");

        if (!img) {
            res.status(400).send("Missing required query parameters");
            return;
        }

        const v = new Vibrant(img);
        const palette = await v.getPalette();

        res.send({ title, artist, url: track_url, img, currentlyPlaying, palette });
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
        console.log(`Fetching Last.fm data from: ${url}`);

        const response = await fetch(url);
        if (!response.ok) {
            return res.status(response.status).send("Failed to fetch Last.fm page");
        }

        const html = await response.text();
        const root = parse(html);
        const items = [];

        const querySelectorsArtists = {
            item: ".grid-items-item",
            title: ".grid-items-item-main-text a",
            image: ".grid-items-cover-image-image img",
            url: ".grid-items-item-main-text a",
            playcount: ".grid-items-item-aux-text a",
        };

        const querySelectorsAlbums = {
            item: ".grid-items-item",
            title: ".grid-items-item-main-text a",
            image: ".grid-items-cover-image-image img",
            artist: ".grid-items-item-aux-text a",
            url: ".grid-items-item-main-text a",
            playcount: ".grid-items-item-aux-text a:last-child",
        };

        const querySelectorsTracks = {
            item: ".chartlist-row",
            title: ".chartlist-name a",
            image: ".chartlist-image a img",
            artist: ".chartlist-artist a",
            url: ".chartlist-name a",
            playcount: ".chartlist-count-bar-value",
        };

        const queryTypes = {
            artists: querySelectorsArtists,
            albums: querySelectorsAlbums,
            tracks: querySelectorsTracks,
        };
        let queries = queryTypes[type];

        root.querySelectorAll(queries.item).forEach((entry) => {
            const title = entry.querySelector(queries.title).textContent.trim();
            const img = entry.querySelector(queries.image)?.getAttribute("src");
            const artist = queries.artist
                ? entry.querySelector(queries.artist)?.textContent.trim() || ""
                : "";
            const url = entry.querySelector(queries.url).getAttribute("href");
            const playcount = entry.querySelector(queries.playcount)?.textContent.trim() || "";
            const playcountNumber = parseInt(playcount.replace(/,/g, ""), 10) || 0;

            items.push({
                title,
                img,
                artist,
                url,
                playcount: playcountNumber,
            });
        });

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
