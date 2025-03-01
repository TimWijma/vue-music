export class Song {
    title: string;
    artist: string;
    cover: string;
    url: string;

    constructor(title: string, artist: string, cover: string, url: string) {
        this.title = title;
        this.artist = artist;
        this.cover = cover;
        this.url = url;
    }
}
