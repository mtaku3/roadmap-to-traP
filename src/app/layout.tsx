"use client";

import "./globals.css";
import "@mantine/core/styles.css";
import {
  ColorSchemeScript,
  Container,
  Divider,
  Group,
  MantineProvider,
  Stack,
} from "@mantine/core";
import { Header } from "./components/Header";
import { TRPCReactProvider } from "@/trpc/react";
import { Provider as JotaiProvider } from "jotai";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <ColorSchemeScript />
      </head>
      <body>
        <JotaiProvider>
          <TRPCReactProvider>
            <MantineProvider>
              <Container size="md" mih="100vh">
                <Stack>
                  <Stack gap={0}>
                    <Header />
                    <Divider />
                  </Stack>
                  {children}
                </Stack>
              </Container>
            </MantineProvider>
          </TRPCReactProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
