import path from "path"
import fs from "fs"
import { compileMDX } from "next-mdx-remote/rsc"
import matter from "gray-matter"
import rehypePrettyCode from "rehype-pretty-code"

const rootDirectory = path.join(process.cwd(), "docs")

export async function getDocBySlug(slug: string) {
  const realSlug = slug.replace(/\.mdx$/, "")
  const filePath = path.join(rootDirectory, `${realSlug}.md`)

  try {
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)

    const { content: compiledContent } = await compileMDX({
      source: content,
      options: {
        parseFrontmatter: true,
        mdxOptions: {
          rehypePlugins: [
            [rehypePrettyCode as any, {
              theme: "github-dark",
              keepBackground: true,
            }],
          ],
        },
      },
    })

    return {
      meta: {
        ...data,
        slug: realSlug,
      },
      content: compiledContent,
    }
  } catch (error) {
    console.error(`Error reading file ${filePath}:`, error)
    return null
  }
}

export async function getAllDocs() {
  const files = fs.readdirSync(rootDirectory)
  const docs = []

  for (const file of files) {
    if (!file.endsWith(".md")) continue
    const doc = await getDocBySlug(file.replace(/\.md$/, ""))
    if (doc) docs.push(doc)
  }

  return docs
} 