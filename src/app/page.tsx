"use client";

import { api } from "@/trpc/react";
import { Button, Grid, Loader } from "@mantine/core";
import { useAtom } from "jotai";
import { appConfigAtom } from "./atom";
import WorkshopCard from "./components/WorkshopCard";

export default function Home() {
  const [_appConfig] = useAtom(appConfigAtom);
  const appConfig =
    _appConfig.state === "hasData" ? _appConfig.data : undefined;
  const isAppConfigPending = _appConfig.state === "loading";

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
  );
}
