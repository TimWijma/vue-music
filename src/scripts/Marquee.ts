export class Marquee {
    element: HTMLElement | null;
    container: HTMLElement | null;
    isAnimating: boolean;
    gap: string;
    originalContent: Node | undefined;

    set text(value: string) {
        this._text = value;
        if (this.element) {
            const textNode = document.createElement("span");
            textNode.textContent = value;
            this.originalContent = textNode;
            if (!this.isAnimating) {
                this.stopScroll();
            }
        }
    }

    get text(): string {
        return this._text;
    }

    private _text: string;

    constructor(
        element: HTMLElement | null,
        container: HTMLElement | null,
        originalText: string,
        gapText: string = " - "
    ) {
        this.element = element;
        this.container = container;
        this.isAnimating = false;
        this._text = originalText;
        this.gap = gapText;
        this.originalContent = element?.cloneNode(true);
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

        let elementWidth = this.getWidth()!; // Can not be null because it will return before reaching this line

        if (elementWidth > this.container.offsetWidth) {
            this.isAnimating = true;

            const wrapper = document.createElement("div");
            wrapper.style.display = "inline-block";

            const content1 = this.originalContent!.cloneNode(true);
            const gap = document.createTextNode(this.gap);
            const content2 = this.originalContent!.cloneNode(true);

            wrapper.appendChild(content1);
            wrapper.appendChild(gap);
            wrapper.appendChild(content2);

            while (this.element.firstChild) {
                this.element.removeChild(this.element.firstChild);
            }
            this.element.appendChild(wrapper);

            const gapWidth = this.getWidth()! - elementWidth;

            this.element.style.setProperty("--scroll-width", `-${gapWidth}px`);

            const duration = elementWidth / 125;
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

        while (this.element.firstChild) {
            this.element.removeChild(this.element.firstChild);
        }
        this.element.appendChild(this.originalContent!.cloneNode(true));

        // this.element.innerHTML = this.text;
        this.element.style.animation = "none";
        this.isAnimating = false;
    };
}
