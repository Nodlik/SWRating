module SW {
    interface EventWidgetEvent {
        data: any
        widget: EventWidget
    }

    export class EventWidget {
        private events: {[name: string]: Array<(e: EventWidgetEvent) => any>} = {};

        constructor() {
            
        }

        on(eventName: string, callback: (e: EventWidgetEvent) => any) {
            if (!(eventName in this.events)) {
                this.events[eventName] = [callback];
            }
            else {
                this.events[eventName].push(callback);
            }

            return this;
        }

        off(event: string) {
            delete this.events[event]
        }

        trigger(eventName: string, data: any = null) {
            if (eventName in this.events) {
                this.events[eventName].forEach((callback) => {
                    callback({
                        data: data,
                        widget: this
                    })
                });
            }
        }
    }
}
