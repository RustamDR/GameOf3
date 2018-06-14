/**
 * Config structure of events
 */
export interface IAppEventsConfig {
    countOfPlayers: number;
    eventsListen: {
        [eventName: string]: {
            resolve: Function,
            response?: {
                publish: string,
            },
        }
    }
}


//------------------------------ Game interfaces
/**
 * Nats message income interface
 */
export interface IIncomeMsg<T> {
    readonly player: string;
    readonly data: T;
}

export interface IStartGame {
}

export interface IMove {
    mutateNumber: number;
}