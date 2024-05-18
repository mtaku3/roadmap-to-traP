import {
  Stack,
  Group,
  ActionIcon,
  Divider,
  Combobox,
  useCombobox,
  InputBase,
  ScrollArea,
  CheckIcon,
  useMantineTheme,
  Overlay,
} from "@mantine/core";
import { useCallback, useState } from "react";
import { useUncontrolled } from "@mantine/hooks";
import React from "react";
import { TbTrash } from "react-icons/tb";

export function CardMultiSelect<T>({
  options,
  getId,
  value,
  onChange,
  filterOnSearch,
  renderCard,
  placeholder,
  showSelectedCards = true,
}: {
  options: T[];
  getId: (option: T) => string;
  value: string[];
  onChange: (value: string[]) => void;
  filterOnSearch: (query: string) => T[];
  renderCard: (option: T) => React.ReactNode;
  placeholder?: string;
  showSelectedCards?: boolean;
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
      {showSelectedCards && (
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
      )}
    </Stack>
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
