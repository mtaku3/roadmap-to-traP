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
 * ログインリクエスト
 * @export
 * @interface PostLoginRequest
 */
export interface PostLoginRequest {
  /**
   * ユーザー名
   * @type {string}
   * @memberof PostLoginRequest
   */
  name: string;
  /**
   * パスワード
   * @type {string}
   * @memberof PostLoginRequest
   */
  password: string;
}