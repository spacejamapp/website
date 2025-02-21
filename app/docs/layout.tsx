import { getNavigation } from "@/lib/docs";
import { TableOfContents } from "@/components/toc";
import { TocProvider } from "@/components/toc-provider";
import { DocsNav } from "@/components/docs-nav";

interface LayoutProps {
  children: React.ReactNode;
}

export default function DocsLayout({ children }: LayoutProps) {
  const navigation = getNavigation();

  return (
    <TocProvider>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr_220px] md:gap-6 lg:grid-cols-[240px_1fr_240px] lg:gap-10">
        <DocsNav navigation={navigation} />
        <main className="relative py-6 lg:gap-10 lg:py-8 xl:pr-2">
          <div className="mx-auto w-full min-w-0">{children}</div>
        </main>
        <aside className="hidden text-sm xl:block">
          <div className="fixed top-[4rem] right-[max(0px,calc(50%-45rem))] h-[calc(100vh-4rem)] w-[240px] overflow-y-auto pt-6">
            <TableOfContents />
          </div>
        </aside>
      </div>
    </TocProvider>
  );
}

export const dynamic = "force-static";
export const dynamicParams = false;
