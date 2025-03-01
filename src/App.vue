<script setup lang="ts">
import SongInfo from "./components/SongInfo.vue";

import { ref } from "vue";
import { Fetch } from "./scripts/fetch";
import { Song } from "./scripts/song";
import { calculateBackgroundColor, calculateTextColor } from "./scripts/colors";

const apikey = import.meta.env.VITE_LASTFM_API_KEY;
const user = "Drag0nEye";

const nowPlaying = ref<boolean>(false);
const currentSong = ref<Song | null>(null);

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
                let url = song.url;

                currentSong.value = new Song(title, artist, cover, url);

                let colors = await calculateBackgroundColor(cover);

                document.documentElement.style.setProperty(
                    "--vibrant-text",
                    calculateTextColor(colors.vibrant)
                );
                document.documentElement.style.setProperty(
                    "--vibrant-dark-text",
                    calculateTextColor(colors.darkVibrant)
                );
                document.documentElement.style.setProperty(
                    "--vibrant-bg",
                    `rgb(${colors.vibrant})`
                );
                document.documentElement.style.setProperty(
                    "--vibrant-dark-bg",
                    `rgb(${colors.darkVibrant})`
                );
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

getCurrentSong();
</script>

<template>
    <div class="app-container">
        <div v-if="nowPlaying && currentSong" class="info-container">
            <SongInfo :currentSong @reload="getCurrentSong" />
        </div>
    </div>
</template>

<style scoped>
.app-container {
    width: 100%;
    height: 100%;

    color: var(--vibrant-text);
    background-color: var(--vibrant-dark-bg);

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.info-container {
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>
