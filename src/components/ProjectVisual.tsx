import { useState } from "react";
import type { Project } from "../types";
export function ProjectVisual({ project }: { project: Project }) {
  const [failedImage, setFailedImage] = useState<string>();
  const hasImage = project.image && failedImage !== project.image;
  return (
    <div className={"project-visual visual-" + project.visual}>
      {hasImage ? (
        <img
          src={project.image && (/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(project.image)
            ? project.image
            : import.meta.env.BASE_URL + project.image.replace(/^\/+/, ""))}
          alt={project.title + " 프로젝트 이미지"}
          loading="lazy"
          onError={() => setFailedImage(project.image)}
        />
      ) : (
        <div className="fallback-art" aria-hidden="true">
          {project.visual === "city" && (
            <>
              <div className="city-moon" />
              <div className="city-buildings">
                {Array.from({ length: 11 }, (_, i) => (
                  <i
                    key={i}
                    style={{
                      height: 24 + ((i * 29) % 64) + "%",
                      width: 5 + (i % 3) * 2 + "%",
                    }}
                  />
                ))}
              </div>
              <div className="city-ground" />
              <div className="magic-diamond" />
              <span className="art-caption">
                THE LAST MAGICIAN<span>AN URBAN FANTASY</span>
              </span>
            </>
          )}
          {project.visual === "orbit" && (
            <>
              <div className="utility-orbit">
                <i />
                <i />
                <i />
                <i />
                <span>
                  m<span>+</span>
                </span>
              </div>
              <span className="art-caption">PLAY. TRACK. REPEAT.</span>
            </>
          )}
          {project.visual === "blocks" && (
            <>
              <div className="block-scene">
                <i />
                <i />
                <i />
              </div>
              <span className="art-caption">A WORK IN PLAY.</span>
            </>
          )}
        </div>
      )}
      {!hasImage && <span className="concept-label">CONCEPT VISUAL</span>}
    </div>
  );
}
