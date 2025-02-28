<script setup lang="ts">
import { ref } from "vue";
import { Fetch } from "./scripts/fetch";
import { Song } from "./scripts/song";

const apikey = import.meta.env.VITE_LASTFM_API_KEY;
const user = "Drag0nEye";

const lastPlayed = ref<string>("");
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
        .then((response) => {
            let recentTracks = response.recenttracks;
            nowPlaying.value = recentTracks.track[0]["@attr"];

            if (nowPlaying) {
                let song = recentTracks.track[0];
                let title = song.name;
                let artist = song.artist["#text"];
                let cover = song.image[2]["#text"];

                currentSong.value = new Song(title, artist, cover);
            }
        })
        .catch((error) => {
            console.log(error);
        });
};

getCurrentSong();
</script>

<template>
    <div v-if="nowPlaying && currentSong">
        {{ currentSong.title }}
        {{ currentSong.artist }}
        <img :src="currentSong.cover" alt="Cover" />
    </div>
</template>

<style scoped></style>
