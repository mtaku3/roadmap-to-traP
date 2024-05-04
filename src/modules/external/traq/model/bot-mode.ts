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
 * BOT動作モード  HTTP: HTTP Mode WebSocket: WebSocket Mode
 * @export
 * @enum {string}
 */

export const BotMode = {
  /**
   * HTTP Mode
   */
  HTTP: "HTTP",
  /**
   * WebSocket Mode
   */
  WebSocket: "WebSocket",
} as const;

export type BotMode = (typeof BotMode)[keyof typeof BotMode];