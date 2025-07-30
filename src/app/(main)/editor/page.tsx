import type { Metadata } from "next";
import ResumeEditor from "./ResumeEditor";

// COMMENT this uses server components
export const metadata: Metadata = {
  title: "Editor page",
};
export default function page() {
  return (
    <main>
      <ResumeEditor />
    </main>
  );
}
