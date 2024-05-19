import { userAtom } from "@/client/atom";
import { nodeTypes } from "@/client/components/CustomNodes";
import { useGraph } from "@/client/utils/graph";
import { Workshop } from "@/modules/domain/Workshop/Entity";
import { api } from "@/trpc/react";
import { Button, Group, LoadingOverlay, Modal, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { TbEdit, TbTrash } from "react-icons/tb";
import ReactFlow, { Background, Controls } from "reactflow";
import { useAtom } from "jotai";
import { BlurredOverlay } from "@/client/components/BlurredOverlay";
import { useDisclosure } from "@mantine/hooks";
import { useRouter } from "next/router";

export default function WorkshopDetails() {
  const router = useRouter();
  const workshopId = router.query.workshopId as string;
  const [opened, { open, close }] = useDisclosure(false);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const { data: workshop, isPending: isWorkshopPending } =
    api.tq.workshop.findById.useQuery({
      id: workshopId,
    });
  const { isPending: isGraphPending, nodes, edges } = useGraph(workshops);
  const isPending = isWorkshopPending || isGraphPending;

  const [_user] = useAtom(userAtom);
  const isUserPending = _user.state === "loading";
  const user = _user.state === "hasData" ? _user.data : undefined;

  useEffect(() => {
    if (!isWorkshopPending) {
      if (workshop == null) {
        throw new Error("Workshop not found");
      } else {
        setWorkshops([workshop]);
      }
    }
  }, [isWorkshopPending, workshop]);

  return (
    <>
      <title>{`${workshop?.name} 詳細 | RoadmaP`}</title>
      <Stack h="calc(100vh - var(--header-height))" gap={2}>
        <Group justify="end" pos="relative">
          <LoadingOverlay
            visible={isUserPending}
            loaderProps={{ type: "dots" }}
          />
          {workshop != null &&
            (user == null || !workshop.userId.equalsTo(user.id)) && (
              <BlurredOverlay />
            )}
          <Button
            color="green"
            leftSection={<TbEdit />}
            onClick={() => router.push(`/workshops/${workshopId}/edit`)}
          >
            編集
          </Button>
          <Modal
            opened={opened}
            onClose={close}
            title="本当に削除しますか?"
            centered
          >
            <Group>
              <Button color="gray" onClick={close} className="flex-1">
                キャンセル
              </Button>
              <Button
                color="red"
                onClick={async () => {
                  await api.v.workshop.delete.mutate({ id: workshopId });
                  router.push("/");
                }}
                className="flex-1"
              >
                削除する
              </Button>
            </Group>
          </Modal>
          <Button color="red" leftSection={<TbTrash />} onClick={open}>
            削除
          </Button>
        </Group>
        <Stack pos="relative" className="grow">
          <LoadingOverlay visible={isPending} loaderProps={{ type: "dots" }} />
          <ReactFlow nodes={nodes} nodeTypes={nodeTypes} edges={edges} fitView>
            <Background />
            <Controls />
          </ReactFlow>
        </Stack>
      </Stack>
    </>
  );
}
