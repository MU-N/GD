import { useSyncExternalStore } from "react";
import { sections } from "../data/content.js";
import { profile } from "../data/content.js";
import { navStore } from "./navStore.js";

// Fixed top nav, rendered as plain DOM beside the Canvas. Reads/controls scroll
// through the external navStore bridge.
export default function Nav() {
  const { el, active } = useSyncExternalStore(
    navStore.subscribe,
    navStore.getSnapshot
  );

  const go = (index) => {
    if (!el) return;
    const fraction = sections.length > 1 ? index / (sections.length - 1) : 0;
    const top = fraction * (el.scrollHeight - el.clientHeight);
    el.scrollTo({ top, behavior: "smooth" });
  };

  return (
    <nav className="nav">
      <span className="brand">{profile.name.split(" ")[0]}.</span>
      <ul>
        {sections.map((s, i) => (
          <li key={s.id}>
            <button data-active={active === i} onClick={() => go(i)}>
              {s.label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
