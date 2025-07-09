<script setup lang="ts">
import { ref } from "vue";
import { Fetch } from "../scripts/Fetch";
import { API_KEY, USERNAME } from "../scripts/globals";
import { getImage, MediaType } from "../scripts/images";
import { Artist } from "../scripts/Records";
import TopList from "./TopList.vue";
import { Period } from "../scripts/Period.enum";

const artists = ref<Artist[]>([]);

const getTopArtists = async (period = Period.Month) => {
    await Fetch.get("http://ws.audioscrobbler.com/2.0", {
        method: "user.gettopartists",
        format: "json",
        user: USERNAME,
        api_key: API_KEY,
        limit: 5,
        period,
    })
        .then(async (response) => {
            let topartists = response.topartists.artist;

            artists.value = topartists.map(
                (artist: any, index: number) =>
                    new Artist(index + 1, artist.name, "", artist.url, artist.playcount)
            );

            // topartists.forEach((artist: any, index: number) => {
            //     getImage(artist.name, MediaType.Artist)
            //         .then((image) => {
            //             artists.value[index] = new Artist(
            //                 index + 1,
            //                 artist.name,
            //                 image,
            //                 artist.url,
            //                 artist.playcount
            //             );
            //         })
            //         .catch((error) => console.log(error));
            // });
        })
        .catch((error) => {
            console.log(error);
        });
};

getTopArtists();
</script>

<template>
    <TopList title="Top Artists" :records="artists" @update-records="getTopArtists" />
</template>
