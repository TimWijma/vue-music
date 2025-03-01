export class Marquee {
    element: HTMLElement;
    container: HTMLElement;
    isAnimating: boolean;
    originalText: string;
    gapText: string;

    constructor(
        element: string,
        container: string,
        originalText: string,
        gapText: string = " - "
    ) {
        this.element = document.querySelector(element) as HTMLElement;
        this.container = document.querySelector(container) as HTMLElement;
        this.isAnimating = false;
        this.originalText = originalText;
        this.gapText = gapText;
    }

    getWidth = () => {
        let cloneElement = this.element.cloneNode(true) as HTMLElement;
        cloneElement.style.visibility = "hidden";
        cloneElement.style.position = "absolute";
        cloneElement.style.width = "auto";
        cloneElement.style.whiteSpace = "nowrap";

        document.body.appendChild(cloneElement);
        let width = cloneElement.offsetWidth;
        document.body.removeChild(cloneElement);

        return width;
    };

    startScroll = () => {
        if (this.isAnimating) return;

        let titleWidth = this.getWidth();

        if (titleWidth > this.container.offsetWidth) {
            this.isAnimating = true;
            this.element.innerHTML = this.originalText + this.gapText;
            const gapWidth = this.getWidth();
            this.element.innerHTML =
                this.originalText + this.gapText + this.originalText;

            this.element.style.setProperty(
                "--scroll-width",
                `-${gapWidth + 8}px`
            );

            const duration = titleWidth / 150;
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
        this.element.innerHTML = this.originalText;
        this.element.style.animation = "none";
        this.isAnimating = false;
    };
}
