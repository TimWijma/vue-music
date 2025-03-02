import { Fetch } from "./Fetch";

export enum MediaTypeITunes {
    Song = "song",
    Album = "album",
    MusicArtist = "musicArtist",
}

export enum MediaTypeSpotify {
    Track = "track",
    Album = "album",
    Artist = "artist",
}



export const getImageITunes = async (artist: string, name: string, mediaType: MediaTypeITunes) => {
    let image = "";
    await Fetch.get(`http://localhost:3000/api/itunes`, {
        artist,
        name,
        mediaType,
    })
        .then((response) => {
            console.log(response);

            image = response.results[0].artworkUrl100
        })
        .catch((error) => {
            console.error(error);
        });

    return image;
};

export const getImageSpotify = async (search: string, mediaType: MediaTypeSpotify) => {
    let image = "";

    await Fetch.get(
        `https://api.spotify.com/v1/search`,
        {
            type: mediaType,
            q: search,
            limit: 1,
        },
        true
    )
        .then((response) => {
            image = response.artists.items[0].images[0].url;
        })
        .catch((error) => {
            console.error(error);
        });

    return image;
};
