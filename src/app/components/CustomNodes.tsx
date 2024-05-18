"use client";

import { Workshop } from "@/modules/domain/Workshop/Entity";
import { Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { Handle, Position } from "reactflow";
import { WorkshopDrawer } from "./WorkshopDrawer";

export function WorkshopNode({ data: workshop }: { data: Workshop }) {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <div
        className="px-4 py-2 shadow-md rounded-md bg-white border-2 border-stone-400 hover:bg-gray-100 cursor-pointer"
        onClick={() => open()}
      >
        <Handle type="target" position={Position.Top} />
        <Text fw={500}>{workshop.name}</Text>
        <Handle type="source" position={Position.Bottom} />
      </div>
      <WorkshopDrawer
        opened={opened}
        open={open}
        close={close}
        workshop={workshop}
      />
    </>
  );
}

export const nodeTypes = {
  workshop: WorkshopNode,
};
