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
import { BotMode } from "./bot-mode";

/**
 * BOT情報変更リクエスト
 * @export
 * @interface PatchBotRequest
 */
export interface PatchBotRequest {
  /**
   * BOTユーザー表示名
   * @type {string}
   * @memberof PatchBotRequest
   */
  displayName?: string;
  /**
   * BOTの説明
   * @type {string}
   * @memberof PatchBotRequest
   */
  description?: string;
  /**
   * 特権
   * @type {boolean}
   * @memberof PatchBotRequest
   */
  privileged?: boolean;
  /**
   *
   * @type {BotMode}
   * @memberof PatchBotRequest
   */
  mode?: BotMode;
  /**
   * BOTサーバーエンドポイント
   * @type {string}
   * @memberof PatchBotRequest
   */
  endpoint?: string;
  /**
   * 移譲先の開発者UUID
   * @type {string}
   * @memberof PatchBotRequest
   */
  developerId?: string;
  /**
   * 購読するイベント
   * @type {Array<string>}
   * @memberof PatchBotRequest
   */
  subscribeEvents?: Array<string>;
}