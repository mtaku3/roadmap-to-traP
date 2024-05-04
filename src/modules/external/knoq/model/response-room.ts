/* tslint:disable */
/* eslint-disable */
/**
 * traP knoQ
 * This is a sample knoQ server.
 *
 * The version of the OpenAPI document: 2.1.5
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

// May contain unused imports in some cases
// @ts-ignore
import { Duration } from "./duration";

/**
 *
 * @export
 * @interface ResponseRoom
 */
export interface ResponseRoom {
  /**
   *
   * @type {string}
   * @memberof ResponseRoom
   */
  roomId: string;
  /**
   *
   * @type {string}
   * @memberof ResponseRoom
   */
  place: string;
  /**
   *
   * @type {string}
   * @memberof ResponseRoom
   */
  timeStart: string;
  /**
   *
   * @type {string}
   * @memberof ResponseRoom
   */
  timeEnd: string;
  /**
   * 部屋が使えることを保証する
   * @type {boolean}
   * @memberof ResponseRoom
   */
  verified: boolean;
  /**
   * どのイベントも使用していない時間帯
   * @type {Array<Duration>}
   * @memberof ResponseRoom
   */
  freeTimes?: Array<Duration>;
  /**
   * 部屋を共用すれば、使用できる時間帯
   * @type {Array<Duration>}
   * @memberof ResponseRoom
   */
  sharedTimes?: Array<Duration>;
  /**
   * 編集権を持つユーザー
   * @type {Array<string>}
   * @memberof ResponseRoom
   */
  admins: Array<string>;
  /**
   *
   * @type {string}
   * @memberof ResponseRoom
   */
  createdBy: string;
  /**
   *
   * @type {string}
   * @memberof ResponseRoom
   */
  createdAt: string;
  /**
   *
   * @type {string}
   * @memberof ResponseRoom
   */
  updatedAt: string;
}