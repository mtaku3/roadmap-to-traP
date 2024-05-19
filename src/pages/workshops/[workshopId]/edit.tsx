import { WorkshopUpdateForm } from "@/client/components/WorkshopForm";
import { api } from "@/trpc/react";
import { Loader } from "@mantine/core";
import { useRouter } from "next/router";

export default function WorkshopUpdatePage() {
  const router = useRouter();
  const { data: workshop, isPending: isPending } =
    api.tq.workshop.findById.useQuery({
      id: router.query.workshopId as string,
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
