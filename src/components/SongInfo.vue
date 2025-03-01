<script setup lang="ts">
import { ref } from "vue";
import { Song } from "../scripts/song";

const props = defineProps<{
    currentSong: Song;
}>();

let reloaded = ref(false);
let isAnimating = ref(false);

const getTitleWidth = () => {
    let originalElement = document.querySelector(".song-title") as HTMLElement;
    let cloneElement = originalElement.cloneNode(true) as HTMLElement;
    cloneElement.style.visibility = "hidden";
    cloneElement.style.position = "absolute";
    cloneElement.style.width = "auto";
    cloneElement.style.whiteSpace = "nowrap";

    document.body.appendChild(cloneElement);
    let width = cloneElement.offsetWidth;
    document.body.removeChild(cloneElement);

    return width;
};

const checkTitleLength = () => {
    if (isAnimating.value) return;

    let titleWidth = getTitleWidth();
    let title = document.querySelector(".song-title") as HTMLElement;
    let info = document.querySelector(".song-info") as HTMLElement;

    if (titleWidth > info.offsetWidth) {
        isAnimating.value = true;
        const gap = " - ";
        title.innerHTML = props.currentSong.title + gap;
        const gapWidth = getTitleWidth();
        title.innerHTML =
            props.currentSong.title + gap + props.currentSong.title;

        title.style.setProperty("--scroll-width", `-${gapWidth + 8}px`);

        const duration = titleWidth / 150;
        title.style.animation = `scroll ${duration}s linear`;

        title.addEventListener(
            "animationend",
            () => {
                stopTitleScroll();
            },
            { once: true }
        );
    } else {
        title.innerHTML = props.currentSong.title;
        title.style.animation = "none";
    }
};

const stopTitleScroll = () => {
    let title = document.querySelector(".song-title") as HTMLElement;
    title.innerHTML = props.currentSong.title;
    title.style.animation = "none";
    isAnimating.value = false;
};
</script>

<template>
    <div class="container" :class="{ transition: reloaded }">
        <img :src="currentSong.cover" class="song-cover" alt="Cover" />

        <div class="song-info">
            <span class="song-alt">Currently playing</span>
            <span class="song-title" @mouseover="checkTitleLength">
                {{ currentSong.title }}
            </span>
            <span class="song-artist">
                {{ currentSong.artist }}
            </span>

            <div
                class="song-buttons"
                @click="
                    () => {
                        $emit('reload');
                        reloaded = true;
                        stopTitleScroll();
                    }
                ">
                <button class="reload material-symbols-outlined">sync</button>
            </div>
        </div>
    </div>
</template>

<style>
@keyframes scroll {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(var(--scroll-width));
    }
}
</style>

<style scoped>
.container {
    width: 65%;

    display: flex;
    align-items: center;

    padding: 16px;

    background-color: var(--vibrant-bg);

    border-radius: 30px;
}

.song-cover {
    width: 250px;
    height: auto;

    border-radius: 30px;
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

.song-title {
    font-size: 3rem;
    font-weight: bolder;

    white-space: nowrap;
}

.song-artist {
    font-size: 2.5rem;
}
</style>
