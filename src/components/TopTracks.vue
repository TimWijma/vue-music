<script setup lang="ts">
import { ref } from "vue";
import { Fetch } from "../scripts/Fetch";
import { API_KEY, USERNAME } from "../scripts/globals";
import { Track } from "../scripts/Records";
import { getImageITunes, MediaTypeITunes } from "../scripts/images";
import TopRecords from "./TopRecord.vue";

const tracks = ref<Track[]>([]);

const getTopTracks = async () => {
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
                        "",
                        track.url,
                        track.playcount
                    )
            );

            toptracks.forEach((track: any, index: number) => {
                getImageITunes(track.artist.name, track.name, MediaTypeITunes.Song)
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

getTopTracks();
</script>

<template>
    <div class="top-records">
        <h2>Top Tracks</h2>
        <div class="records-container">
            <div v-for="track in tracks" :key="track.rank">
                <TopRecords :record="track" />
            </div>
        </div>
    </div>
</template>
