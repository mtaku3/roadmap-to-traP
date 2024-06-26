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
 * BOT作成リクエスト
 * @export
 * @interface PostBotRequest
 */
export interface PostBotRequest {
  /**
   * BOTユーザーID 自動的に接頭辞\"BOT_\"が付与されます
   * @type {string}
   * @memberof PostBotRequest
   */
  name: string;
  /**
   * BOTユーザー表示名
   * @type {string}
   * @memberof PostBotRequest
   */
  displayName: string;
  /**
   * BOTの説明
   * @type {string}
   * @memberof PostBotRequest
   */
  description: string;
  /**
   *
   * @type {BotMode}
   * @memberof PostBotRequest
   */
  mode: BotMode;
  /**
   * BOTサーバーエンドポイント BOT動作モードがHTTPの場合必須です
   * @type {string}
   * @memberof PostBotRequest
   */
  endpoint?: string;
}
