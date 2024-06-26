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
 * サムネイル画像のタイプ
 * @export
 * @enum {string}
 */

export const ThumbnailType = {
  /**
   * アップロード画像に対して生成される通常のサムネイル
   */
  Image: "image",
  /**
   * アップロード音声ファイルに対して生成される波形画像
   */
  Waveform: "waveform",
} as const;

export type ThumbnailType = (typeof ThumbnailType)[keyof typeof ThumbnailType];
