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

// May contain unused imports in some cases
// @ts-ignore
import { Message } from "./message";

/**
 * ピン情報(メッセージ本体付き)
 * @export
 * @interface Pin
 */
export interface Pin {
  /**
   * ピン留めしたユーザーUUID
   * @type {string}
   * @memberof Pin
   */
  userId: string;
  /**
   * ピン留めされた日時
   * @type {string}
   * @memberof Pin
   */
  pinnedAt: string;
  /**
   *
   * @type {Message}
   * @memberof Pin
   */
  message: Message;
}
