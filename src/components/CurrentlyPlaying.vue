<script setup lang="ts">
import { nextTick, ref } from "vue";
import MarqueeComponent from "./MarqueeComponent.vue";
import { Fetch } from "../scripts/Fetch";
import { calculateBackgroundColor, calculateTextColor } from "../scripts/colors";
import { API_KEY, getSpotifyToken, USERNAME } from "../scripts/globals";
import { Track } from "../scripts/Records";
import CurrentlyPlayingAnimation from "./CurrentlyPlayingAnimation.vue";
import SkeletonLoader from "./SkeletonLoader.vue";

const isReloading = ref(false);
const currentlyPlaying = ref(false);
const currentSong = ref<Track | null>(null);

const emit = defineEmits(["loaded"]);

const getCurrentSong = async () => {
    isReloading.value = true;
    let startTime = Date.now();

    await Fetch.get("http://localhost:3000/api/lastfm/latest", {
        username: USERNAME,
    })
        .then(
            async (response: {
                title: string;
                artist: string;
                url: string;
                img: string;
                currentlyPlaying: boolean;
            }) => {
                currentlyPlaying.value = response.currentlyPlaying;

                if (response.title) {
                    currentSong.value = new Track(
                        -1,
                        response.title,
                        response.artist,
                        response.img,
                        response.url,
                        -1
                    );

                    await nextTick();
                    emit("loaded");

                    let colors = await calculateBackgroundColor(response.img);
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
            }
        )
        .catch((error: any) => {
            console.log(error);
        });

    // Ensure the reload animation always does a full rotation
    let timeDiff = Date.now() - startTime;
    let timeToWait = 1000 - (timeDiff % 1000);
    setTimeout(() => {
        isReloading.value = false;
    }, timeToWait);
};

getSpotifyToken();
getCurrentSong();

const openLink = () => {
    if (currentSong.value) {
        window.open(currentSong.value.url, "_blank");
    }
};
</script>

<template>
    <div class="container transition song-container">
        <img v-if="currentSong" :src="currentSong.image" class="song-cover" alt="Cover" />
        <span v-else class="song-cover">
            <SkeletonLoader width="100%" height="100%" />
        </span>

        <div class="song-info">
            <div class="song-alt">
                <span v-if="currentlyPlaying">
                    <div class="song-playinginfo">Currently playing</div>
                    <div class="song-playinganimation">
                        <CurrentlyPlayingAnimation />
                    </div>
                </span>
                <span v-else>Last played</span>
            </div>
            <span class="song-name">
                <MarqueeComponent
                    v-if="currentSong"
                    :text="currentSong.name"
                    activate-on-load
                    :key="currentSong.name"
                >
                    {{ currentSong.name }}
                </MarqueeComponent>
                <SkeletonLoader v-else width="100%" height="40px" />
            </span>
            <span class="song-artist" v-if="currentSong?.artist">
                <MarqueeComponent
                    :text="currentSong.artist"
                    activate-on-load
                    :key="currentSong.artist"
                >
                    {{ currentSong.artist }}
                </MarqueeComponent>
            </span>

            <div class="song-buttons">
                <button @click="getCurrentSong" class="material-symbols-outlined transition">
                    <span :class="{ reload: isReloading }">sync</span>
                </button>
                <button @click="openLink" class="material-symbols-outlined transition">
                    open_in_new
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 24px;
    background-color: var(--vibrant-dark-bg);
    color: var(--vibrant-dark-text);
    border-radius: 30px;
}

.song-cover {
    width: 250px;
    height: 250px;

    border-radius: 20px;
}

.song-info {
    overflow: hidden;
    margin-left: 16px;
}

.song-alt {
    opacity: 0.35;
}

.song-alt span {
    display: flex;
    flex-direction: row;

    width: 100%;
    font-size: 1.5rem;
    font-weight: bold;
}

.song-alt .song-playinginfo {
    margin-right: 8px;
}

.song-playinganimation {
    margin-bottom: 4px;
    opacity: 0.8;
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

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(-360deg);
    }
}

.reload {
    display: inline-block;
    animation: spin 1s infinite;
}
</style>
