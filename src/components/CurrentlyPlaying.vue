<script setup lang="ts">
import { ref } from "vue";
import MarqueeComponent from "./MarqueeComponent.vue";
import { Fetch } from "../scripts/Fetch";
import { calculateBackgroundColor, calculateTextColor } from "../scripts/colors";
import { API_KEY, getSpotifyToken, USERNAME } from "../scripts/globals";
import { Track } from "../scripts/Records";

let reloaded = ref(false);

const currentlyPlaying = ref(false);
const currentSong = ref<Track | null>(null);

const getCurrentSong = async () => {
    await Fetch.get("http://ws.audioscrobbler.com/2.0", {
        method: "user.getrecenttracks",
        format: "json",
        user: USERNAME,
        api_key: API_KEY,
        limit: 1,
    })
        .then(async (response: { recenttracks: any }) => {
            let track = response.recenttracks.track[0];
            if (track["@attr"] && track["@attr"].nowplaying === "true") {
                currentlyPlaying.value = true;
            }

            if (track) {
                let name = track.name;
                let artist = track.artist["#text"];
                let image = track.image[3]["#text"];
                let url = track.url;

                currentSong.value = new Track(-1, name, artist, image, url, -1);

                let colors = await calculateBackgroundColor(image);
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
        .catch((error: any) => {
            console.log(error);
        });
};

getSpotifyToken();
getCurrentSong();

const reload = () => {
    reloaded.value = true;
    document.documentElement.style.setProperty("--transition", "0.5s ease");
    getCurrentSong();
};

const openLink = () => {
    if (currentSong.value) {
        window.open(currentSong.value.url, "_blank");
    }
};
</script>

<template>
    <div class="container transition" v-if="currentSong">
        <img :src="currentSong.image" class="song-cover" alt="Cover" />

        <div class="song-info">
            <span class="song-alt" v-if="currentlyPlaying">Currently playing</span>
            <span class="song-alt" v-else>Last played</span>
            <span class="song-name">
                <MarqueeComponent :text="currentSong.name" activate-on-load :key="currentSong.name">
                    {{ currentSong.name }}
                </MarqueeComponent>
            </span>
            <span class="song-artist" v-if="currentSong.artist">
                <MarqueeComponent
                    :text="currentSong.artist"
                    activate-on-load
                    :key="currentSong.artist">
                    {{ currentSong.artist }}
                </MarqueeComponent>
            </span>

            <div class="song-buttons">
                <button @click="reload" class="material-symbols-outlined transition">sync</button>
                <button @click="openLink" class="material-symbols-outlined transition">
                    open_in_new
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    display: flex;
    align-items: center;
    padding: 24px;
    background-color: var(--vibrant-dark-bg);
    color: var(--vibrant-dark-text);
    border-radius: 30px;
}

.song-cover {
    width: 250px;
    height: auto;

    border-radius: 20px;
}

.song-info {
    overflow: hidden;
    margin-left: 16px;
}

.song-info span {
    display: block;
}

.song-alt {
    opacity: 0.35;
    font-size: 1.5rem;
    font-weight: bold;
}

.song-name,
.song-artist {
    white-space: nowrap;
}

.song-name {
    font-size: 3rem;
    font-weight: bolder;
}

.song-artist {
    font-size: 2.5rem;
}

.song-buttons {
    margin-top: 16px;
}
</style>
