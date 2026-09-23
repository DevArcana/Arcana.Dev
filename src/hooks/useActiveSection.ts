import { useEffect, useState } from "react";
import { navigation } from "../data/profile";
export function useActiveSection() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setScrolled(window.scrollY > 24);
      let current = "";
      for (const item of navigation) {
        const section = document.getElementById(item.id);
        if (
          section &&
          section.getBoundingClientRect().top <= window.innerHeight * 0.4
        )
          current = item.id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);
  return { active, scrolled };
}
