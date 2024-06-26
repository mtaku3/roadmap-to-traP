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
import { AddAllRoomsRequestInner } from "../model";
// @ts-ignore
import { RequestRoom } from "../model";
// @ts-ignore
import { ResponseRoom } from "../model";
/**
 * RoomsApi - axios parameter creator
 * @export
 */
export const RoomsApiAxiosParamCreator = function (
  configuration?: Configuration,
) {
  return {
    /**
     * 特権が必要。
     * @summary traPで確保した部屋の情報追加
     * @param {Array<AddAllRoomsRequestInner>} addAllRoomsRequestInner 進捗部屋情報
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    addAllRooms: async (
      addAllRoomsRequestInner: Array<AddAllRoomsRequestInner>,
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'addAllRoomsRequestInner' is not null or undefined
      assertParamExists(
        "addAllRooms",
        "addAllRoomsRequestInner",
        addAllRoomsRequestInner,
      );
      const localVarPath = `/rooms/all`;
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

      localVarHeaderParameter["Content-Type"] = "text/csv";

      setSearchParams(localVarUrlObj, localVarQueryParameter);
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {};
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      };
      localVarRequestOptions.data = serializeDataIfNeeded(
        addAllRoomsRequestInner,
        localVarRequestOptions,
        configuration,
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * 部屋の情報追加
     * @summary 部屋の情報追加
     * @param {RequestRoom} requestRoom 部屋の追加
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    addRooms: async (
      requestRoom: RequestRoom,
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'requestRoom' is not null or undefined
      assertParamExists("addRooms", "requestRoom", requestRoom);
      const localVarPath = `/rooms`;
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
        requestRoom,
        localVarRequestOptions,
        configuration,
      );

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      };
    },
    /**
     * (関連する予約を削除する) エラーを出して削除を促す予定
     * @summary 部屋の情報を削除
     * @param {string} roomID
     * @param {string} [excludeEventID] 除外するイベントのID。
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteRoom: async (
      roomID: string,
      excludeEventID?: string,
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'roomID' is not null or undefined
      assertParamExists("deleteRoom", "roomID", roomID);
      const localVarPath = `/rooms/{roomID}`.replace(
        `{${"roomID"}}`,
        encodeURIComponent(String(roomID)),
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "DELETE",
        ...baseOptions,
        ...options,
      };
      const localVarHeaderParameter = {} as any;
      const localVarQueryParameter = {} as any;

      if (excludeEventID !== undefined) {
        localVarQueryParameter["excludeEventID"] = excludeEventID;
      }

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
     * 一件取得する
     * @summary 一件取得する
     * @param {string} roomID
     * @param {string} [excludeEventID] 除外するイベントのID。
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getRoom: async (
      roomID: string,
      excludeEventID?: string,
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'roomID' is not null or undefined
      assertParamExists("getRoom", "roomID", roomID);
      const localVarPath = `/rooms/{roomID}`.replace(
        `{${"roomID"}}`,
        encodeURIComponent(String(roomID)),
      );
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

      if (excludeEventID !== undefined) {
        localVarQueryParameter["excludeEventID"] = excludeEventID;
      }

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
     * 進捗部屋の情報を取得
     * @summary 進捗部屋の情報を取得
     * @param {string} [dateBegin] 特定の日時から。
     * @param {string} [dateEnd] 特定の日時まで。
     * @param {string} [excludeEventID] 除外するイベントのID。
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getRooms: async (
      dateBegin?: string,
      dateEnd?: string,
      excludeEventID?: string,
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      const localVarPath = `/rooms`;
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

      if (dateBegin !== undefined) {
        localVarQueryParameter["dateBegin"] = dateBegin;
      }

      if (dateEnd !== undefined) {
        localVarQueryParameter["dateEnd"] = dateEnd;
      }

      if (excludeEventID !== undefined) {
        localVarQueryParameter["excludeEventID"] = excludeEventID;
      }

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
     * 特権が必要。部屋が使用できることの確認を取り消す。
     * @summary 部屋を未確認にする
     * @param {string} roomID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    unverifyRoom: async (
      roomID: string,
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'roomID' is not null or undefined
      assertParamExists("unverifyRoom", "roomID", roomID);
      const localVarPath = `/rooms/{roomID}/verified`.replace(
        `{${"roomID"}}`,
        encodeURIComponent(String(roomID)),
      );
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL);
      let baseOptions;
      if (configuration) {
        baseOptions = configuration.baseOptions;
      }

      const localVarRequestOptions = {
        method: "DELETE",
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
     * 特権が必要。部屋が使用できることを確認する
     * @summary 部屋を確認する
     * @param {string} roomID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    verifyRoom: async (
      roomID: string,
      options: RawAxiosRequestConfig = {},
    ): Promise<RequestArgs> => {
      // verify required parameter 'roomID' is not null or undefined
      assertParamExists("verifyRoom", "roomID", roomID);
      const localVarPath = `/rooms/{roomID}/verified`.replace(
        `{${"roomID"}}`,
        encodeURIComponent(String(roomID)),
      );
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
  };
};

/**
 * RoomsApi - functional programming interface
 * @export
 */
export const RoomsApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator = RoomsApiAxiosParamCreator(configuration);
  return {
    /**
     * 特権が必要。
     * @summary traPで確保した部屋の情報追加
     * @param {Array<AddAllRoomsRequestInner>} addAllRoomsRequestInner 進捗部屋情報
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async addAllRooms(
      addAllRoomsRequestInner: Array<AddAllRoomsRequestInner>,
      options?: RawAxiosRequestConfig,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => AxiosPromise<Array<ResponseRoom>>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.addAllRooms(
        addAllRoomsRequestInner,
        options,
      );
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["RoomsApi.addAllRooms"]?.[
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
     * 部屋の情報追加
     * @summary 部屋の情報追加
     * @param {RequestRoom} requestRoom 部屋の追加
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async addRooms(
      requestRoom: RequestRoom,
      options?: RawAxiosRequestConfig,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<ResponseRoom>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.addRooms(
        requestRoom,
        options,
      );
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["RoomsApi.addRooms"]?.[localVarOperationServerIndex]
          ?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * (関連する予約を削除する) エラーを出して削除を促す予定
     * @summary 部屋の情報を削除
     * @param {string} roomID
     * @param {string} [excludeEventID] 除外するイベントのID。
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async deleteRoom(
      roomID: string,
      excludeEventID?: string,
      options?: RawAxiosRequestConfig,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.deleteRoom(
        roomID,
        excludeEventID,
        options,
      );
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["RoomsApi.deleteRoom"]?.[
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
     * 一件取得する
     * @summary 一件取得する
     * @param {string} roomID
     * @param {string} [excludeEventID] 除外するイベントのID。
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getRoom(
      roomID: string,
      excludeEventID?: string,
      options?: RawAxiosRequestConfig,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<ResponseRoom>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getRoom(
        roomID,
        excludeEventID,
        options,
      );
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["RoomsApi.getRoom"]?.[localVarOperationServerIndex]
          ?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * 進捗部屋の情報を取得
     * @summary 進捗部屋の情報を取得
     * @param {string} [dateBegin] 特定の日時から。
     * @param {string} [dateEnd] 特定の日時まで。
     * @param {string} [excludeEventID] 除外するイベントのID。
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async getRooms(
      dateBegin?: string,
      dateEnd?: string,
      excludeEventID?: string,
      options?: RawAxiosRequestConfig,
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string,
      ) => AxiosPromise<Array<ResponseRoom>>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.getRooms(
        dateBegin,
        dateEnd,
        excludeEventID,
        options,
      );
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["RoomsApi.getRooms"]?.[localVarOperationServerIndex]
          ?.url;
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration,
        )(axios, localVarOperationServerBasePath || basePath);
    },
    /**
     * 特権が必要。部屋が使用できることの確認を取り消す。
     * @summary 部屋を未確認にする
     * @param {string} roomID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async unverifyRoom(
      roomID: string,
      options?: RawAxiosRequestConfig,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.unverifyRoom(
        roomID,
        options,
      );
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["RoomsApi.unverifyRoom"]?.[
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
     * 特権が必要。部屋が使用できることを確認する
     * @summary 部屋を確認する
     * @param {string} roomID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async verifyRoom(
      roomID: string,
      options?: RawAxiosRequestConfig,
    ): Promise<
      (axios?: AxiosInstance, basePath?: string) => AxiosPromise<void>
    > {
      const localVarAxiosArgs = await localVarAxiosParamCreator.verifyRoom(
        roomID,
        options,
      );
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0;
      const localVarOperationServerBasePath =
        operationServerMap["RoomsApi.verifyRoom"]?.[
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
 * RoomsApi - factory interface
 * @export
 */
export const RoomsApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance,
) {
  const localVarFp = RoomsApiFp(configuration);
  return {
    /**
     * 特権が必要。
     * @summary traPで確保した部屋の情報追加
     * @param {Array<AddAllRoomsRequestInner>} addAllRoomsRequestInner 進捗部屋情報
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    addAllRooms(
      addAllRoomsRequestInner: Array<AddAllRoomsRequestInner>,
      options?: any,
    ): AxiosPromise<Array<ResponseRoom>> {
      return localVarFp
        .addAllRooms(addAllRoomsRequestInner, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * 部屋の情報追加
     * @summary 部屋の情報追加
     * @param {RequestRoom} requestRoom 部屋の追加
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    addRooms(
      requestRoom: RequestRoom,
      options?: any,
    ): AxiosPromise<ResponseRoom> {
      return localVarFp
        .addRooms(requestRoom, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * (関連する予約を削除する) エラーを出して削除を促す予定
     * @summary 部屋の情報を削除
     * @param {string} roomID
     * @param {string} [excludeEventID] 除外するイベントのID。
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    deleteRoom(
      roomID: string,
      excludeEventID?: string,
      options?: any,
    ): AxiosPromise<void> {
      return localVarFp
        .deleteRoom(roomID, excludeEventID, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * 一件取得する
     * @summary 一件取得する
     * @param {string} roomID
     * @param {string} [excludeEventID] 除外するイベントのID。
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getRoom(
      roomID: string,
      excludeEventID?: string,
      options?: any,
    ): AxiosPromise<ResponseRoom> {
      return localVarFp
        .getRoom(roomID, excludeEventID, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * 進捗部屋の情報を取得
     * @summary 進捗部屋の情報を取得
     * @param {string} [dateBegin] 特定の日時から。
     * @param {string} [dateEnd] 特定の日時まで。
     * @param {string} [excludeEventID] 除外するイベントのID。
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    getRooms(
      dateBegin?: string,
      dateEnd?: string,
      excludeEventID?: string,
      options?: any,
    ): AxiosPromise<Array<ResponseRoom>> {
      return localVarFp
        .getRooms(dateBegin, dateEnd, excludeEventID, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * 特権が必要。部屋が使用できることの確認を取り消す。
     * @summary 部屋を未確認にする
     * @param {string} roomID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    unverifyRoom(roomID: string, options?: any): AxiosPromise<void> {
      return localVarFp
        .unverifyRoom(roomID, options)
        .then((request) => request(axios, basePath));
    },
    /**
     * 特権が必要。部屋が使用できることを確認する
     * @summary 部屋を確認する
     * @param {string} roomID
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    verifyRoom(roomID: string, options?: any): AxiosPromise<void> {
      return localVarFp
        .verifyRoom(roomID, options)
        .then((request) => request(axios, basePath));
    },
  };
};

/**
 * RoomsApi - object-oriented interface
 * @export
 * @class RoomsApi
 * @extends {BaseAPI}
 */
export class RoomsApi extends BaseAPI {
  /**
   * 特権が必要。
   * @summary traPで確保した部屋の情報追加
   * @param {Array<AddAllRoomsRequestInner>} addAllRoomsRequestInner 進捗部屋情報
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RoomsApi
   */
  public addAllRooms(
    addAllRoomsRequestInner: Array<AddAllRoomsRequestInner>,
    options?: RawAxiosRequestConfig,
  ) {
    return RoomsApiFp(this.configuration)
      .addAllRooms(addAllRoomsRequestInner, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * 部屋の情報追加
   * @summary 部屋の情報追加
   * @param {RequestRoom} requestRoom 部屋の追加
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RoomsApi
   */
  public addRooms(requestRoom: RequestRoom, options?: RawAxiosRequestConfig) {
    return RoomsApiFp(this.configuration)
      .addRooms(requestRoom, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * (関連する予約を削除する) エラーを出して削除を促す予定
   * @summary 部屋の情報を削除
   * @param {string} roomID
   * @param {string} [excludeEventID] 除外するイベントのID。
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RoomsApi
   */
  public deleteRoom(
    roomID: string,
    excludeEventID?: string,
    options?: RawAxiosRequestConfig,
  ) {
    return RoomsApiFp(this.configuration)
      .deleteRoom(roomID, excludeEventID, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * 一件取得する
   * @summary 一件取得する
   * @param {string} roomID
   * @param {string} [excludeEventID] 除外するイベントのID。
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RoomsApi
   */
  public getRoom(
    roomID: string,
    excludeEventID?: string,
    options?: RawAxiosRequestConfig,
  ) {
    return RoomsApiFp(this.configuration)
      .getRoom(roomID, excludeEventID, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * 進捗部屋の情報を取得
   * @summary 進捗部屋の情報を取得
   * @param {string} [dateBegin] 特定の日時から。
   * @param {string} [dateEnd] 特定の日時まで。
   * @param {string} [excludeEventID] 除外するイベントのID。
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RoomsApi
   */
  public getRooms(
    dateBegin?: string,
    dateEnd?: string,
    excludeEventID?: string,
    options?: RawAxiosRequestConfig,
  ) {
    return RoomsApiFp(this.configuration)
      .getRooms(dateBegin, dateEnd, excludeEventID, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * 特権が必要。部屋が使用できることの確認を取り消す。
   * @summary 部屋を未確認にする
   * @param {string} roomID
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RoomsApi
   */
  public unverifyRoom(roomID: string, options?: RawAxiosRequestConfig) {
    return RoomsApiFp(this.configuration)
      .unverifyRoom(roomID, options)
      .then((request) => request(this.axios, this.basePath));
  }

  /**
   * 特権が必要。部屋が使用できることを確認する
   * @summary 部屋を確認する
   * @param {string} roomID
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof RoomsApi
   */
  public verifyRoom(roomID: string, options?: RawAxiosRequestConfig) {
    return RoomsApiFp(this.configuration)
      .verifyRoom(roomID, options)
      .then((request) => request(this.axios, this.basePath));
  }
}
