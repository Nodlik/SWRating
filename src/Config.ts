module SW {
    export interface ConfigObject {
        pointNumber: number;
        starSize: number;
        stretch: boolean;
        isLocked: boolean;
        starType: string;
    }

    export class Config {
        private config: ConfigObject = {
            pointNumber: 5,
            starSize: 20,
            stretch: false,
            isLocked: false,
            starType: 'svg'
        };

        constructor(config: Object = {}) {
            this.set(config);
        }

        get(): ConfigObject {
            return this.config;
        }

        public set(newConfig: Object = {}) {
            for (var k in newConfig) {
                if (newConfig.hasOwnProperty(k)) {
                    if (k in this.config) {
                        this.config[k] = newConfig[k];
                    }
                }
            }
        }
    }
}