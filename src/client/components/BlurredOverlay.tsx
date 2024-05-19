import { Overlay, useMantineTheme } from "@mantine/core";

export function BlurredOverlay({ children }: { children?: React.ReactNode }) {
  const theme = useMantineTheme();

  return (
    <>
      <Overlay darkHidden center backgroundOpacity={0.75} color={theme.white}>
        {children}
      </Overlay>
      <Overlay
        lightHidden
        center
        backgroundOpacity={0.75}
        color={theme.colors.dark[5]}
      >
        {children}
      </Overlay>
    </>
  );
}
