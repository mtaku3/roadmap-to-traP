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
 * チャンネル閲覧者情報
 * @export
 * @interface ChannelViewer
 */
export interface ChannelViewer {
  /**
   * ユーザーUUID
   * @type {string}
   * @memberof ChannelViewer
   */
  userId: string;
  /**
   *
   * @type {ChannelViewState}
   * @memberof ChannelViewer
   */
  state: ChannelViewState;
  /**
   * 更新日時
   * @type {string}
   * @memberof ChannelViewer
   */
  updatedAt: string;
}
