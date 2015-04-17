/// <reference path="EventWidget.ts"/>
/// <reference path="Config"/>
/// <reference path="Star.ts"/>

module SW {
    interface RatingCSSClasses {
        ratingBlock: string;
        ratingBlockStretch: string;
        star: string;
        mark: string;
        voteCount: string;
    }

    export class Rating extends EventWidget {
        private needRender: boolean = false;
        private config: Config = new Config();
        private stars: Star[] = [];

        private classes: RatingCSSClasses = {
            ratingBlock: 'w-rating',
            ratingBlockStretch: 'w-rating_fit',
            star: 'w-rating__star',
            mark: 'w-rating__mark',
            voteCount: 'w-rating__vote-count'
        };

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
            this.el.classList.remove(this.classes.ratingBlockStretch);
            if (this.config.get().stretch) {
                this.el.classList.add(this.classes.ratingBlockStretch);
            }

            this.clear();

            this.el.innerHTML = JST['rating.' + this.config.get().starType + '.html.hbs'](this.config.get());

            this.initDOM();
            this.needRender = false;

            this.update();
        }

        clear() {
            for (var i = 0; i < this.stars.length; i++) {
                this.stars[i].destroy();
            }

            this.stars = [];
            this.el.innerHTML = '';
        }

        private initDOM() {
            this.stars = [];

            var stars = this.el.querySelectorAll('.' + this.classes.star);

            for (var i = 0; i < stars.length; i++) {
                this.stars.push(
                    new Star(<HTMLElement>stars[i])
                );
            }
        }

        private init() {
            this.el.classList.add(this.classes.ratingBlock);

            Handlebars.registerHelper('times', function(n, block) {
                var accum = '';

                for(var i = 0; i < n; ++i)
                    accum += block.fn(i);

                return accum;
            });
        }
    }
}