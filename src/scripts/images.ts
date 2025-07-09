import { Fetch } from "./Fetch";
import { USERNAME } from "./globals";
import { PeriodAPI, type Period } from "./Period.enum";

export enum MediaType {
    Song = "tracks",
    Album = "albums",
    Artist = "artists",
}

export const getImages = async (type: MediaType, period: Period) => {
    const response = await Fetch.get(`http://localhost:3000/api/lastfm`, {
        username: USERNAME,
        type: type,
        period: PeriodAPI[period],
    });

    return response;
};
