import { Workshop } from "@/modules/domain/Workshop/Entity";
import { LoadingOverlay, Stack, Text } from "@mantine/core";
import { useAtom } from "jotai";
import { appConfigAtom } from "../atom";
import { api } from "@/trpc/react";
import { CardMultiSelect } from "./CardMultiSelect";

function WorkshopCard({ workshop }: { workshop: Workshop }) {
  return (
    <Stack p={4} gap="sm" className="flex-1">
      <Text fw={500} size="md">
        {workshop.name}
      </Text>
      <Text c="dimmed">{workshop.description}</Text>
    </Stack>
  );
}

export function WorkshopMultiSelect({
  value,
  onChange,
  placeholder = "依存する講習会を追加",
  showSelectedCards = true,
}: {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  showSelectedCards?: boolean;
}) {
  const [_appConfig, _setAppConfig] = useAtom(appConfigAtom);
  const isAppConfigPending = _appConfig.state === "loading";
  const appConfig =
    _appConfig.state === "hasData" ? _appConfig.data : undefined;
  const { data: workshops, isPending: isWorkshopsPending } =
    api.tq.workshop.getAll.useQuery(
      { schoolYearId: appConfig?.schoolYear.id.toString() ?? "" },
      {
        enabled: !isAppConfigPending && appConfig != null,
      },
    );

  function getFilteredWorkshops(query: string) {
    return workshops?.filter((x) => x.name.includes(query)) ?? [];
  }

  const renderCard = (workshop: Workshop) => (
    <WorkshopCard workshop={workshop} />
  );

  return (
    <Stack pos="relative">
      <LoadingOverlay
        visible={isWorkshopsPending}
        loaderProps={{ type: "dots" }}
      />
      <CardMultiSelect
        options={workshops ?? []}
        getId={(x) => x.id.toString()}
        value={value}
        filterOnSearch={getFilteredWorkshops}
        onChange={onChange}
        renderCard={renderCard}
        placeholder={placeholder}
        showSelectedCards={showSelectedCards}
      />
    </Stack>
  );
}
