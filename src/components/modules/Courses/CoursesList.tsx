"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pagination } from "@/components/ui/pagination";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { getCategories } from "@/services/category.services";
import { getCourses } from "@/services/course.services";
import { ICategory } from "@/types/category.types";
import { ICourse } from "@/types/course.types";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Search, Star, User } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const PAGE_SIZE = 6;

const levelLabels: Record<string, string> = {
  BEGINNER: "Beginner", INTERMEDIATE: "Intermediate",
  ADVANCED: "Advanced", ALL_LEVELS: "All Levels",
};

const CoursesList = () => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [categoryId, setCategoryId] = useState("all");
  const [level, setLevel] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setSearch(q);
  }, [searchParams]);

  const { data: coursesData, isLoading: coursesLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getCourses(),
  });

  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategories(),
  });

  const courses: ICourse[] = coursesData?.data ?? [];
  const categories: ICategory[] = categoriesData?.data ?? [];

  const filtered = courses.filter((c) => {
    if (c.status !== "PUBLISHED") return false;
    if (search && !c.title.toLowerCase().includes(search.toLowerCase())) return false;
    if (categoryId && categoryId !== "all" && c.categoryId !== categoryId) return false;
    if (level && level !== "all" && c.level !== level) return false;
    return true;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => { setPage(1); }, [search, categoryId, level]);

  if (coursesLoading) {
    return <div className="container mx-auto px-4 py-8"><p className="text-muted-foreground">Loading courses...</p></div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Explore Courses</h1>
        <p className="text-muted-foreground">Discover courses from expert instructors</p>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search courses..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>

        <Select value={categoryId} onValueChange={(v) => v && setCategoryId(v)}>
          <SelectTrigger className="w-[180px]"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => <SelectItem key={cat.id} value={cat.id}>{cat.title}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select value={level} onValueChange={(v) => v && setLevel(v)}>
          <SelectTrigger className="w-[160px]"><SelectValue placeholder="Level" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Levels</SelectItem>
            <SelectItem value="BEGINNER">Beginner</SelectItem>
            <SelectItem value="INTERMEDIATE">Intermediate</SelectItem>
            <SelectItem value="ADVANCED">Advanced</SelectItem>
            <SelectItem value="ALL_LEVELS">All Levels</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-lg border border-dashed p-12 text-center">
          <BookOpen className="mx-auto mb-4 size-12 text-muted-foreground" />
          <p className="text-lg font-medium">No courses found</p>
          <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {paged.map((course) => (
            <Link key={course.id} href={`/courses/${course.id}`}>
              <div className="group rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-3 flex h-36 items-center justify-center overflow-hidden rounded-md bg-muted">
                  {course.thumbnail ? <img src={course.thumbnail} alt={course.title} className="size-full object-cover" /> : <BookOpen className="size-12 text-muted-foreground" />}
                </div>
                <Badge variant="secondary" className="mb-2">{levelLabels[course.level] || course.level}</Badge>
                <h3 className="mb-1 font-semibold group-hover:text-primary transition-colors line-clamp-2">{course.title}</h3>
                <p className="mb-3 text-sm text-muted-foreground line-clamp-2">{course.description || "No description available"}</p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><User className="size-3.5" />{course.totalStudents}</span>
                  <span className="flex items-center gap-1"><Star className="size-3.5 fill-yellow-400 text-yellow-400" />{course.averageRating.toFixed(1)}</span>
                  <span className="ml-auto font-semibold text-foreground">${course.price.toFixed(2)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
    </div>
  );
};

export default CoursesList;
