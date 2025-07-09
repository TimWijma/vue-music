<script setup lang="ts">
import { ref } from "vue";
import { Fetch } from "../scripts/Fetch";
import { API_KEY, USERNAME } from "../scripts/globals";
import { Album } from "../scripts/Records";
import TopList from "./TopList.vue";
import { Period } from "../scripts/Period.enum";
import { getImages, MediaType } from "../scripts/images";

const albums = ref<Album[]>([]);

const getTopAlbums = async (period = Period.Month) => {
    await Fetch.get("http://ws.audioscrobbler.com/2.0", {
        method: "user.gettopalbums",
        format: "json",
        user: USERNAME,
        api_key: API_KEY,
        limit: 5,
        period,
    })
        .then(async (response) => {
            let topartists = response.topalbums.album;

            albums.value = topartists.map(
                (album: any, index: number) =>
                    new Album(
                        index + 1,
                        album.name,
                        album.artist.name,
                        "",
                        album.url,
                        album.playcount
                    )
            );

            await getImages(MediaType.Album, period).then((images) => {
                albums.value.forEach((album) => {
                    album.image = images[album.name] || "";
                });
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

getTopAlbums();
</script>

<template>
    <TopList title="Top Albums" :records="albums" @update-records="getTopAlbums" />
</template>
