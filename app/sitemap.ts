import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/canonical";
import { postService } from "@/services/postService";

// DB'ye bağımlı olduğu için build anında değil, her istekte oluşturulmalı
// (aksi halde `next build` sırasında MONGODB_URI olmayan ortamlarda — ör. Docker — patlar)
export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = await getSiteUrl();
  const posts = await postService.getPublishedPosts();

  const postEntries: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/${post.slug}`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const staticEntries: MetadataRoute.Sitemap = [
    { url: siteUrl, changeFrequency: "daily", priority: 1 },
    { url: `${siteUrl}/live-video`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/live-text`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${siteUrl}/contact`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/privacy`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${siteUrl}/terms`, changeFrequency: "yearly", priority: 0.3 },
  ];

  return [...staticEntries, ...postEntries];
}
