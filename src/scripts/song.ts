export class Song {
    name: string;
    artist: string;
    image: string;
    url: string;

    constructor(name: string, artist: string, image: string, url: string) {
        this.name = name;
        this.artist = artist;
        this.image = image;
        this.url = url;
    }
}
