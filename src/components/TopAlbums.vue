<script setup lang="ts">
import { ref } from "vue";
import { Fetch } from "../scripts/Fetch";
import { API_KEY, USERNAME } from "../scripts/globals";
import { getImageSpotify, getImageITunes, MediaTypeITunes } from "../scripts/images";
import TopRecord from "./TopRecord.vue";
import { Album, Artist } from "../scripts/Records";

const albums = ref<Album[]>([]);

const getTopAlbums = async () => {
    await Fetch.get("http://ws.audioscrobbler.com/2.0", {
        method: "user.gettopalbums",
        format: "json",
        user: USERNAME,
        api_key: API_KEY,
        limit: 5,
        period: "1month",
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
                getImageITunes(album.artist.name, album.name, MediaTypeITunes.Album)
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
    <div class="top-records">
        <h2>Top Albums</h2>
        <div class="records-container">
            <div v-for="album in albums" :key="album.rank">
                <TopRecord :record="album" />
            </div>
        </div>
    </div>
</template>
