<script setup lang="ts">
import { ref } from "vue";
import { Fetch } from "../scripts/Fetch";
import { API_KEY, USERNAME } from "../scripts/globals";
import { Track } from "../scripts/Track";
import { getArtistImage } from "../scripts/images";
import TopTrack from "./TopTrack.vue";

const artists = ref<Track[]>([]);

const getCurrentSong = async () => {
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
            console.log(topartists);

            artists.value = topartists.map(
                (artist: any, index: number) =>
                    new Track(
                        index + 1,
                        artist.name,
                        "",
                        "", // Empty image initially
                        artist.url,
                        artist.playcount
                    )
            );

            topartists.forEach((artist: any, index: number) => {
                getArtistImage(artist.name)
                    .then((image) => {
                        artists.value[index] = new Track(
                            index + 1,
                            artist.name,
                            "",
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

getCurrentSong();
</script>

<template>
    <div class="top-tracks">
        <h2>Top Artists</h2>
        <div class="tracks">
            <div v-for="track in artists" :key="track.rank" class="track">
                <TopTrack :track="track" />
            </div>
        </div>
    </div>
</template>

<style scoped>
h2 {
    font-weight: bolder;
    font-size: 2rem;
    margin: 16px 0;
}

.top-tracks {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 24px;
    background-color: var(--vibrant-dark-bg);
    color: var(--vibrant-dark-text);
    border-radius: 30px;
}
</style>
