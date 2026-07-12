import { RouterProvider } from "react-router";

import { router } from "./router";

export default function AppShell() {
  return <RouterProvider router={router} />;
}
