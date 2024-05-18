import { appConfigAtom, userAtom } from "@/client/atom";
import { nodeTypes } from "@/client/components/CustomNodes";
import { useGraph } from "@/client/utils/graph";
import { Workshop } from "@/modules/domain/Workshop/Entity";
import { api } from "@/trpc/react";
import { Button, Group, LoadingOverlay, Modal, Stack } from "@mantine/core";
import { useEffect, useMemo, useState } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";
import ReactFlow, { Background, Controls } from "reactflow";
import { useAtom } from "jotai";
import { BlurredOverlay } from "@/client/components/BlurredOverlay";
import { useRouter } from "next/navigation";
import { useDisclosure } from "@mantine/hooks";
import { WorkshopMultiSelect } from "@/client/components/WorkshopMultiSelect";

export default function Playground() {
  const [workshopIds, setWorkshopIds] = useState<string[]>([]);
  const [_appConfig, _setAppConfig] = useAtom(appConfigAtom);
  const isAppConfigPending = _appConfig.state === "loading";
  const appConfig =
    _appConfig.state === "hasData" ? _appConfig.data : undefined;
  const { data: availableWorkshops, isPending: isAvailableWorkshopsPending } =
    api.tq.workshop.getAll.useQuery(
      { schoolYearId: appConfig?.schoolYear.id.toString() ?? "" },
      {
        enabled: !isAppConfigPending && appConfig != null,
        initialData: [],
      },
    );
  const workshops = useMemo(
    () =>
      availableWorkshops.filter((x) => workshopIds.includes(x.id.toString())),
    [availableWorkshops, workshopIds],
  );
  const allSelected = workshopIds.length === availableWorkshops.length;

  function toggleAllSelected() {
    if (allSelected) {
      setWorkshopIds([]);
    } else {
      setWorkshopIds(availableWorkshops.map((x) => x.id.toString()));
    }
  }

  const { isPending: isGraphPending, nodes, edges } = useGraph(workshops);

  return (
    <>
      <title>{`遊び場 :) | RoadmaP`}</title>
      <Stack h="calc(100vh - var(--header-height))" gap={2}>
        <Button variant="white" onClick={toggleAllSelected} fullWidth>
          {allSelected ? "選択をリセットする" : "全ての講習会を選択する"}
        </Button>
        <WorkshopMultiSelect
          value={workshopIds}
          onChange={setWorkshopIds}
          placeholder="表示する講習会を選択する"
          showSelectedCards={false}
        />
        <Stack pos="relative" className="grow">
          <LoadingOverlay
            visible={isGraphPending}
            loaderProps={{ type: "dots" }}
          />
          <ReactFlow nodes={nodes} nodeTypes={nodeTypes} edges={edges} fitView>
            <Background />
            <Controls />
          </ReactFlow>
        </Stack>
      </Stack>
    </>
  );
}
