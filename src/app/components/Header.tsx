"use client";

import {
  ActionIcon,
  Avatar,
  Button,
  Group,
  LoadingOverlay,
  Menu,
  Select,
  Text,
  UnstyledButton,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import { TbLogin, TbLogout } from "react-icons/tb";
import { User } from "@/modules/domain/User/Entity";
import { useAtom } from "jotai";
import { AppConfig, appConfigAtom, userAtom } from "../atom";
import { api } from "@/trpc/react";
import { SchoolYear } from "@/modules/domain/SchoolYear/Entity";
import Link from "next/link";

export function Header() {
  const [_appConfig, _setAppConfig] = useAtom(appConfigAtom);
  const isAppConfigPending = _appConfig.state === "loading";
  const appConfig =
    _appConfig.state === "hasData" ? _appConfig.data : undefined;
  function setAppConfig(data: Exclude<typeof appConfig, undefined>) {
    _setAppConfig(data);
  }

  const { isPending: isSchoolYearsPending, data: schoolYears } =
    api.tq.schoolYear.get.useQuery(undefined, {
      staleTime: Infinity,
      retry: false,
    });

  const [_user] = useAtom(userAtom);
  const isUserPending = _user.state === "loading";
  const user = _user.state === "hasData" ? _user.data : undefined;

  const isPending = isAppConfigPending || isSchoolYearsPending || isUserPending;

  return (
    <Group py={16} h="100%">
      <Text component={Link} href="/" size="lg" fw={700}>
        RoadmaP
      </Text>
      <Group ml="auto" pos="relative">
        <LoadingOverlay visible={isPending} loaderProps={{ type: "dots" }} />
        <SchoolYearSelection
          appConfig={appConfig}
          setAppConfig={setAppConfig}
          schoolYears={schoolYears}
        />
        <UserSection user={user} />
      </Group>
    </Group>
  );
}

function SchoolYearSelection({
  appConfig,
  setAppConfig,
  schoolYears,
}: {
  appConfig?: AppConfig;
  setAppConfig: (data: AppConfig) => any;
  schoolYears?: SchoolYear[];
}) {
  return (
    <Select
      w="96px"
      allowDeselect={false}
      data={schoolYears?.map((sy) => ({
        value: sy.value.toString(),
        label: sy.name,
      }))}
      value={appConfig?.schoolYear.value.toString()}
      onChange={(value) => {
        const schoolYear = schoolYears?.find(
          (sy) => sy.value === Number(value),
        );
        if (schoolYear == null) {
          console.error("School Year not found");
        } else {
          setAppConfig({ ...appConfig, schoolYear });
        }
      }}
    />
  );
}

function UserSection({ user }: { user?: User }) {
  if (user == null) {
    return <LoginBtn />;
  } else {
    return <AvatarWithMenu user={user} />;
  }
}

function AvatarWithMenu({ user }: { user: User }) {
  return (
    <Menu position="bottom-end" withArrow arrowPosition="side">
      <Menu.Target>
        <UnstyledButton>
          <Group>
            <Avatar
              src={`https://q.trap.jp/api/v3/public/icon/${user.name}`}
              alt={`${user.name}'s icon`}
            />
            <Text visibleFrom="sm" size="sm">
              {user.displayName}
            </Text>
          </Group>
        </UnstyledButton>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          color="red"
          leftSection={<TbLogout />}
          onClick={() =>
            fetch("/api/v1/oauth/signout", { method: "DELETE" }).then(
              () => (window.location.href = "/"),
            )
          }
        >
          ログアウト
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

function LoginBtn() {
  const router = useRouter();
  return (
    <>
      <ActionIcon
        hiddenFrom="sm"
        color="green"
        onClick={() => router.replace("/api/v1/oauth/signin")}
      >
        <TbLogin />
      </ActionIcon>
      <Button
        visibleFrom="sm"
        color="green"
        leftSection={<TbLogin />}
        onClick={() => router.replace("/api/v1/oauth/signin")}
      >
        ログイン
      </Button>
    </>
  );
}
