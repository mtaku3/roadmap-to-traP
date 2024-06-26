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
import { PostWebRTCAuthenticateRequest } from "../model";
// @ts-ignore
import { WebRTCAuthenticateResult } from "../model";
// @ts-ignore
import { WebRTCUserState } from "../model";
/**
 * WebrtcApi - axios parameter creator
 * @export
 */
export const WebrtcApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     * 現在のWebRTC状態を取得します。
     * @summary WebRTC状態を取得
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getWebRTCState: async (
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/webrtc/state`;
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

      // authentication OAuth2 required
      // oauth required
      await setOAuthToObject(
        localVarHeaderParameter,
        "OAuth2",
        [],
        configuration,
      );

      // authentication bearerAuth required
      // http bearer authentication required
      await setBearerAuthToObject(localVarHeaderParameter, configuration);

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
     * Skyway WebRTC用の認証API
     * @summary Skyway用認証API
     * @param {PostWebRTCAuthenticateRequest} [postWebRTCAuthenticateRequest]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    postWebRTCAuthenticate: async (
      postWebRTCAuthenticateRequest?: PostWebRTCAuthenticateRequest,
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/webrtc/authenticate`;
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

      // authentication OAuth2 required
      // oauth required
      await setOAuthToObject(
        localVarHeaderParameter,
        "OAuth2",
        [],
        configuration,
      );

      // authentication bearerAuth required
      // http bearer authentication required
      await setBearerAuthToObject(localVarHeaderParameter, configuration);

      localVarHeaderParameter["Content-Type"] = "application/json";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        postWebRTCAuthenticateRequest,
        localVarRequestOptions,
        configuration,
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
  };
};

/**
 * WebrtcApi - functional programming interface
 * @export
 */
export const WebrtcApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = WebrtcApiAxiosParamCreator(configuration);
  return {
    /**
     * 現在のWebRTC状態を取得します。
     * @summary WebRTC状態を取得
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getWebRTCState(
      options?: RawAxiosRequestConfig,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => AxiosPromise<Array<WebRTCUserState>>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.getWebRTCState(options);
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["WebrtcApi.getWebRTCState"]?.[
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
     * Skyway WebRTC用の認証API
     * @summary Skyway用認証API
     * @param {PostWebRTCAuthenticateRequest} [postWebRTCAuthenticateRequest]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async postWebRTCAuthenticate(
      postWebRTCAuthenticateRequest?: PostWebRTCAuthenticateRequest,
      options?: RawAxiosRequestConfig,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => AxiosPromise<WebRTCAuthenticateResult>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.postWebRTCAuthenticate(
          postWebRTCAuthenticateRequest,
          options,
        );
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["WebrtcApi.postWebRTCAuthenticate"]?.[
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
 * WebrtcApi - factory interface
 * @export
 */
export const WebrtcApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  const localVarFp = WebrtcApiFp(configuration);
  return {
    /**
     * 現在のWebRTC状態を取得します。
     * @summary WebRTC状態を取得
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getWebRTCState(options?: any): AxiosPromise<Array<WebRTCUserState>> {
      return localVarFp
        .getWebRTCState(options)
        .then((request) => request(axios, basePath));
    },
    /**
     * Skyway WebRTC用の認証API
     * @summary Skyway用認証API
     * @param {PostWebRTCAuthenticateRequest} [postWebRTCAuthenticateRequest]
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    postWebRTCAuthenticate(
      postWebRTCAuthenticateRequest?: PostWebRTCAuthenticateRequest,
      options?: any,
    ): AxiosPromise<WebRTCAuthenticateResult> {
      return localVarFp
        .postWebRTCAuthenticate(postWebRTCAuthenticateRequest, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * WebrtcApi - object-oriented interface
 * @export
 * @class WebrtcApi
 * @extends {BaseAPI}
 */
export class WebrtcApi extends BaseAPI {
  /**
   * 現在のWebRTC状態を取得します。
   * @summary WebRTC状態を取得
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WebrtcApi
   */
  public getWebRTCState(options?: RawAxiosRequestConfig) {
    return WebrtcApiFp(this.configuration)
      .getWebRTCState(options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * Skyway WebRTC用の認証API
   * @summary Skyway用認証API
   * @param {PostWebRTCAuthenticateRequest} [postWebRTCAuthenticateRequest]
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof WebrtcApi
   */
  public postWebRTCAuthenticate(
    postWebRTCAuthenticateRequest?: PostWebRTCAuthenticateRequest,
    options?: RawAxiosRequestConfig,
  ) {
    return WebrtcApiFp(this.configuration)
      .postWebRTCAuthenticate(postWebRTCAuthenticateRequest, options)
      .then((request) => request(this.axios, this.basePath));
  }
}
