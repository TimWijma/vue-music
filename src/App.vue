<script setup lang="ts">
import CurrentlyPlaying from "./components/CurrentlyPlaying.vue";
import TopSongs from "./components/TopTracks.vue";
import TopArtists from "./components/TopArtists.vue";
import TopAlbums from "./components/TopAlbums.vue";
import { onMounted, ref } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const containerRef = ref<HTMLElement | null>(null);

onMounted(() => {
    if (!containerRef.value) return;

    gsap.to(containerRef.value, {
        width: "100vw",
        top: "0px",
        backgroundColor: "red",
        borderRadius: "0px",
        scrollTrigger: {
            trigger: containerRef.value,
            start: "top top",
            end: "+=200",
            scrub: true,
            pin: true,
            markers: true,
        },
    });
});
</script>

<template>
    <div class="app-container transition">
        <div class="info-container">
            <div class="info" ref="containerRef">
                <CurrentlyPlaying />
            </div>
        </div>
        <div class="list-containers">
            <TopArtists />
            <TopSongs />
            <TopAlbums />
        </div>
    </div>
</template>

<style scoped>
.app-container {
    width: 100%;
    min-height: 100%;

    color: var(--vibrant-text);
    background-color: var(--vibrant-bg);
}

.info-container,
.list-containers {
    padding: 48px;
    box-sizing: border-box;
}

.info-container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.info {
    max-width: 65%;
    min-width: 650px;
}

.list-containers {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 48px;
    justify-content: center;
}
</style>
