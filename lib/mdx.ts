import * as path from "path";
import * as fs from "fs";
import { compileMDX } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { DocMeta } from "./docs";
import { cache } from "react";
// import type { JSX } from "react";
import { components } from "@/components/mdx-components";

// Import additional languages for highlighting
import bash from "highlight.js/lib/languages/bash";
import rust from "highlight.js/lib/languages/rust";
import typescript from "highlight.js/lib/languages/typescript";
import javascript from "highlight.js/lib/languages/javascript";

const rootDirectory = path.join(process.cwd(), "docs");

interface Doc {
  meta: DocMeta;
  content: React.ReactNode;
}

/* interface PreProps {
  children: JSX.Element & {
    props: {
      children: string;
      className?: string;
    };
  };
} */

// Use React cache to memoize the results
export const getDocBySlug = cache(async (slug: string): Promise<Doc | null> => {
  try {
    // Clean the slug and ensure it ends with .md
    const realSlug = slug.replace(/\.mdx?$/, "");
    const filePath = path.join(rootDirectory, `${realSlug}.md`);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);
      return null;
    }

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    const { content: compiledContent } = await compileMDX({
      source: content,
      components,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          format: "mdx",
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            [
              rehypeHighlight,
              {
                detect: true,
                ignoreMissing: true,
                languages: {
                  bash,
                  rust,
                  typescript,
                  javascript,
                },
              },
            ],
          ],
        },
      },
    });

    return {
      meta: {
        title: data.title || realSlug,
        description: data.description,
        slug: realSlug,
      },
      content: compiledContent,
    };
  } catch (error) {
    console.error(`Error processing doc ${slug}:`, error);
    return null;
  }
});

// Use React cache to memoize the results
export const getAllDocs = cache(async () => {
  try {
    const files = fs.readdirSync(rootDirectory);
    const docs = [];

    for (const file of files) {
      if (!file.endsWith(".md")) continue;
      const doc = await getDocBySlug(file.replace(/\.md$/, ""));
      if (doc) docs.push(doc);
    }

    return docs;
  } catch (error) {
    console.error("Error getting all docs:", error);
    return [];
  }
});
