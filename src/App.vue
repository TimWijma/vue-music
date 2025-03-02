<script setup lang="ts">
import SongInfo from "./components/SongInfo.vue";

import { ref } from "vue";
import { Fetch } from "./scripts/Fetch";
import { Song } from "./scripts/Song";
import { calculateBackgroundColor, calculateTextColor } from "./scripts/colors";
import { API_KEY, USERNAME } from "./scripts/globals";
import TopSongs from "./components/TopTracks.vue";

const nowPlaying = ref<boolean>(false);
const currentSong = ref<Song | null>(null);

console.log(encodeURIComponent("TUPPERWAVE" + " " + "Market Square 7-Eleven"));

const getCurrentSong = async () => {
    await Fetch.get("http://ws.audioscrobbler.com/2.0", {
        method: "user.getrecenttracks",
        format: "json",
        user: USERNAME,
        api_key: API_KEY,
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
            <div class="info">
                <SongInfo :currentSong @reload="getCurrentSong" />
            </div>
        </div>
        <div class="list-containers">
            <div class="list-container">
                <TopSongs />
            </div>
        </div>
    </div>
</template>

<style scoped>
.app-container {
    width: 100%;
    height: 100%;

    color: var(--vibrant-text);
    background-color: var(--vibrant-bg);
    overflow-y: auto;
}

.info-container,
.list-containers {
    padding: 48px;
    box-sizing: border-box;
}

.info-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.info {
    max-width: 65%;
    min-width: 650px;
}

.list-containers {
    display: flex;
}

.list-container {
    width: 25%;
    display: flex;
    justify-content: center;
}
</style>
