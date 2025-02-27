import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t bg-background mt-auto">
      <div className="container mx-auto flex flex-col items-center justify-between space-y-4 py-6 md:flex-row md:py-8">
        <div className="flex flex-col items-center gap-4 md:flex-row">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <span className="text-xl font-bold">SpaceJam</span>
          </Link>
          <nav className="flex gap-4 text-sm text-muted-foreground md:gap-6"></nav>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="https://github.com/spacejam-network"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SpaceJam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
