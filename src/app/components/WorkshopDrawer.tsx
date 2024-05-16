import { Workshop } from "@/modules/domain/Workshop/Entity";
import { Event } from "@/modules/domain/Event/Entity";
import {
  Accordion,
  Card,
  Drawer,
  Stack,
  Text,
  Divider,
  Badge,
  Group,
  ThemeIcon,
  Loader,
  ActionIcon,
  Button,
  Checkbox,
  Paper,
  Tooltip,
} from "@mantine/core";
import React from "react";
import "moment/locale/ja";
import moment from "moment";
import { useAtom } from "jotai";
import { userAtom, userConfigAtom } from "../atom";
import { TbCalendarEvent, TbDoor, TbSearch, TbUserCheck } from "react-icons/tb";
import { User } from "@/modules/domain/User/Entity";
import Image from "next/image";
import Link from "next/link";

export function WorkshopDrawer({
  opened,
  open,
  close,
  workshop,
}: {
  opened: boolean;
  open: () => void;
  close: () => void;
  workshop: Workshop;
}) {
  const [userConfig, setUserConfig] = useAtom(userConfigAtom);
  function setShowEventDescription(value: boolean) {
    setUserConfig({ ...userConfig, showEventDescription: value });
  }
  function setShowOutdatedEvents(value: boolean) {
    setUserConfig({ ...userConfig, showOutdatedEvents: value });
  }

  const now = new Date();

  function filterAndSortEvents(events: Event[]) {
    return events
      .filter((x) => userConfig.showOutdatedEvents || x.timeEnd > now)
      .sort((x, y) => x.timeStart.getTime() - y.timeStart.getTime());
  }

  return (
    <Drawer position="right" opened={opened} onClose={close}>
      <Stack>
        <Stack gap="xs">
          <Text fw={700} size="lg">
            {workshop.name}
          </Text>
          <Text c="dimmed" size="sm">
            {workshop.description}
          </Text>
        </Stack>
        <Stack align="end" gap="xs">
          <Checkbox
            checked={userConfig.showOutdatedEvents}
            onChange={(e) => setShowOutdatedEvents(e.currentTarget.checked)}
            labelPosition="left"
            label="過去のイベントも表示する"
          />
          <Checkbox
            checked={userConfig.showEventDescription}
            onChange={(e) => setShowEventDescription(e.currentTarget.checked)}
            labelPosition="left"
            label="イベントの説明を表示する"
          />
        </Stack>
        {workshop.courses.length === 1 && (
          <Stack gap={1}>
            {filterAndSortEvents(workshop.courses[0].events).map(
              (event, idx) => (
                <React.Fragment key={idx}>
                  <EventCard event={event} />
                  {workshop.courses[0].events.length - 1 !== idx && <Divider />}
                </React.Fragment>
              ),
            )}
            <EventNotFound
              events={filterAndSortEvents(workshop.courses[0].events)}
              showOutdatedEvents={userConfig.showOutdatedEvents}
            />
          </Stack>
        )}
        {workshop.courses.length > 1 && (
          <Accordion multiple={true}>
            {workshop.courses
              .sort((x, y) => x.order - y.order)
              .map((course, idx) => (
                <Accordion.Item key={idx} value={course.id.toString()}>
                  <Accordion.Control>{course.name}</Accordion.Control>
                  <Accordion.Panel>
                    <Stack gap={1}>
                      {filterAndSortEvents(course.events).map((event, idx) => (
                        <React.Fragment key={idx}>
                          <EventCard event={event} />
                          {course.events.length - 1 !== idx && <Divider />}
                        </React.Fragment>
                      ))}
                      <EventNotFound
                        events={filterAndSortEvents(course.events)}
                        showOutdatedEvents={userConfig.showOutdatedEvents}
                      />
                    </Stack>
                  </Accordion.Panel>
                </Accordion.Item>
              ))}
          </Accordion>
        )}
        {workshop.courses.length === 0 && (
          <EventNotFound
            events={[]}
            showOutdatedEvents={userConfig.showOutdatedEvents}
          />
        )}
      </Stack>
    </Drawer>
  );
}

function EventNotFound({
  events,
  showOutdatedEvents,
}: {
  events: Event[];
  showOutdatedEvents: boolean;
}) {
  if (events.length > 1) {
    return;
  }

  if (showOutdatedEvents) {
    return (
      <Group justify="center" py="lg">
        <Text c="dimmed">開催されたイベントはありません</Text>
      </Group>
    );
  } else {
    return (
      <Group justify="center" py="lg">
        <Text c="dimmed">開催予定のイベントはありません</Text>
      </Group>
    );
  }
}

function EventCard({ event }: { event: Event }) {
  const [_user] = useAtom(userAtom);
  const isPending = _user.state === "loading";
  const user = _user.state === "hasData" ? _user.data : undefined;

  const [userConfig] = useAtom(userConfigAtom);

  const timeStart = moment(event.timeStart);
  const timeEnd = moment(event.timeEnd);
  let timeRange;
  if (timeStart.isSame(timeEnd, "day")) {
    timeRange = `${timeStart.format("LL (ddd)")} ${timeStart.format("HH:mm")} ~ ${timeEnd.format("HH:mm")}`;
  } else {
    timeRange = `${timeStart.format("LL (ddd) HH:mm")} ${timeEnd.format("LL (ddd) HH:mm")}`;
  }

  return (
    <Card>
      <Stack gap="sm">
        <Text fw={500} size="md">
          {event.name}
        </Text>
        <Group>
          <ThemeIcon variant="light">
            <TbCalendarEvent />
          </ThemeIcon>
          <Text size="sm">{timeRange}</Text>
        </Group>
        <Group>
          <ThemeIcon variant="light">
            <TbDoor />
          </ThemeIcon>
          <Group gap={1}>
            <Text size="sm">{event.place}</Text>
            <Tooltip label="場所を確認する">
              <ActionIcon
                component={Link}
                href={`https://www.ssc.titech.ac.jp/amap/?s=${event.place}`}
                target="_blank"
                variant="white"
              >
                <TbSearch />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Group>
        {(isPending || user != null) && (
          <Group>
            {isPending && <Loader type="dots" w="100%" />}
            {!isPending && user != null && (
              <>
                <ThemeIcon variant="light">
                  <TbUserCheck />
                </ThemeIcon>
                <AttendanceChip event={event} user={user} />
              </>
            )}
          </Group>
        )}
        <Button
          component={Link}
          href={`https://knoq.trap.jp/events/${event.id}`}
          target="_blank"
          variant="light"
        >
          <Image src="/knoq.svg" width={65} height={28} alt="knoq logo" />
          <span style={{ color: "#009688" }}>で確認する</span>
        </Button>
        {userConfig.showEventDescription && (
          <Text c="dimmed" size="sm">
            {event.description}
          </Text>
        )}
      </Stack>
    </Card>
  );
}

function AttendanceChip({ event, user }: { event: Event; user: User }) {
  const attendance = event.getAttendanceByUserId(user.id);
  switch (attendance?.schedule) {
    case "attendance":
      return (
        <Badge color="green" size="lg">
          出席
        </Badge>
      );
    case "absent":
      return (
        <Badge color="red" size="lg">
          欠席
        </Badge>
      );
    case "pending":
      return (
        <Badge color="gray" size="lg">
          未定
        </Badge>
      );
    default:
      return;
  }
}
