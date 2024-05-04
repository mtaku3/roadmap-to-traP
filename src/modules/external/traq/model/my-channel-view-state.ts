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
import { ChannelViewState } from "./channel-view-state";

/**
 * 自身のチャンネル閲覧状態
 * @export
 * @interface MyChannelViewState
 */
export interface MyChannelViewState {
  /**
   * WSセッションの識別子
   * @type {string}
   * @memberof MyChannelViewState
   */
  key: string;
  /**
   * チャンネルUUID
   * @type {string}
   * @memberof MyChannelViewState
   */
  channelId: string;
  /**
   *
   * @type {ChannelViewState}
   * @memberof MyChannelViewState
   */
  state: ChannelViewState;
}