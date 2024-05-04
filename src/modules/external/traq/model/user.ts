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
import { UserAccountState } from "./user-account-state";

/**
 * ユーザー情報
 * @export
 * @interface User
 */
export interface User {
  /**
   * ユーザーUUID
   * @type {string}
   * @memberof User
   */
  id: string;
  /**
   * ユーザー名
   * @type {string}
   * @memberof User
   */
  name: string;
  /**
   * ユーザー表示名
   * @type {string}
   * @memberof User
   */
  displayName: string;
  /**
   * アイコンファイルUUID
   * @type {string}
   * @memberof User
   */
  iconFileId: string;
  /**
   * BOTかどうか
   * @type {boolean}
   * @memberof User
   */
  bot: boolean;
  /**
   *
   * @type {UserAccountState}
   * @memberof User
   */
  state: UserAccountState;
  /**
   * 更新日時
   * @type {string}
   * @memberof User
   */
  updatedAt: string;
}