import { useMemo, useState } from "react";
import { projects } from "../data/content.js";

// Unique tech tags across all projects, for the filter bar.
const allTags = ["All", ...new Set(projects.flatMap((p) => p.tags))];

export default function Work() {
  const [filter, setFilter] = useState("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.tags.includes(filter)),
    [filter]
  );

  // Cursor-tracked 3D tilt + spotlight: write CSS vars on the card, no re-render.
  const onMove = (e) => {
    const card = e.currentTarget;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width; // 0..1
    const py = (e.clientY - r.top) / r.height;
    card.style.setProperty("--ry", `${(px - 0.5) * 12}deg`);
    card.style.setProperty("--rx", `${(0.5 - py) * 12}deg`);
    card.style.setProperty("--mx", `${px * 100}%`);
    card.style.setProperty("--my", `${py * 100}%`);
  };
  const onLeave = (e) => {
    const card = e.currentTarget;
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--rx", "0deg");
  };

  return (
    <section className="section" id="work">
      <span className="eyebrow">Selected Work</span>
      <h2 className="title">Things I've built.</h2>

      <div className="filters">
        {allTags.map((t) => (
          <button
            key={t}
            className="filter"
            data-active={filter === t}
            onClick={() => setFilter(t)}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="cards">
        {visible.map((p) => (
          <a
            key={p.title}
            className="card"
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            onMouseMove={onMove}
            onMouseLeave={onLeave}
          >
            <div className="card-inner">
              <div className="card-media">
                <img loading="lazy" src={p.image} alt={p.title} />
                <span className="card-cta">View ↗</span>
              </div>
              <div className="card-body">
                <h3>{p.title}</h3>
                <p>{p.blurb}</p>
                <ul className="tags">
                  {p.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
