import { Fetch } from "./Fetch";

export const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
export let SPOTIFY_TOKEN = import.meta.env.VITE_SPOTIFY_TOKEN;
export const USERNAME = "Drag0nEye";

export const getSpotifyToken = async () => {
    await Fetch.get("http://localhost:3000/api/spotifytoken")
        .then((response) => {
            const { accessToken } = response;

            SPOTIFY_TOKEN = accessToken;
        })
        .catch((error: any) => {
            console.log(error);
        });
};
