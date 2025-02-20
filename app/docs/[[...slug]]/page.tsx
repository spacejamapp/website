import { getDocBySlug } from "@/lib/mdx";
import { getDocsMeta } from "@/lib/docs";
import { notFound } from "next/navigation";

interface DocPageProps {
  params: {
    slug?: string[];
  };
}

export default async function DocPage({ params }: DocPageProps) {
  // For the root /docs route, use README.md
  const slug = params?.slug?.length ? params.slug.join("/") : "README";
  const doc = await getDocBySlug(slug);

  if (!doc) {
    console.error(`Failed to load doc: ${slug}`);
    notFound();
  }

  return (
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
      <div className="mdx">{doc.content}</div>
    </article>
  );
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

// Force static generation
export const dynamic = "force-static";
export const dynamicParams = false;
