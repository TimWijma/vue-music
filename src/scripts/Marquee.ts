export class Marquee {
    element: HTMLElement | null;
    container: HTMLElement | null;
    isAnimating: boolean;
    originalText: string;
    gapText: string;

    constructor(
        element: HTMLElement | null,
        container: HTMLElement | null,
        originalText: string,
        gapText: string = " - "
    ) {
        this.element = element;
        this.container = container;
        this.isAnimating = false;
        this.originalText = originalText;
        this.gapText = gapText;
    }

    getWidth = () => {
        if (!this.element) return;

        let cloneElement = this.element.cloneNode(true) as HTMLElement;
        cloneElement.style.visibility = "hidden";
        cloneElement.style.position = "absolute";
        cloneElement.style.width = "auto";
        cloneElement.style.whiteSpace = "nowrap";

        this.container?.appendChild(cloneElement);
        let width = cloneElement.offsetWidth;
        this.container?.removeChild(cloneElement);

        return width;
    };

    startScroll = () => {
        if (this.isAnimating) return;
        if (!this.element || !this.container) return;

        let titleWidth = this.getWidth()!; // Can not be null because it will return before reaching this line

        if (titleWidth > this.container.offsetWidth) {
            this.isAnimating = true;
            this.element.innerHTML = this.originalText + this.gapText;
            const gapWidth = this.getWidth()!;
            this.element.innerHTML =
                this.originalText + this.gapText + this.originalText;

            this.element.style.setProperty(
                "--scroll-width",
                `-${gapWidth}px`
            );

            const duration = titleWidth / 125;
            this.element.style.animation = `scroll ${duration}s linear`;

            this.element.addEventListener(
                "animationend",
                () => {
                    this.stopScroll();
                },
                { once: true }
            );
        } else {
            this.stopScroll();
        }
    };

    stopScroll = () => {
        if (!this.element) return;

        this.element.innerHTML = this.originalText;
        this.element.style.animation = "none";
        this.isAnimating = false;
    };
}
