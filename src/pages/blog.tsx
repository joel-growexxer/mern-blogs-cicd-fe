import { useQuery } from "@tanstack/react-query";
import { Select, SelectItem } from "@heroui/select";
import { useCallback, useState } from "react";
import { Input } from "@heroui/input";
import { debounce } from "lodash";

import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { BlogCard, BlogCardSkeleton } from "@/components/blog-card";
import { blogService } from "@/services/blog";

export default function DocsPage() {
  const [category, setCategory] = useState("");
  const [author, setAuthor] = useState("");
  const [authorInput, setAuthorInput] = useState("");

  const { data: blogs, isLoading: isBlogsLoading } = useQuery({
    queryKey: ["blogs", author, category],
    queryFn: () =>
      blogService.getBlogs({
        author: author || undefined,
        category: category || undefined,
      }),
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: () => blogService.getCategories(),
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const isLoading = isBlogsLoading || isCategoriesLoading;

  const debouncedAuthorChange = useCallback(
    debounce((value: string) => {
      setAuthor(value);
    }, 500),
    [],
  );

  const handleCategoryChange = (e: any) => {
    setCategory(e.target.value);
  };

  const handleAuthorChange = (e: any) => {
    setAuthorInput(e.target.value);
    debouncedAuthorChange(e.target.value);
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title({ color: "blue" })}>Blogs</h1>
        </div>
      </section>
      <div className="flex justify-center mb-4">
        <div className="w-2/3 flex gap-4 mb-4 justify-center">
          <Input
            label="Author"
            placeholder="Search by author"
            value={authorInput}
            onChange={handleAuthorChange}
          />
          <Select
            className="w-1/3"
            label="Categories"
            placeholder="Select categories"
            selectedKeys={[category]}
            onChange={handleCategoryChange}
          >
            {(categories ?? []).map((category: any) => (
              <SelectItem key={category.key}>{category.label}</SelectItem>
            ))}
          </Select>
        </div>
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <BlogCardSkeleton key={index} />
            ))
          : (blogs ?? []).map((blog: any, index: number) => (
              <BlogCard
                key={blog.id}
                author={blog.author}
                category={blog.category.name || blog.category}
                id={blog.id}
                image={`https://picsum.photos/id/${index + 1}/200`}
                tags={blog.tags}
                title={blog.title}
              />
            ))}
      </div>
    </DefaultLayout>
  );
}
