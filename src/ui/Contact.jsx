import { profile } from "../data/content.js";

export default function Contact() {
  return (
    <section className="section" id="contact">
      {profile.available && (
        <span className="hire">
          <span className="dot" />
          Available for opportunities
        </span>
      )}
      <h2 className="title">Let's build something.</h2>
      <p className="lead">
        Based in {profile.location}, I love pushing the boundaries of interactive
        experiences. Reach out — I'm happy to talk games, tech, or collaboration.
      </p>
      <div className="contact-meta">
        <span>📍 {profile.location}</span>
        <span>📞 {profile.phone}</span>
        <span>
          ✉️ <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </span>
      </div>
      <div className="row">
        {profile.socials.map((s) => (
          <a
            key={s.label}
            className="btn btn-ghost"
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {s.label}
          </a>
        ))}
      </div>
    </section>
  );
}
