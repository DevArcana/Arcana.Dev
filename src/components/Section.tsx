import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
export function Section({
  id,
  number,
  label,
  children,
  className = "",
}: {
  id: string;
  number: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <section
      id={id}
      aria-labelledby={id + "-label"}
      className={"section shell " + className}
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.45 }}
      >
        <div className="section-label" id={id + "-label"}>
          <span>{number}</span>
          <span>/</span>
          {label}
          <span className="label-rule" />
        </div>
        {children}
      </motion.div>
    </section>
  );
}
