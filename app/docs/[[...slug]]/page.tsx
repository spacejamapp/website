import { getDocBySlug } from "@/lib/mdx";
import { getDocsMeta } from "@/lib/docs";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx-content";

interface DocPageProps {
  params: {
    slug?: string[];
  };
}

interface CodeBlockProps {
  children?: string;
  className?: string;
}

interface PreProps {
  children: React.ReactElement<CodeBlockProps>;
  [key: string]: any;
}

const components = {
  pre: ({ children, ...props }: PreProps) => {
    const code = children?.props?.children;
    const className = children?.props?.className || "";

    // Regular code block
    return <pre {...props}>{children}</pre>;
  },
};

export default async function DocPage({ params }: DocPageProps) {
  // For the root /docs route, use README.md
  const slug = params?.slug?.length ? params.slug.join("/") : "README";
  const doc = await getDocBySlug(slug);

  if (!doc) {
    console.error(`Failed to load doc: ${slug}`);
    notFound();
  }

  return (
    <MdxContent>
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
    </MdxContent>
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
