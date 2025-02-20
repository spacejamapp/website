"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const sidebarNavItems = [
  {
    title: "Getting Started",
    items: [
      {
        title: "Introduction",
        href: "/docs",
      },
      {
        title: "Installation",
        href: "/docs/installation",
      },
      {
        title: "Architecture",
        href: "/docs/architecture",
      },
    ],
  },
  {
    title: "Resources",
    items: [
      {
        title: "Components",
        href: "/docs/components",
      },
      {
        title: "APIs",
        href: "/docs/apis",
      },
      {
        title: "Examples",
        href: "/docs/examples",
      },
    ],
  },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
      <aside className="fixed top-14 z-30 -ml-2 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
        <div className="py-6 pr-6 lg:py-8">
          {sidebarNavItems.map((group, index) => (
            <div key={index} className="pb-8">
              <h4 className="mb-1 rounded-md px-2 py-1 text-sm font-medium">
                {group.title}
              </h4>
              <div className="grid grid-flow-row auto-rows-max text-sm">
                {group.items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className={cn(
                      "flex w-full items-center rounded-md p-2 hover:underline",
                      pathname === item.href
                        ? "bg-muted font-medium text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>
      <main className="relative py-6 lg:gap-10 lg:py-8 xl:grid xl:grid-cols-[1fr_300px]">
        <div className="mx-auto w-full min-w-0">
          <div className="pb-12 pt-8">{children}</div>
        </div>
      </main>
    </div>
  );
}
