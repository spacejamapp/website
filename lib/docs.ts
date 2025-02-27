import * as path from "path"
import * as fs from "fs"
import matter from "gray-matter"
import { cache } from 'react'

const docsDirectory = path.join(process.cwd(), "docs")

export interface DocMeta {
  title: string
  description?: string
  slug: string
}

export interface NavItem {
  title: string
  href: string
  items?: NavItem[]
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

// Use React cache to memoize the results
export const getDocsMeta = cache((): DocMeta[] => {
  try {
    if (!fs.existsSync(docsDirectory)) {
      console.error(`Docs directory not found: ${docsDirectory}`)
      return []
    }

    const files = fs.readdirSync(docsDirectory)
    const docs: DocMeta[] = []

    for (const file of files) {
      if (!file.endsWith(".md")) continue

      const filePath = path.join(docsDirectory, file)
      const fileContents = fs.readFileSync(filePath, "utf8")
      const { data } = matter(fileContents)
      const slug = file.replace(/\.md$/, "")

      docs.push({
        title: data.title || slug,
        description: data.description,
        slug: slug,
      })
    }

    return docs
  } catch (error) {
    console.error("Error getting docs metadata:", error)
    return []
  }
})

const SECTIONS = {
  gettingStarted: ["installation", "architecture"] as const,
  development: ["examples", "api", "best-practices"] as const,
} as const

type GettingStartedSection = typeof SECTIONS.gettingStarted[number]
type DevelopmentSection = typeof SECTIONS.development[number]
// type Section = GettingStartedSection | DevelopmentSection

// Use React cache to memoize the navigation
export const getNavigation = cache((): NavGroup[] => {
  try {
    const docs = getDocsMeta()
    
    // Sort docs by filename to ensure consistent ordering
    docs.sort((a, b) => {
      if (a.slug === "README") return -1 // README always first
      if (b.slug === "README") return 1
      return a.slug.localeCompare(b.slug)
    })

    return [
      {
        title: "Getting Started",
        items: [
          // README.md becomes the Introduction page at /docs
          {
            title: "Introduction",
            href: "/docs"
          },
          // Add other getting started pages
          ...docs
            .filter((doc): doc is DocMeta & { slug: GettingStartedSection } => 
              doc.slug !== "README" && SECTIONS.gettingStarted.includes(doc.slug as GettingStartedSection)
            )
            .map(doc => ({
              title: doc.title,
              href: `/docs/${doc.slug}`
            }))
        ]
      },
      /* {
        title: "Development",
        items: [
          // Add development related pages
          ...docs
            .filter((doc): doc is DocMeta & { slug: DevelopmentSection } =>
              doc.slug !== "README" && SECTIONS.development.includes(doc.slug as DevelopmentSection)
            )
            .map(doc => ({
              title: doc.title,
              href: `/docs/${doc.slug}`
            }))
        ]
      } */
    ]
  } catch (error) {
    console.error("Error generating navigation:", error)
    return []
  }
}) 