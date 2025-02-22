"use client";

import { useEffect, useRef } from "react";
import { useToc } from "@/components/toc-provider";
import { type DocMeta } from "@/lib/docs";

interface DocContentProps {
  doc: {
    meta: DocMeta;
    content: React.ReactNode;
  };
}

export function DocContent({ doc }: DocContentProps) {
  const { setHeadings } = useToc();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Extract headings from the content after mount
    const headings: { id: string; text: string; level: number }[] = [];

    // Only look for headings within the main content area
    if (contentRef.current) {
      const headingElements = contentRef.current.querySelectorAll(
        "article h1, article h2, article h3, article h4"
      );

      headingElements.forEach((element) => {
        const level = parseInt(element.tagName.charAt(1));
        const text = element.textContent || "";
        const id = element.id || text.toLowerCase().replace(/[^a-z0-9]+/g, "-");

        // Set the ID on the element if it doesn't have one
        if (!element.id) {
          element.id = id;
        }

        headings.push({ id, text, level });
      });

      setHeadings(headings);
    }

    // Cleanup
    return () => setHeadings([]);
  }, [setHeadings, doc]);

  return (
    <div className="flex-1" ref={contentRef}>
      <article className="prose prose-neutral dark:prose-invert max-w-none">
        {doc.meta.title && (
          <h1 className="mb-4 scroll-m-20 text-4xl font-bold tracking-tight">
            {doc.meta.title}
          </h1>
        )}
        {doc.meta.description && (
          <p className="mb-8 text-xl text-muted-foreground">
            {doc.meta.description}
          </p>
        )}
        {doc.content}
      </article>
    </div>
  );
}
