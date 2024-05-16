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
              <Container size="md" w="100%">
                <div style={{ height: "72px", marginBottom: "24px" }}>
                  <Header />
                  <Divider />
                </div>
                {children}
              </Container>
            </MantineProvider>
          </TRPCReactProvider>
        </JotaiProvider>
      </body>
    </html>
  );
}
