import { ReactNode } from "react";
import SiteHeader from "./SiteHeader";
import Sidebar from "./Sidebar";

export default function DocShell({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <div className="shell">
        <Sidebar />
        <div className="shell__main">{children}</div>
      </div>
    </>
  );
}
