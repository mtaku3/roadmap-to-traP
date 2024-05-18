"use client";

import { appConfigAtom, userAtom } from "@/app/atom";
import { api } from "@/trpc/react";
import {
  Alert,
  LoadingOverlay,
  Overlay,
  Stack,
  TextInput,
  Textarea,
  Text,
  useMantineTheme,
  Select,
  Button,
  Group,
  Card,
  ActionIcon,
  Divider,
  Drawer,
  Combobox,
  useCombobox,
  InputBase,
  ThemeIcon,
  ScrollArea,
  CheckIcon,
} from "@mantine/core";
import { useAtom } from "jotai";
import { useCallback, useMemo, useRef, useState } from "react";
import type { Identifier, XYCoord } from "dnd-core";
import { useDrag, useDrop } from "react-dnd";
import { TbCalendarEvent, TbDoor, TbEdit, TbTrash } from "react-icons/tb";
import { useDisclosure, useUncontrolled } from "@mantine/hooks";
import { v4 as uuidv4 } from "uuid";
import {
  Control,
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";
import "moment/locale/ja";
import moment from "moment";
import React from "react";
import { Workshop } from "@/modules/domain/Workshop/Entity";
import { BlurredOverlay } from "./BlurredOverlay";
import { useRouter } from "next/navigation";

export function WorkshopUpdateForm({
  defaultValue,
}: {
  defaultValue: Workshop;
}) {
  const router = useRouter();
  const onSubmit: SubmitHandler<IWorkshopUpdateForm> = async (data) => {
    await api.v.workshop.update.mutate(data);
    router.push(`/workshops/${data.id}`);
  };
  const [_user] = useAtom(userAtom);
  const isUserPending = _user.state === "loading";
  const user = _user.state === "hasData" ? _user.data : undefined;
  const isPending = isUserPending;
  const { control, handleSubmit } = useForm<IWorkshopUpdateForm>({
    defaultValues: {
      id: defaultValue.id.toString(),
      name: defaultValue.name,
      description: defaultValue.description,
      courses: defaultValue.courses.map((x) => ({
        id: x.id.toString(),
        name: x.name,
        description: x.description,
        order: x.order,
        events: x.events.map((x) => x.id.toString()),
      })),
      workshopsDependentOn: defaultValue.workshopsDependentOn.map((x) =>
        x.toString(),
      ),
    },
  });
  const {
    fields: courses,
    replace: setCourses,
    append: appendCourse,
    remove: removeCourse,
  } = useFieldArray({
    control,
    name: "courses",
  });

  function move(from: number, to: number) {
    const tmp = courses[from].order;
    courses[from].order = courses[to].order;
    courses[to].order = tmp;
    setCourses(courses.sort((x, y) => x.order - y.order));
  }

  const renderCourseCard = useCallback(
    (
      id: string,
      index: number,
      remove: () => void,
      move: (from: number, to: number) => void,
      control: Control<IWorkshopUpdateForm>,
    ) => {
      return (
        <CourseCard
          key={id}
          index={index}
          remove={remove}
          move={move}
          control={control}
        />
      );
    },
    [],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack pos="relative" gap="md">
        {!isUserPending && user == null && (
          <BlurredOverlay>
            <Text c="red" fw={700}>
              講習会の編集はログイン済みユーザーのみ可能です。右上のログインボタンからログインしてください。
            </Text>
          </BlurredOverlay>
        )}
        {!isUserPending &&
          user != null &&
          !defaultValue.userId.equalsTo(user.id) && (
            <BlurredOverlay>
              <Text c="red" fw={700}>
                講習会の編集は講習会の作成者のみ可能です。
              </Text>
            </BlurredOverlay>
          )}
        <LoadingOverlay visible={isPending} loaderProps={{ type: "dots" }} />
        <Alert>
          RoadmaP は講習会, 勉強会,
          イベント等の依存関係を管理・視覚化するために開発されたアプリケーションです。新入生にとって良い学習目標となるよう情報整備にご協力よろしくお願い致します。
        </Alert>
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextInput
              label="講習会名"
              placeholder="ex. プログラミング基礎講習会"
              value={field.value}
              onBlur={field.onBlur}
              onChange={(e) => field.onChange(e.currentTarget.value)}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <Textarea
              label="講習会全体の概要"
              placeholder="ex. 大学に入って初めてプログラミングを始めるプログラミング初心者がプログラミングの基礎を学べる会"
              description="講習会が複数回で構成される場合、各回の内容は以下のコースにて個別に登録可能ですので、あくまでもこちらは講習会全体としての概要や到達目標を記入してください。"
              value={field.value}
              onBlur={field.onBlur}
              onChange={(e) => field.onChange(e.currentTarget.value)}
            />
          )}
        />
        <Stack gap="xs">
          <Group>
            <Text>コース</Text>
            <Button
              ml="auto"
              onClick={() =>
                appendCourse({
                  id: uuidv4(),
                  name: "",
                  description: "",
                  order: courses.length + 1,
                  events: [],
                })
              }
            >
              コースを追加
            </Button>
          </Group>
          <Divider />
          {courses.map((course, idx) =>
            renderCourseCard(
              course.id,
              idx,
              () => removeCourse(idx),
              move,
              control,
            ),
          )}
        </Stack>
        <Controller
          control={control}
          name="workshopsDependentOn"
          render={({ field }) => (
            <Stack gap="xs">
              <Text>依存する講習会</Text>
              <Divider />
              <Alert>
                {
                  "ランク差が１の依存性を選択してください。例えば、「なろう講習会」->「Web基礎講習会」->「プログラミング基礎講習会」の依存性がある場合の「なろう講習会」の依存する講習会は「Web基礎講習会」のみです。RoadmaPは再帰的に依存性を解決してグラフを構築します。"
                }
              </Alert>
              <WorkshopMultiSelect
                value={field.value}
                onChange={field.onChange}
              />
            </Stack>
          )}
        />
        <Button type="submit" w="100%">
          登録
        </Button>
      </Stack>
    </form>
  );
}

export function WorkshopCreateForm() {
  const router = useRouter();
  const onSubmit: SubmitHandler<IWorkshopCreateOrUpdateForm> = async (data) => {
    const workshop = await api.v.workshop.create.mutate(data);
    router.push(`/workshops/${workshop.id}`);
  };
  const [_user] = useAtom(userAtom);
  const isUserPending = _user.state === "loading";
  const user = _user.state === "hasData" ? _user.data : undefined;
  const { isPending: isSchoolYearsPending, data: schoolYears } =
    api.tq.schoolYear.get.useQuery();
  const isPending = isUserPending || isSchoolYearsPending;
  const { control, handleSubmit } = useForm<IWorkshopCreateForm>({
    defaultValues: {
      id: uuidv4(),
      name: "",
      description: "",
      courses: [],
      workshopsDependentOn: [],
      schoolYearId: "",
    },
  });
  const {
    fields: courses,
    replace: setCourses,
    append: appendCourse,
    remove: removeCourse,
  } = useFieldArray({
    control,
    name: "courses",
  });

  function move(from: number, to: number) {
    const tmp = courses[from].order;
    courses[from].order = courses[to].order;
    courses[to].order = tmp;
    setCourses(courses.sort((x, y) => x.order - y.order));
  }

  const renderCourseCard = useCallback(
    (
      id: string,
      index: number,
      remove: () => void,
      move: (from: number, to: number) => void,
      control: Control<IWorkshopCreateForm>,
    ) => {
      return (
        <CourseCard
          key={id}
          index={index}
          remove={remove}
          move={move}
          control={control}
        />
      );
    },
    [],
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack pos="relative" gap="md">
        {!isUserPending && user == null && (
          <BlurredOverlay>
            <Text c="red" fw={700}>
              講習会の登録はログイン済みユーザーのみ可能です。右上のログインボタンからログインしてください。
            </Text>
          </BlurredOverlay>
        )}
        <LoadingOverlay visible={isPending} loaderProps={{ type: "dots" }} />
        <Alert>
          RoadmaP は講習会, 勉強会,
          イベント等の依存関係を管理・視覚化するために開発されたアプリケーションです。新入生にとって良い学習目標となるよう情報整備にご協力よろしくお願い致します。
        </Alert>
        <Controller
          control={control}
          name="schoolYearId"
          render={({ field }) => (
            <Select
              ref={field.ref}
              label="開講年度"
              data={schoolYears?.map((x) => ({
                label: x.name,
                value: x.id.toString(),
              }))}
              value={field.value}
              onBlur={field.onBlur}
              onChange={(value) => field.onChange(value)}
            />
          )}
        />
        <Controller
          control={control}
          name="name"
          render={({ field }) => (
            <TextInput
              label="講習会名"
              placeholder="ex. プログラミング基礎講習会"
              value={field.value}
              onBlur={field.onBlur}
              onChange={(e) => field.onChange(e.currentTarget.value)}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          render={({ field }) => (
            <Textarea
              label="講習会全体の概要"
              placeholder="ex. 大学に入って初めてプログラミングを始めるプログラミング初心者がプログラミングの基礎を学べる会"
              description="講習会が複数回で構成される場合、各回の内容は以下のコースにて個別に登録可能ですので、あくまでもこちらは講習会全体としての概要や到達目標を記入してください。"
              value={field.value}
              onBlur={field.onBlur}
              onChange={(e) => field.onChange(e.currentTarget.value)}
            />
          )}
        />
        <Stack gap="xs">
          <Group>
            <Text>コース</Text>
            <Button
              ml="auto"
              onClick={() =>
                appendCourse({
                  id: uuidv4(),
                  name: "",
                  description: "",
                  order: courses.length + 1,
                  events: [],
                })
              }
            >
              コースを追加
            </Button>
          </Group>
          <Divider />
          {courses.map((course, idx) =>
            renderCourseCard(
              course.id,
              idx,
              () => removeCourse(idx),
              move,
              control,
            ),
          )}
        </Stack>
        <Controller
          control={control}
          name="workshopsDependentOn"
          render={({ field }) => (
            <Stack gap="xs">
              <Text>依存する講習会</Text>
              <Divider />
              <Alert>
                {
                  "ランク差が１の依存性を選択してください。例えば、「なろう講習会」->「Web基礎講習会」->「プログラミング基礎講習会」の依存性がある場合の「なろう講習会」の依存する講習会は「Web基礎講習会」のみです。RoadmaPは再帰的に依存性を解決してグラフを構築します。"
                }
              </Alert>
              <WorkshopMultiSelect
                value={field.value}
                onChange={field.onChange}
              />
            </Stack>
          )}
        />
        <Button type="submit" w="100%">
          登録
        </Button>
      </Stack>
    </form>
  );
}

type KnoqEvent = Awaited<ReturnType<typeof api.v.event.getOptions.query>>[0];

function EventCard({ event }: { event: KnoqEvent }) {
  const timeStart = moment(event.timeStart);
  const timeEnd = moment(event.timeEnd);
  let timeRange;
  if (timeStart.isSame(timeEnd, "day")) {
    timeRange = `${timeStart.format("LL (ddd)")} ${timeStart.format("HH:mm")} ~ ${timeEnd.format("HH:mm")}`;
  } else {
    timeRange = `${timeStart.format("LL (ddd) HH:mm")} ${timeEnd.format("LL (ddd) HH:mm")}`;
  }
  return (
    <Stack p={4} gap="sm" className="flex-1">
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
        </Group>
      </Group>
    </Stack>
  );
}

function CardMultiSelect<T>({
  options,
  getId,
  value,
  onChange,
  filterOnSearch,
  renderCard,
  placeholder,
}: {
  options: T[];
  getId: (option: T) => string;
  value: string[];
  onChange: (value: string[]) => void;
  filterOnSearch: (query: string) => T[];
  renderCard: (option: T) => React.ReactNode;
  placeholder?: string;
}) {
  const [search, setSearch] = useState("");
  const [_value, setValue] = useUncontrolled({
    value,
    finalValue: [],
    onChange,
  });
  const combobox = useCombobox({
    onDropdownClose: () => {
      setSearch("");
    },
  });
  const memoizedFilterOnSearch = useCallback(filterOnSearch, [filterOnSearch]);
  const memoizedRenderCard = useCallback(renderCard, [renderCard]);

  const filteredOptions = memoizedFilterOnSearch(search);
  const selectedOptions = options.filter((x) => _value.includes(getId(x)));

  return (
    <Stack>
      <Combobox store={combobox}>
        <Combobox.Target>
          <InputBase
            value={search}
            onChange={(e) => {
              combobox.openDropdown();
              combobox.updateSelectedOptionIndex();
              setSearch(e.currentTarget.value);
            }}
            onClick={() => combobox.openDropdown()}
            onFocus={() => combobox.openDropdown()}
            onBlur={() => combobox.closeDropdown()}
            placeholder={placeholder}
          />
        </Combobox.Target>

        <Combobox.Dropdown>
          <Combobox.Options>
            {filteredOptions.length > 0 ? (
              <ScrollArea.Autosize type="scroll" mah={400}>
                {filteredOptions.map((option, idx) => (
                  <Combobox.Option
                    key={idx}
                    value={getId(option)}
                    onClick={() =>
                      setValue(
                        _value.includes(getId(option))
                          ? _value.filter((x) => x !== getId(option))
                          : [..._value, getId(option)],
                      )
                    }
                  >
                    <Group>
                      {_value.includes(getId(option)) && (
                        <CheckIcon className="shrink-0 opacity-40 w-[0.8em] min-w-[0.8em] h-[0.8em]" />
                      )}
                      {memoizedRenderCard(option)}
                    </Group>
                  </Combobox.Option>
                ))}
              </ScrollArea.Autosize>
            ) : (
              <Combobox.Empty>見つかりませんでした</Combobox.Empty>
            )}
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
      <Stack pos="relative">
        {combobox.dropdownOpened && <CardMultiSelectOverlay />}
        {selectedOptions.map((option, idx) => (
          <React.Fragment key={getId(option)}>
            <Group>
              {memoizedRenderCard(option)}
              <ActionIcon
                ml="auto"
                color="red"
                onClick={() =>
                  setValue(_value.filter((x) => x !== getId(option)))
                }
              >
                <TbTrash />
              </ActionIcon>
            </Group>
            {idx < selectedOptions.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </Stack>
    </Stack>
  );
}

function WorkshopCard({ workshop }: { workshop: Workshop }) {
  return (
    <Stack p={4} gap="sm" className="flex-1">
      <Text fw={500} size="md">
        {workshop.name}
      </Text>
      <Text c="dimmed">{workshop.description}</Text>
    </Stack>
  );
}

function WorkshopMultiSelect({
  value,
  onChange,
}: {
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const [_appConfig, _setAppConfig] = useAtom(appConfigAtom);
  const isAppConfigPending = _appConfig.state === "loading";
  const appConfig =
    _appConfig.state === "hasData" ? _appConfig.data : undefined;
  const { data: workshops, isPending: isWorkshopsPending } =
    api.tq.workshop.getAll.useQuery(
      { schoolYearId: appConfig?.schoolYear.id.toString() ?? "" },
      {
        enabled: !isAppConfigPending && appConfig != null,
      },
    );

  function getFilteredWorkshops(query: string) {
    return workshops?.filter((x) => x.name.includes(query)) ?? [];
  }

  const renderCard = (workshop: Workshop) => (
    <WorkshopCard workshop={workshop} />
  );

  return (
    <Stack pos="relative">
      <LoadingOverlay
        visible={isWorkshopsPending}
        loaderProps={{ type: "dots" }}
      />
      <CardMultiSelect
        options={workshops ?? []}
        getId={(x) => x.id.toString()}
        value={value}
        filterOnSearch={getFilteredWorkshops}
        onChange={onChange}
        renderCard={renderCard}
        placeholder="依存する講習会を追加"
      />
    </Stack>
  );
}

function EventMultiSelect({
  events,
  value,
  onChange,
}: {
  events: KnoqEvent[];
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const [_appConfig, _setAppConfig] = useAtom(appConfigAtom);
  const appConfig =
    _appConfig.state === "hasData" ? _appConfig.data : undefined;

  function getFilteredEvents(query: string) {
    const dateRegex =
      /^((?<year>\d{4})[-\/])?(?<month>\d{1,2})[-\/](?<day>\d{1,2})$/g;
    let year, month, day;
    for (const { groups } of Array.from(query.matchAll(dateRegex))) {
      if (
        (groups?.year != null || appConfig != null) &&
        groups?.month != null &&
        groups?.day != null
      ) {
        year = Number(groups?.year ?? appConfig?.schoolYear.value);
        month = Number(groups.month);
        day = Number(groups.day);
        break;
      }
    }
    const date =
      year != null && month != null && day != null
        ? new Date(year, month - 1, day, 0, 0, 0, 0)
        : undefined;
    return events.filter((x) => {
      const timeStart = new Date(x.timeStart);
      const timeEnd = new Date(x.timeEnd);
      return date != null
        ? (timeStart <= date && date <= timeEnd) ||
            (timeStart.getFullYear() === date.getFullYear() &&
              timeStart.getMonth() === date.getMonth() &&
              timeStart.getDate() === date.getDate()) ||
            (timeEnd.getFullYear() === date.getFullYear() &&
              timeEnd.getMonth() === date.getMonth() &&
              timeEnd.getDate() === date.getDate())
        : x.name.includes(query) || x.eventId === query;
    });
  }

  const renderEvent = (event: KnoqEvent) => <EventCard event={event} />;

  return (
    <CardMultiSelect
      options={events}
      getId={(x) => x.eventId}
      value={value}
      onChange={onChange}
      filterOnSearch={getFilteredEvents}
      renderCard={renderEvent}
      placeholder="イベントを追加"
    />
  );
}

function CardMultiSelectOverlay() {
  const theme = useMantineTheme();

  return (
    <>
      <Overlay darkHidden center backgroundOpacity={0.75} color={theme.white} />
      <Overlay
        lightHidden
        center
        backgroundOpacity={0.75}
        color={theme.colors.dark[5]}
      />
    </>
  );
}

function CourseDrawerForm({
  opened,
  open,
  close,
  index,
  control,
}: {
  opened: boolean;
  open: () => void;
  close: () => void;
  index: number;
  control: Control<IWorkshopCreateOrUpdateForm>;
}) {
  const [_appConfig, _setAppConfig] = useAtom(appConfigAtom);
  const isAppConfigPending = _appConfig.state === "loading";
  const appConfig =
    _appConfig.state === "hasData" ? _appConfig.data : undefined;
  const { data: availableEvents, isPending: isAvailableEventsPending } =
    api.tq.event.getOptions.useQuery(
      { schoolYearId: appConfig!.schoolYear.id.toString() },
      {
        enabled: !isAppConfigPending && appConfig != null,
      },
    );

  return (
    <Drawer
      position="right"
      opened={opened}
      onClose={() => close()}
      scrollAreaComponent={ScrollArea.Autosize}
    >
      <Stack gap="md">
        <Controller
          control={control}
          name={`courses.${index}.name`}
          render={({ field }) => (
            <TextInput
              label="コース名"
              description="講習会が１回のみで構成される場合はコース名を記入する必要はありません"
              placeholder="ex. 第１回"
              value={field.value}
              onBlur={field.onBlur}
              onChange={(e) => field.onChange(e.currentTarget.value)}
            />
          )}
        />
        <Controller
          control={control}
          name={`courses.${index}.description`}
          render={({ field }) => (
            <Textarea
              label="コースの概要"
              placeholder="ex. 大学入学後にプログラミングを始める人必見の、プログラミングの基礎全般を扱う班を横断した講習会です。複数日程用意してるので自分の合うタイミングでぜひぜひご参加ください！"
              description="講習会が１回のみで構成される場合はコースの概要を記入する必要はありません"
              value={field.value}
              onBlur={field.onBlur}
              onChange={(e) => field.onChange(e.currentTarget.value)}
            />
          )}
        />
        <Controller
          control={control}
          name={`courses.${index}.events`}
          render={({ field }) => (
            <Stack pos="relative">
              <LoadingOverlay
                visible={isAvailableEventsPending}
                loaderProps={{ type: "dots" }}
              />
              <EventMultiSelect
                events={availableEvents ?? []}
                value={field.value}
                onChange={field.onChange}
              />
            </Stack>
          )}
        />
      </Stack>
    </Drawer>
  );
}

enum DragItemType {
  COURSECARD = "COURSECARD",
}
type DragItem = { id: string; index: number; type: string };

function CourseCard({
  index,
  remove,
  move,
  control,
}: {
  index: number;
  remove: () => void;
  move: (from: number, to: number) => void;
  control: Control<IWorkshopCreateOrUpdateForm>;
}) {
  const courses = useWatch({
    name: "courses",
    control,
  });
  const course = courses[index];

  const [opened, { open, close }] = useDisclosure(false);

  const ref = useRef<HTMLDivElement>(null);
  const [{ handlerId }, drop] = useDrop<
    DragItem,
    void,
    { handlerId: Identifier | null }
  >({
    accept: DragItemType.COURSECARD,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: DragItem, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();

      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      // Determine mouse position
      const clientOffset = monitor.getClientOffset();

      // Get pixels to the top
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      // Time to actually perform the action
      move(dragIndex, hoverIndex);

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: DragItemType.COURSECARD,
    item: () => {
      return { id: course.id, index };
    },
    collect: (monitor: any) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <>
      <Card ref={ref} data-handler-id={handlerId} shadow="sm" withBorder>
        <Group>
          <Stack className="grow" gap={2}>
            <Text fw={700} size="md">
              {course.name}
            </Text>
            <Text c="dimmed" size="sm">
              {course.description}
            </Text>
          </Stack>
          <Group className="shrink-0">
            <ActionIcon color="green" onClick={() => open()}>
              <TbEdit />
            </ActionIcon>
            <ActionIcon color="red" onClick={() => remove()}>
              <TbTrash />
            </ActionIcon>
          </Group>
        </Group>
      </Card>
      <CourseDrawerForm
        opened={opened}
        open={open}
        close={close}
        index={index}
        control={control}
      />
    </>
  );
}

export type IWorkshopCreateOrUpdateForm =
  | IWorkshopCreateForm
  | IWorkshopUpdateForm;

export interface IWorkshopCreateForm {
  id: string;
  name: string;
  description: string;
  courses: {
    id: string;
    name: string;
    description: string;
    order: number;
    events: string[];
  }[];
  workshopsDependentOn: string[];
  schoolYearId: string;
}

export interface IWorkshopUpdateForm {
  id: string;
  name: string;
  description: string;
  courses: {
    id: string;
    name: string;
    description: string;
    order: number;
    events: string[];
  }[];
  workshopsDependentOn: string[];
  schoolYearId: string;
}
