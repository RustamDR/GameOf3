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

/**
 * Start game income data
 */
export interface IStartGame {
}

export interface IStartGameReply {
    action: string;
    data: any;
}

/**
 * Movement income data
 */
export interface IMove {
    mutationNumber: number;
}

export interface IMoveReply extends IStartGameReply {
}