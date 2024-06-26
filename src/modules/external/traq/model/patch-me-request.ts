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
 * 自分のユーザー情報変更リクエスト
 * @export
 * @interface PatchMeRequest
 */
export interface PatchMeRequest {
  /**
   * 新しい表示名
   * @type {string}
   * @memberof PatchMeRequest
   */
  displayName?: string;
  /**
   * TwitterID
   * @type {string}
   * @memberof PatchMeRequest
   */
  twitterId?: string;
  /**
   * 自己紹介(biography)
   * @type {string}
   * @memberof PatchMeRequest
   */
  bio?: string;
  /**
   * ホームチャンネルのUUID `00000000-0000-0000-0000-000000000000`を指定すると、ホームチャンネルが`null`に設定されます
   * @type {string}
   * @memberof PatchMeRequest
   */
  homeChannel?: string;
}
