import { api } from "@/trpc/react";
import {
  Alert,
  Button,
  Divider,
  Grid,
  Group,
  Loader,
  LoadingOverlay,
  Stack,
  Title,
} from "@mantine/core";
import { useAtom } from "jotai";
import { appConfigAtom, userAtom } from "@/client/atom";
import WorkshopCard from "@/client/components/WorkshopCard";
import Link from "next/link";
import { BlurredOverlay } from "@/client/components/BlurredOverlay";

export default function Home() {
  const [_appConfig] = useAtom(appConfigAtom);
  const appConfig =
    _appConfig.state === "hasData" ? _appConfig.data : undefined;
  const isAppConfigPending = _appConfig.state === "loading";

  const [_user] = useAtom(userAtom);
  const isUserPending = _user.state === "loading";
  const user = _user.state === "hasData" ? _user.data : undefined;

  const { data, fetchNextPage, hasNextPage, isFetching } =
    api.tq.workshop.getLatest.useInfiniteQuery(
      {
        schoolYearId: appConfig?.schoolYear.id.toString() || "",
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        enabled: !isAppConfigPending && appConfig != null,
      },
    );

  return (
    <>
      <title>RoadmaP</title>
      <Stack gap="xs">
        <Group>
          <Alert w="100%">
            遊び場では任意の講習会を選択してグラフを構築することができます。後々、グラフを保存して共有する機能も実装予定です。
          </Alert>
          <Button component={Link} href="/playground" variant="light" fullWidth>
            グラフで遊ぶ
          </Button>
        </Group>
        <Group>
          <Title order={1} size="h3">
            講習会
          </Title>
          <Group ml="auto" pos="relative">
            <LoadingOverlay
              visible={isUserPending}
              loaderProps={{ type: "dots" }}
            />
            {!isUserPending && user == null && <BlurredOverlay />}
            <Button component={Link} href="/workshops/new">
              新規作成
            </Button>
          </Group>
        </Group>
        <Divider />
        <Grid align="stretch">
          {data?.pages
            .map(({ workshops }) =>
              workshops.map((workshop) => (
                <Grid.Col
                  key={workshop.id.toString()}
                  span={{ base: 12, xs: 6, sm: 4 }}
                >
                  <WorkshopCard workshop={workshop} />
                </Grid.Col>
              )),
            )
            .flat()}
          <Grid.Col span={12} hidden={!isAppConfigPending && !isFetching}>
            <Loader type="dots" h={24} w="100%" />
          </Grid.Col>
          <Grid.Col span={12}>
            <Button
              variant="outline"
              color="gray"
              fullWidth
              disabled={!hasNextPage}
              onClick={() => fetchNextPage()}
            >
              もっと見る
            </Button>
          </Grid.Col>
        </Grid>
      </Stack>
    </>
  );
}
