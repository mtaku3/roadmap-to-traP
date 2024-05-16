"use client";

import { nodeTypes } from "@/app/components/CustomNodes";
import { useGraph } from "@/app/utils/graph";
import { Workshop } from "@/modules/domain/Workshop/Entity";
import { api } from "@/trpc/react";
import { Container, LoadingOverlay, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import ReactFlow, { Background, Controls } from "reactflow";

export default function WorkshopDetails({
  params,
}: {
  params: {
    workshopId: string;
  };
}) {
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const { data: workshop, isPending: isWorkshopPending } =
    api.tq.workshop.findById.useQuery({
      id: params.workshopId,
    });
  const { isPending: isGraphPending, nodes, edges } = useGraph(workshops);
  const isPending = isWorkshopPending || isGraphPending;

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
    <Container h="calc(100vh - var(--header-height))">
      <LoadingOverlay visible={isPending} loaderProps={{ type: "dots" }} />
      <ReactFlow nodes={nodes} nodeTypes={nodeTypes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </Container>
  );
}
