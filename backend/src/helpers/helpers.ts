import {IIncomeMsg} from "../contracts/Interfaces";

/**
 * Nats income message interface
 * @param {string} msg
 * @returns {IIncomeMsg<T>}
 */
export function parseIncomeData<T>(msg: string): IIncomeMsg<T> {
    return <IIncomeMsg<T>>JSON.parse(msg);
}