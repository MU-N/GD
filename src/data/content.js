// ============================================================================
// Single source of truth for all portfolio copy + media.
// Edit THIS file to drop in final content later — the 3D shell reads from it.
// ============================================================================

// Bundle the existing image assets so they resolve correctly under the /GD/
// base in production. Keys are the matched paths; values are final URL strings.
const workImages = import.meta.glob("/assets/images/work/*.webp", {
  eager: true,
  import: "default",
  query: "?url",
});
const skillImages = import.meta.glob("/assets/images/skills/*.webp", {
  eager: true,
  import: "default",
  query: "?url",
});

const work = (name) => workImages[`/assets/images/work/${name}`];
const skill = (name) => skillImages[`/assets/images/skills/${name}`];

// CV + social links live at repo root; reference under the deploy base.
const base = import.meta.env.BASE_URL;
export const cvUrl = `${base}assets/documents/Muhammad_Nasser_Game_Dev_CV.pdf`;

export const profile = {
  name: "Muhammad Nasser",
  role: "Game Developer",
  tagline:
    "Unity · C# · AR/VR. I build immersive games and cognitive-training experiences with a focus on performance and innovation.",
  location: "Cairo, Egypt",
  phone: "+20 114 747 2803",
  email: "muhammedn.elsayed@gmail.com",
  available: true,
  socials: [
    { label: "GitHub", url: "https://github.com/MU-N" },
    { label: "LinkedIn", url: "https://linkedin.com/in/mu-n" },
  ],
};

// Ordered checkpoints / "rooms" the camera travels through on scroll.
export const sections = [
  { id: "intro", label: "Home" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];

export const projects = [
  {
    title: "Educational VR Projects",
    blurb:
      "Immersive VR educational experiences and classroom simulations for student learning and teacher training.",
    tags: ["Unity", "VR", "C#", "Education"],
    link: "https://youtube.com/playlist?list=PLJZJ6WMAnJ9IVBdkRz39kX3mkG9l-TUZh",
    image: work("educational-vr.webp"),
  },
  {
    title: "Interactive E-Learning Platform",
    blurb:
      "Feature-rich e-learning platform that turns textbooks into dynamic lessons — annotation tools, interactive exercises, settings.",
    tags: ["Unity", "C#", "E-Learning", "EdTech"],
    link: "https://youtu.be/R_FoSIPapGA",
    image: work("ekit-1.webp"),
  },
  {
    title: "Shuffleboard Game",
    blurb:
      "Real-time multiplayer shuffleboard built with Photon networking and PlayFab backend services.",
    tags: ["Unity", "Photon", "PlayFab", "Multiplayer"],
    link: "https://youtu.be/OoNKMp-sMic",
    image: work("shuffleboard.webp"),
  },
  {
    title: "Wordle Clone",
    blurb:
      "A take on the word-guessing classic with a global scoreboard and custom word lists.",
    tags: ["Unity", "C#", "UI/UX", "Game Design"],
    link: "https://youtu.be/sCkorws8JxU",
    image: work("wordle.webp"),
  },
  {
    title: "Stroop Color Game",
    blurb:
      "Endless runner with cognitive challenges based on the Stroop effect — testing attention and processing speed.",
    tags: ["Unity", "C#", "Game Design", "Psychology"],
    link: "https://youtu.be/HvcnIQQrvi0",
    image: work("stroop.webp"),
  },
  {
    title: "Information Runner",
    blurb:
      "Endless runner with progressive question-based gameplay — fast action meets educational challenge.",
    tags: ["Unity", "C#", "Educational", "Game Design"],
    link: "https://youtu.be/0ZXDZD2iqE0",
    image: work("info-runner.webp"),
  },
  {
    title: "Super Business Woman",
    blurb:
      "Business-simulation hyper-casual game with strategic resource management.",
    tags: ["Unity", "C#", "Mobile", "Hyper-casual"],
    link: "https://youtu.be/2D8-JHI1jEs",
    image: work("business-woman.webp"),
  },
  {
    title: "Hide & Find the Octopuses",
    blurb:
      "Discovery game where players search hidden octopuses across environments — observation and attention to detail.",
    tags: ["Unity", "C#", "Casual", "Educational"],
    link: "https://youtube.com/shorts/EFt1bdNWc-w",
    image: work("octopus-game.webp"),
  },
  {
    title: "Water Cup Challenge",
    blurb:
      "Physics-based game about transporting water without spillage — realistic fluid dynamics, escalating levels.",
    tags: ["Unity", "C#", "Physics", "Mobile"],
    link: "https://youtu.be/LZzx2CEb_tE",
    image: work("water-cup.webp"),
  },
];

export const skills = [
  { label: "Unity", image: skill("unity.webp") },
  { label: "C#", image: skill("csharp.webp") },
  { label: "VR Development", image: skill("vr.webp") },
  { label: "AI Integration", image: skill("ai.webp") },
  { label: "Git", image: skill("git.webp") },
  { label: "C++", image: skill("cpp.webp") },
  { label: "Unreal Engine", image: skill("unreal.webp") },
];
