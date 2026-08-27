import { notFound } from "next/navigation";
import { createMetadata } from "@/lib/site";
import { getAllTopics, getBooksByTopic, getTopic } from "@/lib/topics";
import { PageHeader } from "@/components/page-header";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BookGrid } from "@/components/book-grid";

export const dynamicParams = false;

export async function generateStaticParams() {
  const topics = await getAllTopics();
  return topics.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = await getTopic(slug);
  return createMetadata({
    title: topic ? `${topic.label} — Topic` : "Topic",
    path: `/topics/${slug}`,
    description: topic?.description ?? (topic ? `Resources tagged ${topic.label}.` : undefined),
  });
}

export default async function TopicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const topic = await getTopic(slug);
  if (!topic) notFound();

  const books = await getBooksByTopic(slug);

  return (
    <div>
      <Breadcrumbs items={[{ label: "Topics", href: "/topics" }, { label: topic.label }]} />
      <PageHeader
        eyebrow="Topic"
        title={topic.label}
        lead={
          topic.description ??
          `${books.length} ${books.length === 1 ? "resource" : "resources"} tagged “${topic.label}”.`
        }
      />
      <BookGrid books={books} />
    </div>
  );
}
