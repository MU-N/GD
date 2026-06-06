import { profile, cvUrl } from "../data/content.js";
import { useScrollTo } from "./useScrollTo.js";

export default function Hero() {
  const scrollTo = useScrollTo();
  return (
    <section className="section" id="intro">
      <span className="eyebrow">{profile.role}</span>
      <h1 className="title">Hi, I'm {profile.name}.</h1>
      <p className="lead">{profile.tagline}</p>
      <div className="row">
        <button className="btn btn-primary" onClick={() => scrollTo("contact")}>
          Get in touch
        </button>
        <a className="btn btn-ghost" href={cvUrl} download>
          Download CV
        </a>
      </div>
    </section>
  );
}
