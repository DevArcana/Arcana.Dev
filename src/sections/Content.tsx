import {
  ArrowUpRight,
  AudioLines,
  Github,
  MessageCircle,
  Music2,
} from "lucide-react";
import { Section } from "../components/Section";
import { ProjectVisual } from "../components/ProjectVisual";
import { profile, copy } from "../data/profile";
import { interests, rhythmGames } from "../data/interests";
import { projects } from "../data/projects";
import { links } from "../data/links";
export function About() {
  return (
    <Section id="about" number="01" label={copy.aboutLabel}>
      <div className="about-layout">
        <div className="about-copy">
          <h2>
            {profile.greeting}
            <br />
            <span>{profile.greetingName}</span>
          </h2>
          {profile.about.map((text) => (
            <p key={text}>{text}</p>
          ))}
        </div>
        <div className="player-profile">
          <div className="profile-heading">
            <span>PLAYER PROFILE</span>
            <span aria-hidden="true">↗</span>
          </div>
          <div className="profile-monogram" aria-hidden="true">
            a<span>.</span>
            <i>PLAYER / 01</i>
          </div>
          <dl>
            {profile.details.map(([key, value]) => (
              <div key={key}>
                <dt>{key}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          <div className="profile-status">
            <span className="status-dot" />
            {profile.status}
          </div>
        </div>
      </div>
    </Section>
  );
}
export function Interests() {
  return (
    <Section id="interests" number="02" label={copy.interestsLabel}>
      <h2 className="display-heading whitespace-pre-line">
        {copy.interestsTitle}
      </h2>
      <div className="interests-layout">
        {interests.map((interest, index) => (
          <article className={"interest interest-" + index} key={interest.id}>
            <div className="interest-top">
              <span className="micro">{interest.subtitle}</span>
              <span className="micro">0{index + 1}</span>
            </div>
            <h3 className="whitespace-pre-line">{interest.title}</h3>
            {index === 0 && (
              <div className="mini-orbit" aria-hidden="true">
                <i />
                <span>✳</span>
              </div>
            )}
            {index === 1 && (
              <div className="code-mark" aria-hidden="true">
                &lt;/&gt;
              </div>
            )}
            {index === 2 && (
              <div className="waveform" aria-hidden="true">
                {Array.from({ length: 25 }, (_, i) => (
                  <i
                    key={i}
                    style={{
                      height: 15 + ((i * 17 + 13) % 44) + "px",
                      animationDelay: i * -0.07 + "s",
                    }}
                  />
                ))}
              </div>
            )}
            <ul>
              {interest.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </Section>
  );
}
export function Projects() {
  return (
    <Section id="projects" number="03" label={copy.projectsLabel}>
      <div className="section-heading-row">
        <h2 className="display-heading">{copy.projectsTitle}</h2>
        <p>{copy.projectsNote}</p>
      </div>
      <div className="projects-layout">
        {projects.map((project, index) => (
          <article className={"project project-" + index} key={project.slug}>
            <ProjectVisual project={project} />
            <div className="project-info">
              <div className="project-meta">
                <span>{project.category}</span>
                <span>0{index + 1}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-bottom">
                <ul className="tech-tags">
                  {project.tech.map((tech) => (
                    <li key={tech}>{tech}</li>
                  ))}
                </ul>
                <div className="project-links">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={project.title + " GitHub (새 탭)"}
                    >
                      GitHub
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={project.title + " Demo (새 탭)"}
                    >
                      Demo
                      <ArrowUpRight size={15} aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
export function Rhythm() {
  return (
    <div className="rhythm-band">
      <Section id="rhythm" number="04" label={copy.rhythmLabel}>
        <div className="rhythm-heading">
          <div className="now-playing">
            <Music2 size={18} aria-hidden="true" />
            {copy.rhythmTitle}
          </div>
          <h2>{copy.rhythmNote}</h2>
          <p>{copy.rhythmDescription}</p>
        </div>
        <div className="rhythm-list">
          {rhythmGames.map((game, index) => (
            <div key={game.name} className={"rhythm-row rhythm-" + game.style}>
              <span className="track-number">0{index + 1}</span>
              <h3>{game.name}</h3>
              <span className="track-label">{game.label}</span>
              <div className="track-wave" aria-hidden="true">
                {[12, 25, 18, 35, 22, 14, 28].map((height, i) => (
                  <i
                    key={i}
                    style={{ height, animationDelay: i * -0.11 + "s" }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="rhythm-foot micro">
          <span>FOUR GAMES. COUNTLESS GOOD MOMENTS.</span>
          <AudioLines size={20} aria-hidden="true" />
        </div>
      </Section>
    </div>
  );
}
export function Tools() {
  return (
    <section className="tools-section shell" aria-labelledby="tools-title">
      <div>
        <h2 className="micro" id="tools-title">
          {copy.toolsTitle}
        </h2>
        <p>{copy.toolsNote}</p>
      </div>
      <dl className="tools-list">
        {profile.tools.map(([language, tool]) => (
          <div key={language}>
            <dt>{language}</dt>
            <dd>{tool}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
export function Connect() {
  const icons = { github: Github, discord: MessageCircle, x: ArrowUpRight };
  return (
    <Section id="connect" number="05" label={copy.connectLabel}>
      <div className="connect-heading">
        <h2>{copy.connectTitle}</h2>
        <span aria-hidden="true">↗</span>
      </div>
      <p className="connect-description">{copy.connectNote}</p>
      <div className="connect-links">
        {links.map((link) => {
          const Icon = icons[link.icon];
          const content = (
            <>
              <Icon size={23} strokeWidth={1.5} aria-hidden="true" />
              <div>
                <span className="social-name">{link.name}</span>
                <span className="micro">{link.caption}</span>
              </div>
              {link.url ? (
                <ArrowUpRight
                  className="social-arrow"
                  size={22}
                  aria-hidden="true"
                />
              ) : (
                <span className="pending">{copy.pending}</span>
              )}
            </>
          );
          return link.url ? (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              aria-label={link.name + " (새 탭)"}
            >
              {content}
            </a>
          ) : (
            <div className="social-unavailable" key={link.name}>
              {content}
            </div>
          );
        })}
      </div>
    </Section>
  );
}
