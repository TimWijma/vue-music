const calculateLuminance = (color: number[]) => {
    color = color.map((c) => (c /= 255));

    return 0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2];
};

export const calculateTextColor = (color: number[]) => {
    return calculateLuminance(color) > 0.5 ? "black" : "white";
};
