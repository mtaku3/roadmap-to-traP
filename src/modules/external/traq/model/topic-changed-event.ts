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
 * トピック変更イベント
 * @export
 * @interface TopicChangedEvent
 */
export interface TopicChangedEvent {
  /**
   * 変更者UUID
   * @type {string}
   * @memberof TopicChangedEvent
   */
  userId: string;
  /**
   * 変更前トピック
   * @type {string}
   * @memberof TopicChangedEvent
   */
  before: string;
  /**
   * 変更後トピック
   * @type {string}
   * @memberof TopicChangedEvent
   */
  after: string;
}
