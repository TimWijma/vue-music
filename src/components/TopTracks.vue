<script setup lang="ts">
import { ref } from "vue";
import { Fetch } from "../scripts/Fetch";
import { USERNAME } from "../scripts/globals";
import { Track } from "../scripts/Records";
import TopList from "./TopList.vue";
import { Period, PeriodAPI } from "../scripts/Period.enum";

const tracks = ref<Track[]>([]);

const getTopTracks = async (period = Period.Month) => {
    await Fetch.get("http://localhost:3000/api/lastfm", {
        username: USERNAME,
        type: "tracks",
        period: PeriodAPI[period],
    }).then((response) => {
        console.log("Top Albums:", response);

        tracks.value = response.map(
            (track: any, index: number) =>
                new Track(
                    index + 1,
                    track.title,
                    track.artist,
                    track.img,
                    track.url,
                    track.playcount
                )
        );
    });
};

getTopTracks();
</script>

<template>
    <TopList title="Top Tracks" :records="tracks" @update-records="getTopTracks" />
</template>
