import Axios, { AxiosInstance, isAxiosError } from "axios";
import { MeApiFactory } from "./external/traq/api/me-api";
import { Oauth2ApiFactory } from "./external/traq/api/oauth2-api";
import { AuthenticationApiFactory as TraqAuthenticationApiFactory } from "./external/traq/api/authentication-api";
import { AuthenticationApiFactory as KnoqAuthenticationApiFactory } from "./external/knoq/api/authentication-api";
import { UsersApiFactory } from "./external/knoq/api/users-api";
import { env } from "@/env";

export interface KnoqAuthorizerOptions {
  maxRetries: number;
}

const defaultOptions = {
  maxRetries: 1,
};

export function knoqAuthorizer(
  axios: AxiosInstance,
  _options?: KnoqAuthorizerOptions,
): AxiosInstance {
  const options = _options ?? defaultOptions;
  const session: {
    traq?: string;
    knoq?: string;
  } = {};
  const ourAxios = Axios.create();
  const traqAuthApi = TraqAuthenticationApiFactory(
    undefined,
    undefined,
    ourAxios,
  );
  const traqOauthApi = Oauth2ApiFactory(undefined, undefined, ourAxios);
  const traqMeApi = MeApiFactory(undefined, undefined, ourAxios);
  const knoqAuthApi = KnoqAuthenticationApiFactory(
    undefined,
    undefined,
    ourAxios,
  );
  const knoqUsersApi = UsersApiFactory(undefined, undefined, ourAxios);

  function getSessionCookie() {
    return [session.traq, session.knoq].filter((x) => x != null).join(";");
  }

  axios.interceptors.request.use((config) => {
    config.headers.set("cookie", getSessionCookie());
    config.knoqAuthorizer = config.knoqAuthorizer ?? {
      retries: 0,
    };
    return config;
  });

  axios.interceptors.response.use(undefined, async (error) => {
    try {
      if (
        isAxiosError(error) &&
        error.config != null &&
        error.config.knoqAuthorizer != null
      ) {
        if (error.config.knoqAuthorizer.retries >= options.maxRetries) {
          throw new Error("Reached to max retries");
        }

        if (error.response?.status === 401) {
          try {
            await knoqUsersApi.getMe();
          } catch (e) {
            if (!isAxiosError(e) || e.response?.status !== 401) {
              throw new Error("Unexpected error while sending request to knoq");
            }

            try {
              await traqMeApi.getMe();
            } catch (e) {
              if (!isAxiosError(e) || e.response?.status !== 401) {
                throw new Error(
                  "Unexpected error while sending request to traq",
                );
              }

              const res = await traqAuthApi.login(undefined, {
                name: env.TRAQ_AUTH_USERNAME,
                password: env.TRAQ_AUTH_PASSWORD,
              });
              const traqSessionCookie = res.headers["set-cookie"]
                ?.find((x) => x.startsWith("r_session="))
                ?.split(";")[0];
              if (traqSessionCookie == null) {
                throw new Error("Failed to login to traq");
              }
              session.traq = traqSessionCookie;
              ourAxios.defaults.headers["cookie"] = getSessionCookie();
            }

            let res;
            res = await knoqAuthApi.getAuthParams();
            const knoqSessionCookie = res.headers["set-cookie"]
              ?.find((x) => x.startsWith("session="))
              ?.split(";")[0];
            session.knoq = knoqSessionCookie;
            ourAxios.defaults.headers["cookie"] = getSessionCookie();
            if (knoqSessionCookie == null) {
              throw new Error(
                "Could not find knoq session cookie from authparams response",
              );
            }
            const authorizeUrl = res.data.url;
            res = await ourAxios.get(authorizeUrl, {
              maxRedirects: 0,
              validateStatus: (status) => status < 500,
            });
            const consentUrl = res.headers["location"] as string | undefined;
            if (consentUrl == null) {
              throw new Error(
                "Could not find redirection location from authorize request to traq",
              );
            }
            res = await traqOauthApi.postOAuth2AuthorizeDecide("approve", {
              headers: {
                Referer: authorizeUrl,
              },
              maxRedirects: 0,
              validateStatus: (status: number) => status < 500,
            });
            const callbackUrl = res.headers["location"] as string | undefined;
            if (callbackUrl == null) {
              throw new Error(
                "Could not find redirection location from decide request to traq",
              );
            }
            res = await ourAxios.get(callbackUrl, {
              headers: {
                Referer: authorizeUrl,
              },
              maxRedirects: 0,
              validateStatus: (status: number) => status < 500,
            });
            const knoqSessionCookieWithUser = res.headers["set-cookie"]
              ?.find((x) => x.startsWith("session="))
              ?.split(";")[0];
            if (knoqSessionCookieWithUser == null) {
              throw new Error(
                "Could not find knoq session cookie from callback response",
              );
            }
            session.knoq = knoqSessionCookieWithUser;
            ourAxios.defaults.headers["cookie"] = getSessionCookie();
          }

          error.config.knoqAuthorizer.retries += 1;
          return axios.request(error.config);
        }
      }

      return Promise.reject(error);
    } catch (e) {
      console.error(e);
      return Promise.reject(error);
    }
  });

  return axios;
}

declare module "axios" {
  export interface AxiosRequestConfig {
    knoqAuthorizer?: {
      retries: number;
    };
  }
}
