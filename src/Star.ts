module SW {
    export class Star {
        private value: number = 0;
        private clip: HTMLElement;

        private starClick: () => void;
        private mouseEnter: () => void;
        private mouseLeave: () => void;

        constructor(private el: HTMLElement) {
            this.clip = (<HTMLElement>this.el.querySelectorAll('.w-star__clip-rect')[0]);
        }

        public setEvents(onClick, onEnter, onLeave) {
            if (!this.el.classList.contains('w-star_locked')) {
                this.starClick = onClick;
                this.mouseEnter = onEnter;
                this.mouseLeave = onLeave;

                this.el.addEventListener('click', onClick);
                this.el.addEventListener('mouseenter', onEnter);
                this.el.addEventListener('mouseleave', onLeave);
            }
        }

        public select() {
            this.moveClip(100);
        }

        public unSelect() {
            this.moveClip(0);
        }

        public reset() {
            this.moveClip(this.value);
        }

        /**
         * @param value 0 - 100
         */
        public setValue(value: number) {
            this.value = value;
            this.moveClip(value);
        }

        public destroy() {
            this.el.removeEventListener('click', this.starClick);
            this.el.removeEventListener('mouseenter', this.mouseEnter);
            this.el.removeEventListener('mouseleave', this.mouseLeave);
        }

        private moveClip(value: number) {
            this.clip.style['-webkit-transform'] = 'scaleX(' + value + ')';
            this.clip.style['transform'] = 'scaleX(' + value + ')';
        }
    }
}