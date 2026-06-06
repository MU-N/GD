import { skills } from "../data/content.js";

export default function Skills() {
  return (
    <section className="section" id="skills">
      <span className="eyebrow">My Toolkit</span>
      <h2 className="title">Tools of the trade.</h2>
      <div className="skill-strip">
        {skills.map((s) => (
          <div className="skill" key={s.label}>
            <img src={s.image} alt={s.label} loading="lazy" />
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
