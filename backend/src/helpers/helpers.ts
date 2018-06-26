import {IIncomeMsg} from "../contracts/Interfaces";

/**
 * Nats income message interface
 * @param {string} msg
 * @returns {IIncomeMsg<T>}
 */
export function parseIncomeData<T>(msg: string): IIncomeMsg<T> {
    return <IIncomeMsg<T>>JSON.parse(msg);
}

/**
 * Generate unique id
 * @returns {string}
 */
export function uuid() {
    return Math.random().toString(36).substr(2, 16);
}

/**
 * Dummy logger
 * @param {string} error
 */
export function log(error: string) {
    console.log(error);
}