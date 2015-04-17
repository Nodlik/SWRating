var SW;
(function (SW) {
    var EventWidget = (function () {
        function EventWidget() {
            this.events = {};
        }
        EventWidget.prototype.on = function (eventName, callback) {
            if (!(eventName in this.events)) {
                this.events[eventName] = [callback];
            }
            else {
                this.events[eventName].push(callback);
            }
            return this;
        };
        EventWidget.prototype.off = function (event) {
            delete this.events[event];
        };
        EventWidget.prototype.trigger = function (eventName, data) {
            var _this = this;
            if (data === void 0) { data = null; }
            if (eventName in this.events) {
                this.events[eventName].forEach(function (callback) {
                    callback({
                        data: data,
                        widget: _this
                    });
                });
            }
        };
        return EventWidget;
    })();
    SW.EventWidget = EventWidget;
})(SW || (SW = {}));
var SW;
(function (SW) {
    var Config = (function () {
        function Config(config) {
            if (config === void 0) { config = {}; }
            this.config = {
                pointNumber: 5,
                starSize: 20,
                stretch: false,
                isLocked: false,
                starType: 'svg'
            };
            this.set(config);
        }
        Config.prototype.get = function () {
            return this.config;
        };
        Config.prototype.set = function (newConfig) {
            if (newConfig === void 0) { newConfig = {}; }
            for (var k in newConfig) {
                if (newConfig.hasOwnProperty(k)) {
                    if (k in this.config) {
                        this.config[k] = newConfig[k];
                    }
                }
            }
        };
        return Config;
    })();
    SW.Config = Config;
})(SW || (SW = {}));
var SW;
(function (SW) {
    var Star = (function () {
        function Star(el) {
            this.el = el;
            this.value = 0;
            this.clip = this.el.querySelectorAll('.w-star__clip-rect')[0];
        }
        Star.prototype.setEvents = function (onClick, onEnter, onLeave) {
            if (!this.el.classList.contains('w-star_locked')) {
                this.starClick = onClick;
                this.mouseEnter = onEnter;
                this.mouseLeave = onLeave;
                this.el.addEventListener('click', onClick);
                this.el.addEventListener('mouseenter', onEnter);
                this.el.addEventListener('mouseleave', onLeave);
            }
        };
        Star.prototype.select = function () {
            this.moveClip(100);
        };
        Star.prototype.unSelect = function () {
            this.moveClip(0);
        };
        Star.prototype.reset = function () {
            this.moveClip(this.value);
        };
        /**
         * @param value 0 - 100
         */
        Star.prototype.setValue = function (value) {
            this.value = value;
            this.moveClip(value);
        };
        Star.prototype.destroy = function () {
            this.el.removeEventListener('click', this.starClick);
            this.el.removeEventListener('mouseenter', this.mouseEnter);
            this.el.removeEventListener('mouseleave', this.mouseLeave);
        };
        Star.prototype.moveClip = function (value) {
            this.clip.style['-webkit-transform'] = 'scaleX(' + value + ')';
            this.clip.style['transform'] = 'scaleX(' + value + ')';
        };
        return Star;
    })();
    SW.Star = Star;
})(SW || (SW = {}));
/// <reference path="EventWidget.ts"/>
/// <reference path="Config"/>
/// <reference path="Star.ts"/>
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var SW;
(function (SW) {
    var Rating = (function (_super) {
        __extends(Rating, _super);
        function Rating(el, mark, voteCount) {
            if (mark === void 0) { mark = 0; }
            if (voteCount === void 0) { voteCount = 0; }
            _super.call(this);
            this.el = el;
            this.mark = mark;
            this.voteCount = voteCount;
            this.needRender = false;
            this.config = new SW.Config();
            this.stars = [];
            this.classes = {
                ratingBlock: 'w-rating',
                ratingBlockStretch: 'w-rating_fit',
                star: 'w-rating__star',
                mark: 'w-rating__mark',
                voteCount: 'w-rating__vote-count'
            };
            this.init();
        }
        Rating.prototype.setConfig = function (config) {
            this.config.set(config);
            this.needRender = true;
        };
        Rating.prototype.update = function () {
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
        };
        Rating.prototype.render = function () {
            this.el.classList.remove(this.classes.ratingBlockStretch);
            if (this.config.get().stretch) {
                this.el.classList.add(this.classes.ratingBlockStretch);
            }
            this.clear();
            this.el.innerHTML = JST['rating.' + this.config.get().starType + '.html.hbs'](this.config.get());
            this.initDOM();
            this.needRender = false;
            this.update();
        };
        Rating.prototype.setMark = function (mark) {
            this.mark = mark;
        };
        Rating.prototype.getMark = function () {
            return this.mark;
        };
        Rating.prototype.setVoteCount = function (voteNumber) {
            this.voteCount = voteNumber;
        };
        Rating.prototype.getVoteCount = function () {
            return this.voteCount;
        };
        Rating.prototype.lock = function () {
            this.setConfig({ isLocked: true });
        };
        Rating.prototype.unlock = function () {
            this.setConfig({ isLocked: false });
        };
        Rating.prototype.getIsLocked = function () {
            return this.config.get().isLocked;
        };
        Rating.prototype.getStars = function () {
            return this.stars;
        };
        Rating.prototype.clear = function () {
            for (var i = 0; i < this.stars.length; i++) {
                this.stars[i].destroy();
            }
            this.stars = [];
            this.el.innerHTML = '';
            this.markPlace = null;
            this.voteNumberPlace = null;
        };
        Rating.prototype.clearAllStar = function () {
            this.stars.forEach(function (s) {
                s.setValue(0);
            });
        };
        Rating.prototype.initDOM = function () {
            this.stars = [];
            var stars = this.el.querySelectorAll('.' + this.classes.star);
            for (var i = 0; i < stars.length; i++) {
                this.stars.push(new SW.Star(stars[i]));
            }
            this.markPlace = this.el.querySelectorAll('.' + this.classes.mark)[0];
            this.voteNumberPlace = this.el.querySelectorAll('.' + this.classes.voteCount)[0];
            this.initEvents();
        };
        Rating.prototype.initEvents = function () {
            var _this = this;
            var self = this;
            var starClick = function () {
                self.trigger('vote', parseInt(this.dataset['value']));
            };
            var leaveTimeout = 0;
            var mouseEnter = function (e) {
                clearTimeout(leaveTimeout);
                var idx = parseInt(e.target.dataset['value']);
                for (var i = 0; i < _this.stars.length; i++) {
                    if (i <= idx) {
                        _this.stars[i].select();
                    }
                    else {
                        _this.stars[i].unSelect();
                    }
                }
            };
            var mouseLeave = function () {
                clearTimeout(leaveTimeout);
                leaveTimeout = setTimeout(function () {
                    for (var i = 0; i < _this.stars.length; i++) {
                        _this.stars[i].reset();
                    }
                }, 200);
            };
            this.stars.forEach(function (s) {
                s.setEvents(starClick, mouseEnter, mouseLeave);
            });
        };
        Rating.prototype.init = function () {
            this.el.classList.add(this.classes.ratingBlock);
            Handlebars.registerHelper('times', function (n, block) {
                var accum = '';
                for (var i = 0; i < n; ++i)
                    accum += block.fn(i);
                return accum;
            });
        };
        return Rating;
    })(SW.EventWidget);
    SW.Rating = Rating;
})(SW || (SW = {}));
