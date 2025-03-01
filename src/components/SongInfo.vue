<script setup lang="ts">
import { ref } from "vue";
import { Fetch } from "../scripts/fetch";
import { Song } from "../scripts/song";
import { calculateBackgroundColor, calculateTextColor } from "../scripts/colors";

const apikey = import.meta.env.VITE_LASTFM_API_KEY;
const user = "Drag0nEye";

const nowPlaying = ref<boolean>(false);
const currentSong = ref<Song | null>(null);
const rgb = ref<number[]>([]);

const getCurrentSong = async () => {
    await Fetch.get("http://ws.audioscrobbler.com/2.0", {
        method: "user.getrecenttracks",
        format: "json",
        user: user,
        api_key: apikey,
        limit: 1,
    })
        .then(async (response) => {
            let recentTracks = response.recenttracks;
            nowPlaying.value = recentTracks.track[0]["@attr"];

            if (nowPlaying.value) {
                let song = recentTracks.track[0];
                let title = song.name;
                let artist = song.artist["#text"];
                let cover = song.image[3]["#text"];

                currentSong.value = new Song(title, artist, cover);

                rgb.value = await calculateBackgroundColor(cover);

                // set css variables
                document.documentElement.style.setProperty(
                    "--text-color",
                    calculateTextColor(rgb.value)
                );
                document.documentElement.style.setProperty("--bg-color", `rgb(${rgb.value})`);
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

getCurrentSong();
</script>

<template>
    <div v-if="nowPlaying && currentSong && rgb" class="container">
        <img :src="currentSong.cover" class="song-cover" alt="Cover" />

        <div class="song-info">
            <span class="song-title">
                {{ currentSong.title }}
            </span>
            <div class="song-artist">
                {{ currentSong.artist }}
            </div>
        </div>

        <button @click="getCurrentSong">Get current song</button>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    height: 100%;

    color: var(--text-color);
    background-color: var(--bg-color);

    transition: 0.5s ease;

    display: flex;
    align-items: center;
}

.song-cover {
    width: 100px;
    height: 100px;
    margin: 0 20px;
}
</style>
