import api from "@/lib/api";

export interface Blog {
  id: string;
  _id: string;
  author: string;
  category: {
    name: string;
    _id: string;
  };
  tags: string[];
  title: string;
  content?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  _id: string;
  key: string;
  label: string;
  name: string;
}

export interface BlogsResponse {
  data: Blog[];
  total: number;
  page: number;
  limit: number;
}

export interface CategoriesResponse {
  data: Category[];
}

export const blogService = {
  // Get blogs with optional filters
  getBlogs: async (params?: {
    author?: string;
    category?: string;
    page?: number;
    limit?: number;
  }): Promise<Blog[]> => {
    const searchParams = new URLSearchParams();

    if (params?.author) searchParams.append("author", params.author);
    if (params?.category) searchParams.append("category", params.category);
    if (params?.page) searchParams.append("page", params.page.toString());
    if (params?.limit) searchParams.append("limit", params.limit.toString());

    const response = await api.get(`/blogs?${searchParams.toString()}`);

    return (response.data.data ?? []).map((blog: any) => ({
      id: blog._id,
      _id: blog._id,
      author: blog.author,
      category: blog.category,
      tags: blog.tags,
      title: blog.title,
      content: blog.content,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    }));
  },

  // Get single blog by ID
  getBlog: async (id: string): Promise<Blog> => {
    const response = await api.get(`/blogs/${id}`);

    const blog = response.data.data;

    return {
      id: blog._id,
      _id: blog._id,
      author: blog.author,
      category: blog.category,
      tags: blog.tags,
      title: blog.title,
      content: blog.content,
      createdAt: blog.createdAt,
      updatedAt: blog.updatedAt,
    };
  },

  // Get categories
  getCategories: async (): Promise<Category[]> => {
    const response = await api.get("/categories");

    return (response.data.data ?? []).map((category: any) => ({
      id: category._id,
      _id: category._id,
      key: category._id,
      label: category.name,
      name: category.name,
    }));
  },
};
