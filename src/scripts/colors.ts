import { Vibrant } from "node-vibrant/browser";

export const calculateBackgroundColor = async (image: string) => {
    const palette = await Vibrant.from(image).getPalette();

    let vibrant = palette.Vibrant?.rgb || [255, 255, 255];
    let darkVibrant = palette.DarkVibrant?.rgb || vibrant;

    return {
        vibrant: [vibrant[0], vibrant[1], vibrant[2]],
        darkVibrant: [darkVibrant[0], darkVibrant[1], darkVibrant[2]],
    };
};

const calculateLuminance = (color: number[]) => {
    color = color.map((c) => (c /= 255));

    return 0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2];
};

export const calculateTextColor = (color: number[]) => {
    return calculateLuminance(color) > 0.5 ? "black" : "white";
};
