export class Record {
    rank: number;
    name: string;
    image: string;
    url: string;
    playcount: number;
    artist?: string;

    constructor(
        rank: number,
        name: string,
        image: string,
        url: string,
        playcount: number
    ) {
        this.rank = rank;
        this.name = name;
        this.image = image;
        this.url = url;
        this.playcount = playcount;
    }
}

export class Track extends Record {
    constructor(
        rank: number,
        name: string,
        artist: string,
        image: string,
        url: string,
        playcount: number
    ) {
        super(rank, name, image, url, playcount);
        this.artist = artist;
    }
}

export class Artist extends Record {
    constructor(
        rank: number,
        name: string,
        image: string,
        url: string,
        playcount: number
    ) {
        super(rank, name, image, url, playcount);
    }
}

export class Album extends Record {
    constructor(
        rank: number,
        name: string,
        artist: string,
        image: string,
        url: string,
        playcount: number
    ) {
        super(rank, name, image, url, playcount);
        this.artist = artist;
    }
}
