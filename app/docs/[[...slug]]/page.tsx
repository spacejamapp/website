import { getDocBySlug } from "@/lib/mdx";
import { getDocsMeta } from "@/lib/docs";
import { notFound } from "next/navigation";
import { DocContent } from "./doc-content";
import { unstable_noStore as noStore } from "next/cache";

interface DocPageProps {
  params: {
    slug?: string[];
  };
}

export default async function DocPage({ params: rParams }: DocPageProps) {
  // Opt out of caching in development
  if (process.env.NODE_ENV === "development") {
    noStore();
  }

  // For the root /docs route, use README.md
  const params = await rParams;
  const slug = params?.slug?.length ? params.slug.join("/") : "README";
  const doc = await getDocBySlug(slug);

  if (!doc) {
    console.error(`Failed to load doc: ${slug}`);
    notFound();
  }

  return <DocContent doc={doc} />;
}

export async function generateStaticParams() {
  const docs = getDocsMeta();

  // Include the root route and all doc routes
  return [
    { slug: [] }, // Root /docs route (README.md)
    ...docs
      .filter((doc) => doc.slug !== "README") // Filter out README since it's handled by root route
      .map((doc) => ({
        slug: doc.slug.split("/"),
      })),
  ];
}

// Use static configuration values
export const dynamic = "force-static";
export const dynamicParams = false;
