import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { SWRConfig } from "swr";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SWRConfig
      value={{
        fetcher: (input, init) => fetch(input, init).then((res) => res.json()),
      }}
    >
      <RouterProvider router={router} />
    </SWRConfig>
  </StrictMode>,
);
