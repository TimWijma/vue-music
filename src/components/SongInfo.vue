<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { Song } from "../scripts/song";
import { Marquee } from "../scripts/marquee";

const props = defineProps<{
    currentSong: Song;
}>();

let reloaded = ref(false);

let titleMarquee: Marquee;
let artistMarquee: Marquee;

const openLink = () => {
    window.open(props.currentSong.url, "_blank");
};

onMounted(() => {
    titleMarquee = new Marquee(".song-title", ".song-info", props.currentSong.title);
    artistMarquee = new Marquee(".song-artist", ".song-info", props.currentSong.artist);
});

watch(
    () => props.currentSong,
    () => {
        titleMarquee.originalText = props.currentSong.title;
        artistMarquee.originalText = props.currentSong.artist;
    }
);
</script>

<template>
    <div class="container" :class="{ transition: reloaded }">
        <img :src="currentSong.cover" class="song-cover" alt="Cover" />

        <div class="song-info">
            <span class="song-alt">Currently playing</span>
            <span class="song-title" @mouseover="titleMarquee.startScroll">
                {{ currentSong.title }}
            </span>
            <span class="song-artist" @mouseover="artistMarquee.startScroll">
                {{ currentSong.artist }}
            </span>

            <div class="song-buttons">
                <button
                    @click="
                        () => {
                            $emit('reload');
                            reloaded = true;
                            titleMarquee.stopScroll();
                            artistMarquee.stopScroll();
                        }
                    "
                    class="material-symbols-outlined"
                >
                    sync
                </button>
                <button @click="openLink" class="material-symbols-outlined">open_in_new</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container {
    width: 65%;
    display: flex;
    align-items: center;
    padding: 24px;
    background-color: var(--vibrant-bg);
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

.song-title,
.song-artist {
    white-space: nowrap;
}

.song-title {
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
