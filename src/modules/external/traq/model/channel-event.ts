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
import { ChannelEventDetail } from "./channel-event-detail";

/**
 * チャンネルイベント
 * @export
 * @interface ChannelEvent
 */
export interface ChannelEvent {
  /**
   * イベントタイプ
   * @type {string}
   * @memberof ChannelEvent
   */
  type: ChannelEventTypeEnum;
  /**
   * イベント日時
   * @type {string}
   * @memberof ChannelEvent
   */
  datetime: string;
  /**
   *
   * @type {ChannelEventDetail}
   * @memberof ChannelEvent
   */
  detail: ChannelEventDetail;
}

export const ChannelEventTypeEnum = {
  TopicChanged: "TopicChanged",
  SubscribersChanged: "SubscribersChanged",
  PinAdded: "PinAdded",
  PinRemoved: "PinRemoved",
  NameChanged: "NameChanged",
  ParentChanged: "ParentChanged",
  VisibilityChanged: "VisibilityChanged",
  ForcedNotificationChanged: "ForcedNotificationChanged",
  ChildCreated: "ChildCreated",
} as const;

export type ChannelEventTypeEnum =
  (typeof ChannelEventTypeEnum)[keyof typeof ChannelEventTypeEnum];
