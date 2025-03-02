import { Fetch } from "./Fetch";

export enum MediaType {
    Song = "song",
    Album = "album",
    MusicArtist = "musicArtist",
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

export const getArtistImage = async (artist: string) => {
    let artistImage = "";

    await Fetch.get(
        `https://api.spotify.com/v1/search`,
        {
            type: "artist",
            q: artist,
            decorate_restrictions: false,
            best_match: false,
            include_external: "audio",
            limit: 1,
        },
        true
    )
        .then((response) => {
            artistImage = response.artists.items[0].images[0].url;
        })
        .catch((error) => {
            console.error(error);
        });

    return artistImage;
};
