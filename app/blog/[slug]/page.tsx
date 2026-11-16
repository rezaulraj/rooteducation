import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "../../components/BlogArticle";
import { POSTS, findPost } from "../../components/blogPosts";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const post = findPost((await params).slug);
  if (!post) return {};
  return { title: `${post.title} | Root Education`, description: post.excerpt };
}

export default function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <main className="flex-1">
      <Suspense fallback={<div className="h-svh bg-white" />}>
        {params.then(({ slug }) => (
          <Article slug={slug} />
        ))}
      </Suspense>
    </main>
  );
}

function Article({ slug }: { slug: string }) {
  const post = findPost(slug);
  if (!post) notFound();
  // Same topic first, then the newest others, three in all.
  const others = POSTS.filter((p) => p.slug !== slug);
  const related = [
    ...others.filter((p) => p.category === post.category),
    ...others.filter((p) => p.category !== post.category),
  ].slice(0, 3);
  return <BlogArticle post={post} related={related} />;
}
