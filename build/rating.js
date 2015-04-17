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
/// <reference path="EventWidget.ts"/>
/// <reference path="Config"/>
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
            //...
        };
        Rating.prototype.render = function () {
            // render template
            this.update();
        };
        Rating.prototype.init = function () {
            console.log('widget init');
        };
        return Rating;
    })(SW.EventWidget);
    SW.Rating = Rating;
})(SW || (SW = {}));
