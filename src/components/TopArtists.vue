<script setup lang="ts">
import { ref } from "vue";
import { Fetch } from "../scripts/Fetch";
import { USERNAME } from "../scripts/globals";
import { Artist } from "../scripts/Records";
import TopList from "./TopList.vue";
import { Period, PeriodAPI } from "../scripts/Period.enum";

const artists = ref<Artist[]>([]);

const getTopArtists = async (period = Period.Month) => {
    await Fetch.get("http://localhost:3000/api/lastfm", {
        username: USERNAME,
        type: "artists",
        period: PeriodAPI[period],
    }).then((response) => {
        console.log("Top Artists:", response);

        artists.value = response.map(
            (artist: any, index: number) =>
                new Artist(index + 1, artist.title, artist.img, artist.url, artist.playcount)
        );
    });
};

getTopArtists();
</script>

<template>
    <TopList title="Top Artists" :records="artists" @update-records="getTopArtists" />
</template>
