<script setup lang="ts">
import CurrentlyPlaying from "./components/CurrentlyPlaying.vue";
import TopSongs from "./components/TopTracks.vue";
import TopArtists from "./components/TopArtists.vue";
import TopAlbums from "./components/TopAlbums.vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const initializeScrollTrigger = () => {
    console.log("Initializing ScrollTrigger");

    ScrollTrigger.getAll().forEach((trigger) => {
        trigger.kill();
    });

    const trigger = {
        trigger: ".info",
        start: "top top",
        end: "bottom top",
        scrub: true,
    };

    let tl = gsap.timeline({
        scrollTrigger: trigger,
    });

    gsap.to(".info", {
        top: "0px",
        position: "fixed",
        width: "100%",
        maxWidth: "100%",
        scrollTrigger: trigger,
    });

    gsap.to(".song-container", {
        padding: "16px",
        borderRadius: "0px",
        scrollTrigger: trigger,
    });

    gsap.to(".song-info", {
        marginLeft: "8px",
        scrollTrigger: trigger,
    });

    gsap.to(".song-cover", {
        width: "60px",
        height: "60px",
        borderRadius: "8px",
        scrollTrigger: trigger,
    });

    tl.to(".song-buttons, .song-alt", {
        opacity: 0,
    }).set(
        ".song-buttons, .song-alt",
        {
            display: "none",
        },
        "<0.2"
    );

    gsap.to(".song-name", {
        fontSize: "1.5rem",
        scrollTrigger: trigger,
    });

    gsap.to(".song-artist", {
        fontSize: "1rem",
        scrollTrigger: trigger,
    });

    ScrollTrigger.refresh();
};
</script>

<template>
    <div class="app-container transition">
        <div class="info-container">
            <div class="info">
                <CurrentlyPlaying @loaded="initializeScrollTrigger()" />
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
    z-index: 10;
}

.list-containers {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 48px;
    justify-content: center;
}
</style>
