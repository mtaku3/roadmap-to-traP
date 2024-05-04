/* tslint:disable */
/* eslint-disable */
/**
 * traP knoQ
 * This is a sample knoQ server.
 *
 * The version of the OpenAPI document: 2.1.5
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import type { Configuration } from "../configuration";
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from "axios";
import globalAxios from "axios";
// Some imports not used depending on template conditions
// @ts-ignore
import {
  DUMMY_BASE_URL,
  assertParamExists,
  setApiKeyToObject,
  setBasicAuthToObject,
  setBearerAuthToObject,
  setOAuthToObject,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction,
} from "../common";
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  RequestArgs,
  BaseAPI,
  RequiredError,
  operationServerMap,
} from "../base";
// @ts-ignore
import { AuthParams } from "../model";
// @ts-ignore
import { GetVersion200Response } from "../model";
/**
 * PublicApi - axios parameter creator
 * @export
 */
export const PublicApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     * リクエストに必要な情報を返す
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getAuthParams: async (
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/authParams`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "POST",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * version情報を取得
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getVersion: async (
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/version`;
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "GET",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * PublicApi - functional programming interface
 * @export
 */
export const PublicApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = PublicApiAxiosParamCreator(configuration);
  return {
    /**
     * リクエストに必要な情報を返す
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getAuthParams(
      options?: RawAxiosRequestConfig,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<AuthParams>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.getAuthParams(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["PublicApi.getAuthParams"]?.[
          localVarOperationServerIndex
        ]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * version情報を取得
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getVersion(
      options?: RawAxiosRequestConfig,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => AxiosPromise<GetVersion200Response>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.getVersion(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["PublicApi.getVersion"]?.[
          localVarOperationServerIndex
        ]?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
  };
};

/**
 * PublicApi - factory interface
 * @export
 */
export const PublicApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  const localVarFp = PublicApiFp(configuration);
  return {
    /**
     * リクエストに必要な情報を返す
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getAuthParams(options?: any): AxiosPromise<AuthParams> {
      return localVarFp
        .getAuthParams(options)
        .then((request) => request(axios, basePath));
    },
    /**
     * version情報を取得
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getVersion(options?: any): AxiosPromise<GetVersion200Response> {
      return localVarFp
        .getVersion(options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * PublicApi - object-oriented interface
 * @export
 * @class PublicApi
 * @extends {BaseAPI}
 */
export class PublicApi extends BaseAPI {
  /**
   * リクエストに必要な情報を返す
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PublicApi
   */
  public getAuthParams(options?: RawAxiosRequestConfig) {
    return PublicApiFp(this.configuration)
      .getAuthParams(options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * version情報を取得
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PublicApi
   */
  public getVersion(options?: RawAxiosRequestConfig) {
    return PublicApiFp(this.configuration)
      .getVersion(options)
      .then((request) => request(this.axios, this.basePath));
  }
}