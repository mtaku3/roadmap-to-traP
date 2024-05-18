"use client";

import { WorkshopUpdateForm } from "@/app/components/WorkshopForm";
import { api } from "@/trpc/react";
import { Loader } from "@mantine/core";

export default function WorkshopUpdatePage({
  params,
}: {
  params: { workshopId: string };
}) {
  const { data: workshop, isPending: isPending } =
    api.tq.workshop.findById.useQuery({
      id: params.workshopId,
    });

  if (isPending || workshop == null) {
    return <Loader type="dots" w="100%" />;
  }

  return (
    <>
      <title>講習会 編集 | RoadmaP</title>
      <WorkshopUpdateForm defaultValue={workshop} />
    </>
  );
}
