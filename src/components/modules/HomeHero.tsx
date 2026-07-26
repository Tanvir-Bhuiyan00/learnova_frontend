"use client";

import { Button } from "@/components/ui/button";
import { getCourses } from "@/services/course.services";
import { ICourse } from "@/types/course.types";
import { useQuery } from "@tanstack/react-query";
import { BookOpen, Star, User } from "lucide-react";
import Link from "next/link";

const HomeHero = () => {
  const { data } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getCourses(),
  });

  const courses: ICourse[] = (data?.data ?? []).filter(
    (c) => c.status === "PUBLISHED",
  );
  const featured = courses.slice(0, 3);

  return (
    <div>
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/10 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Learn Without Limits
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Master new skills with expert-led courses. Learn at your own pace
            and advance your career with Learnova.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/courses">
              <Button size="lg">Browse Courses</Button>
            </Link>
            <Link href="/register">
              <Button variant="outline" size="lg">
                Get Started Free
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="mb-8 text-2xl font-bold">Featured Courses</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {featured.map((course) => (
                <Link
                  key={course.id}
                  href={`/courses/${course.id}`}
                  className="group rounded-lg border p-6 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-3 flex h-36 items-center justify-center rounded-md bg-muted">
                    <BookOpen className="size-12 text-muted-foreground" />
                  </div>
                  <h3 className="mb-1 font-semibold group-hover:text-primary transition-colors line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="mb-3 text-sm text-muted-foreground line-clamp-2">
                    {course.description || ""}
                  </p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="size-3.5" />
                      {course.totalStudents}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="size-3.5 fill-yellow-400 text-yellow-400" />
                      {course.averageRating.toFixed(1)}
                    </span>
                    <span className="ml-auto font-semibold text-foreground">
                      ${course.price.toFixed(2)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="border-t bg-muted/30 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-2xl font-bold">Become an Instructor</h2>
          <p className="mx-auto mb-6 max-w-xl text-muted-foreground">
            Share your knowledge and inspire thousands of students. Start
            teaching with Learnova today.
          </p>
          <Link href="/register">
            <Button variant="outline" size="lg">
              Start Teaching
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomeHero;
