import { Fetch } from "./Fetch";

export const calculateBackgroundColor = async (image: string) => {
    let vibrant = [255, 255, 255];
    let darkVibrant = [255, 255, 255];

    await Fetch.get("http://localhost:3000/api/vibrant", { image })
        .then((response: { Vibrant: { rgb: number[] }; DarkVibrant: { rgb: number[] } }) => {
            vibrant = response.Vibrant.rgb;
            darkVibrant = response.DarkVibrant.rgb;
        })
        .catch((error) => {
            console.error(error);
        });

    return {
        vibrant,
        darkVibrant,
    };
};

const calculateLuminance = (color: number[]) => {
    color = color.map((c) => (c /= 255));

    return 0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2];
};

export const calculateTextColor = (color: number[]) => {
    return calculateLuminance(color) > 0.5 ? "black" : "white";
};
