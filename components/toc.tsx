"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useToc } from "./toc-provider";

export function TableOfContents() {
  const { headings } = useToc();
  const [activeId, setActiveId] = useState<string>("");
  const headingElementsRef = useRef<Record<string, IntersectionObserverEntry>>(
    {}
  );

  useEffect(() => {
    const callback = (entries: IntersectionObserverEntry[]) => {
      headingElementsRef.current = entries.reduce((map, entry) => {
        map[entry.target.id] = entry;
        return map;
      }, headingElementsRef.current);

      // Get all headings that are currently visible
      const visibleHeadings: IntersectionObserverEntry[] = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const entry = headingElementsRef.current[key];
        if (entry.isIntersecting) visibleHeadings.push(entry);
      });

      if (visibleHeadings.length > 0) {
        // Get the heading that is closest to the top of the viewport
        const topHeading = visibleHeadings.reduce((prev, curr) => {
          return prev.boundingClientRect.top > curr.boundingClientRect.top
            ? curr
            : prev;
        });
        setActiveId(topHeading.target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "-100px 0px -70% 0px",
      threshold: 1.0,
    });

    const headingElements = Array.from(
      document.querySelectorAll(
        "article h1, article h2, article h3, article h4"
      )
    );
    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      <div className="font-medium text-sm">On This Page</div>
      <div className="space-y-1">
        {headings.map((heading) => {
          const level = heading.level;
          const indent =
            level === 1
              ? "pl-0"
              : level === 2
              ? "pl-4"
              : level === 3
              ? "pl-6"
              : "pl-8";

          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={cn(
                "block text-sm py-1 hover:text-foreground transition-colors",
                indent,
                activeId === heading.id
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              )}
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById(heading.id);
                if (element) {
                  const yOffset = -100; // Adjust scroll position to account for header
                  const y =
                    element.getBoundingClientRect().top +
                    window.scrollY +
                    yOffset;
                  window.scrollTo({ top: y, behavior: "smooth" });
                }
              }}
            >
              {heading.text}
            </a>
          );
        })}
      </div>
    </div>
  );
}
