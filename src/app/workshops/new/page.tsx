"use client";

import { WorkshopCreateForm } from "@/app/components/WorkshopForm";

export default function WorkshopCreatePage() {
  return (
    <>
      <title>講習会 新規作成 | RoadmaP</title>
      <WorkshopCreateForm />
    </>
  );
}

export const revalidate = 0;
