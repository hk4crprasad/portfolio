import { ArrowUpRight, ClipboardPlus, Play, Users } from "lucide-react";
import { projects } from "@/data/portfolio";
type ProjectVisualProps = {
  slug: string;
  title: string;
  compact?: boolean;
};

export function ProjectVisual({
  slug,
  title,
  compact = false,
}: ProjectVisualProps) {
  const graphic =
    slug === "nutaan-cli" ? (
      <NutaanGraphic prompt="plan()" output="build" />
    ) : slug === "medikiosk" ? (
      <WorkflowGraphic kind="clinical" />
    ) : slug === "sih-2026-portal" ? (
      <WorkflowGraphic kind="registration" />
    ) : slug === "learnsync" ? (
      <LearnSyncGraphic />
    ) : slug === "youtube-summarizer" ? (
      <SummaryGraphic />
    ) : slug === "deepgram-voice-agent" || slug === "nutaan-ai" ? (
      <VoiceGraphic />
    ) : (
      <NutaanGraphic />
    );

  return (
    <div
      className={`project-visual project-${slug} ${compact ? "is-compact" : ""}`}
      role="img"
      aria-label={`${title}: abstract project illustration`}
    >
      <span className="project-visual-number">
        {String(projects.findIndex((project) => project.slug === slug) + 1).padStart(2, "0")}
      </span>
      {graphic}
      <span className="project-visual-label">{title}</span>
    </div>
  );
}

function LearnSyncGraphic() {
  return (
    <div className="learnsync-graphic" aria-hidden="true">
      <div className="learnsync-path" />
      <span className="learnsync-node node-a" />
      <span className="learnsync-node node-b" />
      <span className="learnsync-node node-c" />
      <div className="learnsync-card">
        your path <ArrowUpRight size={16} aria-hidden="true" />
      </div>
    </div>
  );
}

function SummaryGraphic() {
  return (
    <div className="summary-graphic" aria-hidden="true">
      <span className="summary-line l1" />
      <span className="summary-line l2" />
      <span className="summary-line l3" />
      <span className="summary-line l4" />
      <span className="summary-play">
        <Play size={24} aria-hidden="true" />
      </span>
      <span className="summary-orbit" />
    </div>
  );
}

function VoiceGraphic() {
  return (
    <div className="voice-graphic" aria-hidden="true">
      <span className="voice-ring ring-one" />
      <span className="voice-ring ring-two" />
      <span className="voice-ring ring-three" />
      <span className="voice-core">◌</span>
      <span className="voice-wave">∿∿∿</span>
    </div>
  );
}

function NutaanGraphic({ prompt = "reason()", output = "signal" }: { prompt?: string; output?: string }) {
  return (
    <div className="nutaan-graphic" aria-hidden="true">
      <span className="nutaan-grid" />
      <span className="nutaan-prompt">{prompt}</span>
      <span className="nutaan-output">{output}</span>
      <span className="nutaan-axis axis-one" />
      <span className="nutaan-axis axis-two" />
    </div>
  );
}

function WorkflowGraphic({ kind }: { kind: "clinical" | "registration" }) {
  return (
    <div className="workflow-graphic" aria-hidden="true">
      <div className="workflow-card">
        {kind === "clinical" ? <ClipboardPlus size={40} /> : <Users size={40} />}
        <span>{kind === "clinical" ? "Patient history" : "18 teams"}</span>
        <span className="workflow-line" />
        <span className="workflow-line workflow-line-short" />
        <span className="workflow-outcome">{kind === "clinical" ? "Physician review" : "108 students"}<ArrowUpRight size={16} /></span>
      </div>
    </div>
  );
}
