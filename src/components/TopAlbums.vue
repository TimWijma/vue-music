<script setup lang="ts">
import { ref } from "vue";
import { Fetch } from "../scripts/Fetch";
import { USERNAME } from "../scripts/globals";
import { Album } from "../scripts/Records";
import TopList from "./TopList.vue";
import { Period, PeriodAPI } from "../scripts/Period.enum";

const albums = ref<Album[]>([]);

const getTopAlbums = async (period = Period.Month) => {
    await Fetch.get("http://localhost:3000/api/lastfm", {
        username: USERNAME,
        type: "albums",
        period: PeriodAPI[period],
    }).then((response) => {
        console.log("Top Albums:", response);

        albums.value = response.map(
            (album: any, index: number) =>
                new Album(
                    index + 1,
                    album.title,
                    album.artist,
                    album.img,
                    album.url,
                    album.playcount
                )
        );
    });
};

getTopAlbums();
</script>

<template>
    <TopList title="Top Albums" :records="albums" @update-records="getTopAlbums" />
</template>
