import { api, isTRPCClientError } from "@/trpc/react";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

const userAsyncAtom = atom(async () => {
  let user;
  try {
    user = await api.v.user.me.query();
  } catch (e) {
    if (!(isTRPCClientError(e) && e.data?.code === "UNAUTHORIZED")) {
      throw e;
    }
  }
  return user;
});
export const userAtom = loadable(userAsyncAtom);

export type AppConfig = Awaited<ReturnType<typeof api.v.appConfig.get.query>>;
const appConfigAsyncAtom = atom(async () => {
  const appConfig = await api.v.appConfig.get.query();
  return appConfig;
});
const appConfigLoadableAtom = loadable(appConfigAsyncAtom);
const appConfigPrimitiveAtom = atom<
  { state: "hasData"; data: AppConfig } | undefined
>(undefined);
export const appConfigAtom = atom(
  (get) => get(appConfigPrimitiveAtom) ?? get(appConfigLoadableAtom),
  (get, set, data: AppConfig) => {
    set(appConfigPrimitiveAtom, { state: "hasData", data });
  },
);

export type UserConfig = {
  showOutdatedEvents: boolean;
  showEventDescription: boolean;
};
const userConfigPritimiveAtom = atom({
  showOutdatedEvents: false,
  showEventDescription: false,
});
export const userConfigAtom = atom(
  (get) => get(userConfigPritimiveAtom),
  (get, set, data: UserConfig) => {
    set(userConfigPritimiveAtom, data);
  },
);
