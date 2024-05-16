import { Workshop } from "@/modules/domain/Workshop/Entity";
import { Card, Text } from "@mantine/core";
import Link from "next/link";

export default function WorkshopCard({ workshop }: { workshop: Workshop }) {
  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      component={Link}
      href={`/workshops/${workshop.id}`}
      h="100%"
    >
      <Text fw={700} size="lg">
        {workshop.name}
      </Text>
      <Text c="dimmed" size="sm">
        {workshop.description}
      </Text>
    </Card>
  );
}
