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
 * サムネイル情報 サムネイルが存在しない場合はnullになります Deprecated: thumbnailsを参照してください
 * @export
 * @interface FileInfoThumbnail
 */
export interface FileInfoThumbnail {
  /**
   * MIMEタイプ
   * @type {string}
   * @memberof FileInfoThumbnail
   * @deprecated
   */
  mime: string;
  /**
   * サムネイル幅
   * @type {number}
   * @memberof FileInfoThumbnail
   * @deprecated
   */
  width?: number;
  /**
   * サムネイル高さ
   * @type {number}
   * @memberof FileInfoThumbnail
   * @deprecated
   */
  height?: number;
}
