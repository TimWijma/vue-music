import { Fetch } from "./Fetch";
import { getSpotifyToken } from "./globals";

export enum MediaType {
    Song,
    Album,
    Artist,
}

enum Platform {
    Spotify,
    ITunes,
}

enum MediaTypeITunes {
    Song = "song",
    Album = "album",
    MusicArtist = "musicArtist",
}

enum MediaTypeSpotify {
    Track = "track",
    Album = "album",
    Artist = "artist",
}

const PlatformMediaMap = {
    [Platform.Spotify]: {
        [MediaType.Song]: MediaTypeSpotify.Track,
        [MediaType.Album]: MediaTypeSpotify.Album,
        [MediaType.Artist]: MediaTypeSpotify.Artist,
    },
    [Platform.ITunes]: {
        [MediaType.Song]: MediaTypeITunes.Song,
        [MediaType.Album]: MediaTypeITunes.Album,
        [MediaType.Artist]: MediaTypeITunes.MusicArtist,
    },
};

const MediaTypePreference = {
    [MediaType.Song]: [Platform.ITunes, Platform.Spotify],
    [MediaType.Album]: [Platform.Spotify, Platform.ITunes],
    [MediaType.Artist]: [Platform.ITunes, Platform.Spotify],
};

const getImageITunes = async (search: string, mediaType: MediaTypeITunes) => {
    let image = "";
    await Fetch.get(`http://localhost:3000/api/itunes`, {
        search,
        mediaType,
    })
        .then((response) => {
            if (response.results.length === 0) return;
            image = response.results[0].artworkUrl100;
        })
        .catch((error) => {
            console.error(search, error);
        });

    return image;
};

const getImageSpotify = async (search: string, mediaType: MediaTypeSpotify) => {
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
            switch (mediaType) {
                case MediaTypeSpotify.Artist:
                    image = response.artists.items[0].images[0].url;
                    break;
                case MediaTypeSpotify.Album:
                    image = response.albums.items[0].images[0].url;
                    break;
                case MediaTypeSpotify.Track:
                    image = response.tracks.items[0].album.images[0].url;
                    break;
            }
        })
        .catch(async (error) => {
            if (error.status === 401) {
                console.log("Token expired. Fetching new token...");
                getSpotifyToken();

                image = await getImageSpotify(search, mediaType);
            }
        });

    return image;
};

export const getImage = async (search: string, mediaType: MediaType) => {
    const platforms = MediaTypePreference[mediaType];
    let image = "";

    for (const platform of platforms) {
        const mediaTypePlatform = PlatformMediaMap[platform][mediaType];
        switch (platform) {
            case Platform.ITunes:
                image = await getImageITunes(search, mediaTypePlatform as MediaTypeITunes);
                break;
            case Platform.Spotify:
                image = await getImageSpotify(search, mediaTypePlatform as MediaTypeSpotify);
                break;
        }

        if (image) break;
    }

    return image;
};
