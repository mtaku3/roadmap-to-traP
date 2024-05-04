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
 * ユーザー情報編集リクエスト
 * @export
 * @interface PatchUserRequest
 */
export interface PatchUserRequest {
  /**
   * 新しい表示名
   * @type {string}
   * @memberof PatchUserRequest
   */
  displayName?: string;
  /**
   * TwitterID
   * @type {string}
   * @memberof PatchUserRequest
   */
  twitterId?: string;
  /**
   *
   * @type {UserAccountState}
   * @memberof PatchUserRequest
   */
  state?: UserAccountState;
  /**
   * ユーザーロール
   * @type {string}
   * @memberof PatchUserRequest
   */
  role?: string;
}