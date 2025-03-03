import { Fetch } from "./Fetch";

export const API_KEY = import.meta.env.VITE_LASTFM_API_KEY;
export const USERNAME = "Drag0nEye";

export let spotifyToken = "";

export const checkSpotifyToken = async () => {
    if (!spotifyToken) {
        await getSpotifyToken();
    } else if (Date.now() > Date.parse(localStorage.getItem("spotifyTokenExpiration") || "")) {
        await getSpotifyToken();
    }

    return spotifyToken !== "";
};

export const getSpotifyToken = async () => {
    await Fetch.get("http://localhost:3000/api/spotifytoken")
        .then((response) => {
            const { accessToken, accessTokenExpirationTimestampMs } = response;

            spotifyToken = accessToken;
            localStorage.setItem("spotifyTokenExpiration", accessTokenExpirationTimestampMs);
        })
        .catch((error: any) => {
            console.log(error);

            spotifyToken = "";
        });
};
