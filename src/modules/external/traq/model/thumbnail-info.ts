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
import { ThumbnailType } from "./thumbnail-type";

/**
 *
 * @export
 * @interface ThumbnailInfo
 */
export interface ThumbnailInfo {
  /**
   *
   * @type {ThumbnailType}
   * @memberof ThumbnailInfo
   */
  type: ThumbnailType;
  /**
   * MIMEタイプ
   * @type {string}
   * @memberof ThumbnailInfo
   */
  mime: string;
  /**
   * サムネイル幅
   * @type {number}
   * @memberof ThumbnailInfo
   */
  width?: number;
  /**
   * サムネイル高さ
   * @type {number}
   * @memberof ThumbnailInfo
   */
  height?: number;
}
