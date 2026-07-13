type ProjectVisualProps = {
  slug: string;
  title: string;
  compact?: boolean;
};

export function ProjectVisual({ slug, title, compact = false }: ProjectVisualProps) {
  const graphic = slug === "learnsync" ? <LearnSyncGraphic /> : slug === "youtube-summarizer" ? <SummaryGraphic /> : slug === "deepgram-voice-agent" ? <VoiceGraphic /> : <NutaanGraphic />;

  return (
    <div className={`project-visual project-${slug} ${compact ? "is-compact" : ""}`} aria-label={`${title} visual identity`}>
      <span className="project-visual-number">{slug === "learnsync" ? "01" : slug === "youtube-summarizer" ? "02" : slug === "deepgram-voice-agent" ? "03" : "04"}</span>
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
      <div className="learnsync-card">your path <b>↗</b></div>
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
      <span className="summary-play">▶</span>
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

function NutaanGraphic() {
  return (
    <div className="nutaan-graphic" aria-hidden="true">
      <span className="nutaan-grid" />
      <span className="nutaan-prompt">reason()</span>
      <span className="nutaan-output">signal</span>
      <span className="nutaan-axis axis-one" />
      <span className="nutaan-axis axis-two" />
    </div>
  );
}
