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
 * Timelineアクテビティ用メッセージ
 * @export
 * @interface ActivityTimelineMessage
 */
export interface ActivityTimelineMessage {
  /**
   * メッセージUUID
   * @type {string}
   * @memberof ActivityTimelineMessage
   */
  id: string;
  /**
   * 投稿者UUID
   * @type {string}
   * @memberof ActivityTimelineMessage
   */
  userId: string;
  /**
   * チャンネルUUID
   * @type {string}
   * @memberof ActivityTimelineMessage
   */
  channelId: string;
  /**
   * メッセージ本文
   * @type {string}
   * @memberof ActivityTimelineMessage
   */
  content: string;
  /**
   * 投稿日時
   * @type {string}
   * @memberof ActivityTimelineMessage
   */
  createdAt: string;
  /**
   * 編集日時
   * @type {string}
   * @memberof ActivityTimelineMessage
   */
  updatedAt: string;
}
