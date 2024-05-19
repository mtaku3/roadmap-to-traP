import "../styles/globals.css";
import "@mantine/core/styles.css";
import "reactflow/dist/style.css";
import {
  CSSVariablesResolver,
  Container,
  Divider,
  MantineProvider,
  createTheme,
} from "@mantine/core";
import { Provider as JotaiProvider } from "jotai";
import { DndProvider } from "react-dnd";
import { MultiBackend } from "react-dnd-multi-backend";
import { HTML5toTouch } from "rdndmb-html5-to-touch";
import { Header } from "@/client/components/Header";
import { AppType } from "next/app";
import { api } from "@/trpc/react";

const resolver: CSSVariablesResolver = (theme) => ({
  variables: {
    "--header-height": "96px",
  },
  light: {},
  dark: {},
});

const theme = createTheme({});

const myApp: AppType = ({ Component, pageProps }) => {
  return (
    <JotaiProvider>
      <MantineProvider theme={theme} cssVariablesResolver={resolver}>
        <DndProvider backend={MultiBackend} options={HTML5toTouch}>
          <Container size="md" w="100%">
            <div style={{ height: "72px", marginBottom: "24px" }}>
              <Header />
              <Divider />
            </div>
            <Component {...pageProps} />
          </Container>
        </DndProvider>
      </MantineProvider>
    </JotaiProvider>
  );
};

export default api.tq.withTRPC(myApp);
