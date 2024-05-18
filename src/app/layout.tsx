"use client";

import "./globals.css";
import "@mantine/core/styles.css";
import "reactflow/dist/style.css";
import {
  CSSVariablesResolver,
  ColorSchemeScript,
  Container,
  Divider,
  MantineProvider,
} from "@mantine/core";
import { Header } from "./components/Header";
import { TRPCReactProvider } from "@/trpc/react";
import { Provider as JotaiProvider } from "jotai";
import { DndProvider } from "react-dnd";
import { MultiBackend } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";

const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--header-height": "96px",
  },
  light: {},
  dark: {},
});

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
            <MantineProvider cssVariablesResolver={resolver}>
              <DndProvider backend={MultiBackend} options={HTML5toTouch}>
                <Container size="md" w="100%">
                  <div style={{ height: "72px", marginBottom: "24px" }}>
                    <Header />
                    <Divider />
                  </div>
                  {children}
                </Container>
              </DndProvider>
            </MantineProvider>
          </TRPCReactProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
