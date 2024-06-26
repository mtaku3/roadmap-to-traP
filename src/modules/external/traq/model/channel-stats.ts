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
import { ChannelStatsStamp } from "./channel-stats-stamp";
// May contain unused imports in some cases
// @ts-ignore
import { ChannelStatsUser } from "./channel-stats-user";

/**
 * チャンネル統計情報
 * @export
 * @interface ChannelStats
 */
export interface ChannelStats {
  /**
   * チャンネルの総投稿メッセージ数(削除されたものも含む)
   * @type {number}
   * @memberof ChannelStats
   */
  totalMessageCount: number;
  /**
   * チャンネル上のスタンプ統計情報
   * @type {Array<ChannelStatsStamp>}
   * @memberof ChannelStats
   */
  stamps: Array<ChannelStatsStamp>;
  /**
   * チャンネル上のユーザー統計情報
   * @type {Array<ChannelStatsUser>}
   * @memberof ChannelStats
   */
  users: Array<ChannelStatsUser>;
  /**
   * 統計情報日時
   * @type {string}
   * @memberof ChannelStats
   */
  datetime: string;
}
