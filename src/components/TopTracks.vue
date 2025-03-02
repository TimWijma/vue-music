<script setup lang="ts">
import { ref } from "vue";
import { Fetch } from "../scripts/Fetch";
import { API_KEY, USERNAME } from "../scripts/globals";
import { Track } from "../scripts/Track";
import { getImage, MediaType } from "../scripts/images";
import TopTrack from "./TopTrack.vue";

const tracks = ref<Track[]>([]);

const getCurrentSong = async () => {
    await Fetch.get("http://ws.audioscrobbler.com/2.0", {
        method: "user.gettoptracks",
        format: "json",
        user: USERNAME,
        api_key: API_KEY,
        limit: 5,
        period: "1month",
    })
        .then(async (response) => {
            let toptracks = response.toptracks.track;

            tracks.value = toptracks.map(
                (track: any, index: number) =>
                    new Track(
                        index + 1,
                        track.name,
                        track.artist.name,
                        "", // Empty image initially
                        track.url,
                        track.playcount
                    )
            );

            toptracks.forEach((track: any, index: number) => {
                getImage(track.artist.name, track.name, MediaType.Song)
                    .then((image) => {
                        tracks.value[index] = new Track(
                            index + 1,
                            track.name,
                            track.artist.name,
                            image,
                            track.url,
                            track.playcount
                        );
                    })
                    .catch((error) => console.log(error));
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

getCurrentSong();
</script>

<template>
    <div class="top-tracks">
        <h2>Top Tracks</h2>
        <div class="tracks">
            <div v-for="track in tracks" :key="track.rank" class="track">
                <TopTrack :track="track" />
            </div>
        </div>
    </div>
</template>

<style scoped>
h2 {
    font-weight: bolder;
    font-size: 2rem;
    margin: 16px 0;
}

.top-tracks {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 24px;
    background-color: var(--vibrant-dark-bg);
    color: var(--vibrant-dark-text);
    border-radius: 30px;
}
</style>
