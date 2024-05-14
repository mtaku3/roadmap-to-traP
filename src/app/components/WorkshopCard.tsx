import { Workshop } from "@/modules/domain/Workshop/Entity";
import { Card, Text } from "@mantine/core";

export default function WorkshopCard({ workshop }: { workshop: Workshop }) {
  return (
    <Card shadow="sm" radius="md" withBorder>
      <Text fw={700} size="lg">
        {workshop.name}
      </Text>
      <Text c="dimmed" size="sm">
        {workshop.description}
      </Text>
    </Card>
  );
}
