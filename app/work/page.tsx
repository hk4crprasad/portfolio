import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { WorkExplorer } from "@/components/work-explorer";

export const metadata: Metadata = { title: "Selected Work" };

export default function WorkPage() {
  return (
    <>
      <PageIntro
        eyebrow="Selected work"
        index="01 / 04"
        title={<>Systems that begin<br />with a <em>useful question.</em></>}
        intro="A selection of AI products, experiments, and enterprise work shaped from the problem outward. Every project has an opinion about what it should make easier."
      />
      <WorkExplorer />
    </>
  );
}
