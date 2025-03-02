import { Fetch } from "./Fetch";

export enum MediaType {
    Song = "song",
    Album = "album",
}

export const getImage = async (artist: string, name: string, mediaType: MediaType) => {
    let image = "";
    await Fetch.get(`http://localhost:3000/api/itunes`, {
        artist,
        name,
        mediaType,
    })
        .then((response) => (image = response.results[0].artworkUrl100))
        .catch((error) => {
            console.error(error);
        });

    return image;
};
