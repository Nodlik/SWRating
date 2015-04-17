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

        private markPlace: HTMLElement;
        private voteNumberPlace: HTMLElement;

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
            this.clearAllStar();

            if (this.mark > 0) {
                var m = this.mark | 0;
                for (var i = 0; i < m; i++) {
                    this.stars[i].setValue(100);
                }

                if (m < this.stars.length) {
                    this.stars[m].setValue((this.mark - m) * 100);
                }

                this.markPlace.innerText = parseFloat(this.mark.toFixed(2)).toString();
                this.voteNumberPlace.style.display = 'block';
                this.voteNumberPlace.innerText = this.voteCount.toString();
            }
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

        setMark(mark: number) {
            this.mark = mark;
        }

        getMark() {
            return this.mark;
        }

        setVoteCount(voteNumber: number) {
            this.voteCount = voteNumber;
        }

        getVoteCount() {
            return this.voteCount;
        }

        lock() {
            this.setConfig({isLocked: true});
        }

        unlock() {
            this.setConfig({isLocked: false});
        }

        getIsLocked() {
            return this.config.get().isLocked;
        }

        getStars(): Star[] {
            return this.stars;
        }

        clear() {
            for (var i = 0; i < this.stars.length; i++) {
                this.stars[i].destroy();
            }

            this.stars = [];
            this.el.innerHTML = '';

            this.markPlace = null;
            this.voteNumberPlace = null;
        }

        private clearAllStar() {
            this.stars.forEach((s) => {
                s.setValue(0);
            });
        }

        private initDOM() {
            this.stars = [];

            var stars = this.el.querySelectorAll('.' + this.classes.star);

            for (var i = 0; i < stars.length; i++) {
                this.stars.push(
                    new Star(<HTMLElement>stars[i])
                );
            }

            this.markPlace = <HTMLElement>this.el.querySelectorAll('.' + this.classes.mark)[0];
            this.voteNumberPlace = <HTMLElement>this.el.querySelectorAll('.' + this.classes.voteCount)[0];

            this.initEvents();
        }

        private initEvents() {
            var self = this;
            var starClick = function() {
                self.trigger('vote', parseInt((<HTMLElement>this).dataset['value']) + 1);
            };

            var leaveTimeout = 0;
            var mouseEnter = (e: MouseEvent) => {
                clearTimeout(leaveTimeout);

                var idx = parseInt((<HTMLElement>e.target).dataset['value']);
                for (var i = 0; i < this.stars.length; i++) {
                    if (i <= idx) {
                        this.stars[i].select();
                    }
                    else {
                        this.stars[i].unSelect();
                    }
                }
            };

            var mouseLeave = () => {
                clearTimeout(leaveTimeout);

                leaveTimeout = setTimeout(() => {
                    for (var i = 0; i < this.stars.length; i++) {
                        this.stars[i].reset();
                    }
                }, 200);
            };


            this.stars.forEach((s) => {
                s.setEvents(starClick, mouseEnter, mouseLeave);
            });
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