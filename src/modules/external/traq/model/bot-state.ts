/* tslint:disable */
/* eslint-disable */
/**
 * traQ v3
 * traQ v3 API
 *
 * The version of the OpenAPI document: 3.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

/**
 * BOT状態 0: 停止 1: 有効 2: 一時停止
 * @export
 * @enum {string}
 */

export const BotState = {
  /**
   * 停止
   */
  deactivated: 0,
  /**
   * 有効
   */
  active: 1,
  /**
   * 一時停止
   */
  suspended: 2,
} as const;

export type BotState = (typeof BotState)[keyof typeof BotState];
