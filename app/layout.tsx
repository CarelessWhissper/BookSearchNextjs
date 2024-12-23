import type { ReactNode } from "react";
import ReduxProvider from "@/lib/ReduxProvider";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Navbar from "./components/Nav";
import "./styles/globals.css";

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <Navbar />
          <AntdRegistry>{children}</AntdRegistry>
        </ReduxProvider>
      </body>
    </html>
  );
}
