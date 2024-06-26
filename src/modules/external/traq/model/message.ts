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
import { MessageStamp } from "./message-stamp";

/**
 * メッセージ
 * @export
 * @interface Message
 */
export interface Message {
  /**
   * メッセージUUID
   * @type {string}
   * @memberof Message
   */
  id: string;
  /**
   * 投稿者UUID
   * @type {string}
   * @memberof Message
   */
  userId: string;
  /**
   * チャンネルUUID
   * @type {string}
   * @memberof Message
   */
  channelId: string;
  /**
   * メッセージ本文
   * @type {string}
   * @memberof Message
   */
  content: string;
  /**
   * 投稿日時
   * @type {string}
   * @memberof Message
   */
  createdAt: string;
  /**
   * 編集日時
   * @type {string}
   * @memberof Message
   */
  updatedAt: string;
  /**
   * ピン留めされているかどうか
   * @type {boolean}
   * @memberof Message
   */
  pinned: boolean;
  /**
   * 押されているスタンプの配列
   * @type {Array<MessageStamp>}
   * @memberof Message
   */
  stamps: Array<MessageStamp>;
  /**
   * スレッドUUID
   * @type {string}
   * @memberof Message
   */
  threadId: string | null;
}
