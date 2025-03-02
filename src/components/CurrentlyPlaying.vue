<script setup lang="ts">
import { ref } from "vue";
import MarqueeComponent from "./MarqueeComponent.vue";
import type { Track } from "../scripts/Records";

const props = defineProps<{
    currentSong: Track;
}>();

let reloaded = ref(false);

const openLink = () => {
    window.open(props.currentSong.url, "_blank");
};
</script>

<template>
    <div class="container" :class="{ transition: reloaded }">
        <img :src="currentSong.image" class="song-cover" alt="Cover" />

        <div class="song-info">
            <span class="song-alt">Currently playing</span>
            <span class="song-name">
                <MarqueeComponent :text="currentSong.name" />
            </span>
            <span class="song-artist" v-if="currentSong.artist">
                <MarqueeComponent :text="currentSong.artist" />
            </span>

            <div class="song-buttons">
                <button
                    @click="
                        () => {
                            $emit('reload');
                            reloaded = true;
                        }
                    "
                    class="material-symbols-outlined">
                    sync
                </button>
                <button @click="openLink" class="material-symbols-outlined">open_in_new</button>
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
