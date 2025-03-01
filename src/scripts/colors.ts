import { Vibrant } from "node-vibrant/browser";

export const calculateBackgroundColor = async (image: string) => {
    const palette = await Vibrant.from(image).getPalette();

    let vibrant = palette.Vibrant?.rgb;

    return vibrant ? [vibrant[0], vibrant[1], vibrant[2]] : [255, 255, 255];
};

const calculateLuminance = (color: number[]) => {
    color = color.map((c) => (c /= 255));

    return 0.2126 * color[0] + 0.7152 * color[1] + 0.0722 * color[2];
};

export const calculateTextColor = (color: number[]) => {
    return calculateLuminance(color) > 0.5 ? "black" : "white";
};
