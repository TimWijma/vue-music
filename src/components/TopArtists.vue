<script setup lang="ts">
import { ref } from "vue";
import { Fetch } from "../scripts/Fetch";
import { API_KEY, USERNAME } from "../scripts/globals";
import { getImageSpotify, MediaTypeSpotify } from "../scripts/images";
import TopRecord from "./TopRecord.vue";
import { Artist } from "../scripts/Records";

const artists = ref<Artist[]>([]);

const getTopArtists = async () => {
    await Fetch.get("http://ws.audioscrobbler.com/2.0", {
        method: "user.gettopartists",
        format: "json",
        user: USERNAME,
        api_key: API_KEY,
        limit: 5,
        period: "1month",
    })
        .then(async (response) => {
            let topartists = response.topartists.artist;

            artists.value = topartists.map(
                (artist: any, index: number) =>
                    new Artist(
                        index + 1,
                        artist.name,
                        "",
                        artist.url,
                        artist.playcount
                    )
            );

            topartists.forEach((artist: any, index: number) => {
                getImageSpotify(artist.name, MediaTypeSpotify.Artist)
                    .then((image) => {
                        artists.value[index] = new Artist(
                            index + 1,
                            artist.name,
                            image,
                            artist.url,
                            artist.playcount
                        );
                    })
                    .catch((error) => console.log(error));
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

getTopArtists();
</script>

<template>
    <div class="top-records">
        <h2>Top Artists</h2>
        <div class="records-container">
            <div v-for="artist in artists" :key="artist.rank">
                <TopRecord :record="artist" />
            </div>
        </div>
    </div>
</template>
