export class Track {
    rank: number;
    name: string;
    artist: string;
    image: string;
    url: string;
    playcount: number;

    constructor(
        rank: number,
        name: string,
        artist: string,
        image: string,
        url: string,
        playcount: number
    ) {
        this.rank = rank;
        this.name = name;
        this.artist = artist;
        this.image = image;
        this.url = url;
        this.playcount = playcount;
    }
}
