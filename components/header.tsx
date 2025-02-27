"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "@/components/theme-toggle";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram, faGithub } from "@fortawesome/free-brands-svg-icons";
import { SeparatorVertical } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">SpaceJam</span>
          </Link>
        </div>
        <nav className="flex items-center space-x-6 text-sm font-medium flex-1">
          <Link
            href="/stf"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname?.startsWith("/stf")
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            STF
          </Link>
          <Link
            href="/jamnp"
            className={cn(
              "transition-colors hover:text-foreground/80",
              pathname?.startsWith("/jamnp")
                ? "text-foreground"
                : "text-foreground/60"
            )}
          >
            JAMNP
          </Link>
        </nav>
        <div className="flex items-center justify-end space-x-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
