const technologies = [
  ["Python", "https://www.python.org"],
  ["Django", "https://www.djangoproject.com"],
  ["FastAPI", "https://fastapi.tiangolo.com"],
  ["Hugging Face", "https://huggingface.co"],
  ["Google Cloud", "https://cloud.google.com"],
  ["MongoDB", "https://www.mongodb.com"],
  ["Docker", "https://www.docker.com"],
  ["PostgreSQL", "https://www.postgresql.org"],
  ["Next.js", "https://nextjs.org"],
  ["React", "https://react.dev"],
  ["TypeScript", "https://www.typescriptlang.org"],
];
export function TechLogoLoop() {
  return (
    <ul className="technology-list container">
      {technologies.map(([name, url]) => (
        <li key={name}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {name}
          </a>
        </li>
      ))}
    </ul>
  );
}
