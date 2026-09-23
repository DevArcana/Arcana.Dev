import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Github } from "lucide-react";
import { copy, profile } from "../data/profile";
import { links } from "../data/links";
export function Hero() {
  const reduced = useReducedMotion();
  const art = useRef<HTMLDivElement>(null);
  const github = links.find((link) => link.icon === "github");
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="hero shell"
      onPointerMove={(event) => {
        if (reduced || event.pointerType !== "mouse" || !art.current) return;
        const rect = event.currentTarget.getBoundingClientRect();
        art.current.style.setProperty(
          "--px",
          ((event.clientX - rect.left) / rect.width - 0.5) * 12 + "px",
        );
        art.current.style.setProperty(
          "--py",
          ((event.clientY - rect.top) / rect.height - 0.5) * 12 + "px",
        );
      }}
      onPointerLeave={() => {
        art.current?.style.setProperty("--px", "0px");
        art.current?.style.setProperty("--py", "0px");
      }}
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="hero-content"
      >
        <div className="eyebrow">
          <span className="status-dot" />
          {copy.heroLabel}
          <span className="hero-edition">EST. A WORK IN PROGRESS</span>
        </div>
        <h1 id="hero-title">
          {profile.name}
          <span className="title-period">.</span>
        </h1>
        <p className="hero-subtitle">{profile.subtitle}</p>
        <div className="hero-bottom-content">
          <div>
            <p className="hero-intro">
              {profile.intro.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <p className="hero-note">{copy.heroNote}</p>
          </div>
          <div className="hero-actions">
            <a href="#about" className="primary-button">
              {copy.explore}
              <ArrowDown size={17} aria-hidden="true" />
            </a>
            {github?.url ? (
              <a
                className="secondary-button"
                href={github.url}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={16} aria-hidden="true" />
                GitHub
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            ) : (
              <a className="secondary-button" href="#connect">
                <Github size={16} aria-hidden="true" />
                GitHub
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
      <div className="hero-art" ref={art} aria-hidden="true">
        <div className="orbit-art">
          <div className="orbit-ring ring-outer" />
          <div className="orbit-ring ring-middle" />
          <div className="orbit-ring ring-inner" />
          <div className="orbit-cross x" />
          <div className="orbit-cross y" />
          <div className="orbit-core">
            a<span>✳</span>
          </div>
          <div className="orbit-note note-one" />
          <div className="orbit-note note-two" />
          <div className="orbit-note note-three" />
          <span className="orbit-label">IN MY OWN RHYTHM</span>
        </div>
        <span className="art-coordinate">CODE / PLAY / REPEAT</span>
      </div>
      <div className="hero-footer">
        <a href="#about">
          <ArrowDown size={13} aria-hidden="true" />
          {copy.scroll}
        </a>
        <span>
          <span className="status-dot" />
          {profile.status}
        </span>
        <span className="hero-index">00 — 05</span>
      </div>
    </section>
  );
}
