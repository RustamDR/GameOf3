/**
 * Game rules
 */
export interface IGameRules {
    divideBy: number; // The number that has to divide result without residue
    min: number;      // Min bound of random initial number
    max: number;      // Max bound of random initial number
    countOfPlayers: number; // Players needed to start the game
}

/**
 * Config structure of events
 */
export interface IAppEventsConfig {
    eventsListen: {
        [eventName: string]: {
            resolve: Function,
            response?: {
                publish: string,
            },
        }
    }
}

//------------------------------ Game handlers interfaces
/**
 * Custom type Id
 */
export type IdType = number | string;

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