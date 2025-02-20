import { getDocBySlug, getAllDocs } from "@/lib/mdx";
import { notFound } from "next/navigation";

interface DocPageProps {
  params: {
    slug?: string[];
  };
}

interface DocMeta {
  title?: string;
  description?: string;
  slug: string;
}

interface Doc {
  meta: DocMeta;
  content: React.ReactNode;
}

export default async function DocPage({ params }: DocPageProps) {
  const slug = params?.slug?.join("/") || "README";
  const doc = (await getDocBySlug(slug)) as Doc | null;

  if (!doc) {
    notFound();
  }

  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
        <div className="py-6 pr-6 lg:py-8">
          <div className="pb-8">
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-medium">
              Getting Started
            </h4>
            <div className="grid grid-flow-row auto-rows-max text-sm">
              <a
                href="/docs"
                className="flex w-full items-center rounded-md p-2 hover:underline bg-muted font-medium text-foreground"
              >
                Introduction
              </a>
              <a
                href="/docs/installation"
                className="flex w-full items-center rounded-md p-2 hover:underline text-muted-foreground"
              >
                Installation
              </a>
              <a
                href="/docs/architecture"
                className="flex w-full items-center rounded-md p-2 hover:underline text-muted-foreground"
              >
                Architecture
              </a>
            </div>
          </div>
          <div className="pb-8">
            <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-medium">
              Resources
            </h4>
            <div className="grid grid-flow-row auto-rows-max text-sm">
              <a
                href="/docs/components"
                className="flex w-full items-center rounded-md p-2 hover:underline text-muted-foreground"
              >
                Components
              </a>
              <a
                href="/docs/apis"
                className="flex w-full items-center rounded-md p-2 hover:underline text-muted-foreground"
              >
                APIs
              </a>
              <a
                href="/docs/examples"
                className="flex w-full items-center rounded-md p-2 hover:underline text-muted-foreground"
              >
                Examples
              </a>
            </div>
          </div>
        </div>
      </aside>
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="mx-auto w-full min-w-0">
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
            <div>{doc.content}</div>
          </article>
        </div>
      </main>
    </div>
  );
}

export async function generateStaticParams() {
  const docs = await getAllDocs();
  return docs.map((doc) => ({
    slug: doc.meta.slug.split("/"),
  }));
}
