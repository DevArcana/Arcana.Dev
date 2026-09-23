import { useEffect, useRef, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { navigation, profile } from "../data/profile";
import { useActiveSection } from "../hooks/useActiveSection";
export function Navigation() {
  const { active, scrolled } = useActiveSection();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    const media = window.matchMedia("(min-width: 768px)");
    const resize = () => {
      if (media.matches) setOpen(false);
    };
    window.addEventListener("keydown", close);
    window.addEventListener("pointerdown", outside);
    media.addEventListener("change", resize);
    return () => {
      window.removeEventListener("keydown", close);
      window.removeEventListener("pointerdown", outside);
      media.removeEventListener("change", resize);
    };
  }, [open]);
  return (
    <header
      ref={header}
      className={"site-header " + (scrolled || open ? "scrolled" : "")}
    >
      <div className="shell nav-inner">
        <a
          className="wordmark"
          href="#home"
          aria-label="Arcana 홈"
          onClick={() => setOpen(false)}
        >
          <span className="brand-symbol" aria-hidden="true">
            a.
          </span>
          {profile.name}
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          id="main-navigation"
          aria-label="주 메뉴"
          className={open ? "nav-links is-open" : "nav-links"}
        >
          {navigation.map((item) => (
            <a
              key={item.id}
              href={"#" + item.id}
              aria-current={active === item.id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
              {item.id === "connect" && (
                <ArrowUpRight size={13} aria-hidden="true" />
              )}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
