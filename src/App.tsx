import { MotionConfig } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Navigation } from "./components/Navigation";
import { Hero } from "./sections/Hero";
import {
  About,
  Interests,
  Projects,
  Rhythm,
  Tools,
  Connect,
} from "./sections/Content";
import { copy, profile } from "./data/profile";
export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a className="skip-link" href="#main">
        본문 바로가기
      </a>
      <Navigation />
      <main id="main">
        <Hero />
        <About />
        <Interests />
        <Projects />
        <Rhythm />
        <Tools />
        <Connect />
      </main>
      <footer className="shell footer">
        <a className="wordmark" href="#home">
          {profile.name}
          <span className="footer-dot">.</span>
        </a>
        <p>{copy.footerNote}</p>
        <span>© {new Date().getFullYear()} Arcana</span>
        <a className="back-top" href="#home">
          {copy.backToTop}
          <ArrowUp size={14} aria-hidden="true" />
        </a>
      </footer>
    </MotionConfig>
  );
}
