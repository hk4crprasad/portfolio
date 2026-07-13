type PageIntroProps = {
  eyebrow: string;
  title: React.ReactNode;
  intro: string;
  index: string;
};

export function PageIntro({ eyebrow, title, intro, index }: PageIntroProps) {
  return (
    <section className="page-intro container">
      <div className="page-intro-top">
        <p className="eyebrow">{eyebrow}</p>
        <span className="page-index">{index}</span>
      </div>
      <h1>{title}</h1>
      <p className="page-intro-copy">{intro}</p>
    </section>
  );
}
