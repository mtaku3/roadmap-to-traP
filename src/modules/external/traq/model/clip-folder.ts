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
 * クリップフォルダ情報
 * @export
 * @interface ClipFolder
 */
export interface ClipFolder {
  /**
   * フォルダUUID
   * @type {string}
   * @memberof ClipFolder
   */
  id: string;
  /**
   * フォルダ名
   * @type {string}
   * @memberof ClipFolder
   */
  name: string;
  /**
   * 作成日時
   * @type {string}
   * @memberof ClipFolder
   */
  createdAt: string;
  /**
   * フォルダ所有者UUID
   * @type {string}
   * @memberof ClipFolder
   */
  ownerId: string;
  /**
   * 説明
   * @type {string}
   * @memberof ClipFolder
   */
  description: string;
}
