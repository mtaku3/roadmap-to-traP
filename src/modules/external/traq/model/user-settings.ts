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
 * ユーザー設定の情報
 * @export
 * @interface UserSettings
 */
export interface UserSettings {
  /**
   * ユーザーUUID
   * @type {string}
   * @memberof UserSettings
   */
  id: string;
  /**
   * メッセージ引用通知の設定情報
   * @type {boolean}
   * @memberof UserSettings
   */
  notifyCitation: boolean;
}
