<script setup lang="ts">
import { ref } from "vue";
import { Fetch } from "../scripts/Fetch";
import { API_KEY, USERNAME } from "../scripts/globals";
import { Track } from "../scripts/Records";
import { getImage, MediaType } from "../scripts/images";
import TopList from "./TopList.vue";
import { Period } from "../scripts/Period.enum";

const tracks = ref<Track[]>([]);

const getTopTracks = async (period: Period = Period.Month) => {
    await Fetch.get("http://ws.audioscrobbler.com/2.0", {
        method: "user.gettoptracks",
        format: "json",
        user: USERNAME,
        api_key: API_KEY,
        limit: 5,
        period,
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
                getImage(`${track.artist.name}  ${track.name}`, MediaType.Song)
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
    <TopList title="Top Tracks" :records="tracks" @update-records="getTopTracks" />
</template>
