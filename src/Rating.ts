/// <reference path="EventWidget.ts"/>
/// <reference path="Config"/>

module SW {
    export class Rating extends EventWidget {
        private needRender: boolean = false;
        private config: Config = new Config();

        constructor(private el: HTMLElement, private mark: number = 0, private voteCount: number = 0) {
            super();

            this.init();
        }

        public setConfig(config: Object) {
            this.config.set(config);
            this.needRender = true;
        }

        update() {
            if (this.needRender) {
                return this.render();
            }

            //...
        }

        render() {
            // render template

            this.update();
        }

        private init() {
            console.log('widget init');
        }
    }
}