<script setup lang="ts">
import { ref } from "vue";
import { Fetch } from "../scripts/Fetch";
import { API_KEY, USERNAME } from "../scripts/globals";
import { MediaType, getImage } from "../scripts/images";
import { Album } from "../scripts/Records";
import TopList from "./TopList.vue";
import { Period } from "../scripts/Period.enum";

const albums = ref<Album[]>([]);

const getTopAlbums = async (period: Period = Period.Month) => {
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

            topartists.forEach((album: any, index: number) => {
                getImage(`${album.artist.name} ${album.name}`, MediaType.Album)
                    .then((image) => {
                        albums.value[index] = new Album(
                            index + 1,
                            album.name,
                            album.artist.name,
                            image,
                            album.url,
                            album.playcount
                        );
                    })
                    .catch((error) => console.log(error));
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
