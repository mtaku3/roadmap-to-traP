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
 * チャンネル可視状態変更イベント
 * @export
 * @interface VisibilityChangedEvent
 */
export interface VisibilityChangedEvent {
  /**
   * 変更者UUID
   * @type {string}
   * @memberof VisibilityChangedEvent
   */
  userId: string;
  /**
   * 変更後可視状態
   * @type {boolean}
   * @memberof VisibilityChangedEvent
   */
  visibility: boolean;
}
