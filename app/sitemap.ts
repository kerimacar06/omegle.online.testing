import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/canonical";
import { postService } from "@/services/postService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await postService.getPublishedPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const staticEntries: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
    { url: `${SITE_URL}/live-video`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/live-text`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/contact`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  return [...staticEntries, ...postEntries];
}
