import remarkGfm from "remark-gfm";
import Markdown from "react-markdown";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@heroui/skeleton";
import { Image } from "@heroui/image";

import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import { blogService } from "@/services/blog";

export default function BlogItemPage() {
  const { blogId } = useParams();

  const { data: blogContent, isLoading } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => blogService.getBlog(blogId!),
    enabled: !!blogId,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  return (
    <DefaultLayout>
      {isLoading ? (
        <BlogItemSkeleton />
      ) : (
        <>
          <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
            <div className="inline-block text-center justify-center">
              <h1 className={title({ color: "yellow" })}>
                {blogContent?.title}
              </h1>
            </div>
          </section>
          <Image
            alt="Blog background"
            className="object-cover rounded-xl"
            height={300}
            src={`https://picsum.photos/800`}
            width={"100%"}
          />
          <div className="w-full my-10">
            <Markdown remarkPlugins={[remarkGfm]}>
              {blogContent?.content}
            </Markdown>
          </div>
        </>
      )}
    </DefaultLayout>
  );
}

const BlogItemSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-20 w-3/4 rounded-lg self-center mb-10" />
      <Skeleton className="h-[100px] w-full rounded-lg" />
      <Skeleton className="h-[300px] w-full rounded-lg" />
      <Skeleton className="h-[200px] w-full rounded-lg" />
    </div>
  );
};
