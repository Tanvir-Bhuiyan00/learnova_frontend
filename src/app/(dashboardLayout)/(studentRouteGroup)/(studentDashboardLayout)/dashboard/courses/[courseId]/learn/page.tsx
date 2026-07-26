"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getCourseById, getModulesByCourse } from "@/services/course.services";
import { IModule } from "@/types/course.types";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, BookOpen, FileText } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props { params: Promise<{ courseId: string }> }

const CourseLearnPage = ({ params }: Props) => {
  const [courseId, setCourseId] = useState("");
  useEffect(() => { params.then((p) => setCourseId(p.courseId)); }, [params]);

  const { data: courseData, isLoading: courseLoading } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => getCourseById(courseId),
    enabled: !!courseId,
  });

  const { data: modulesData, isLoading: modulesLoading } = useQuery({
    queryKey: ["course-modules", courseId],
    queryFn: () => getModulesByCourse(courseId),
    enabled: !!courseId,
  });

  const modules: IModule[] = modulesData?.data ?? [];
  const title = courseData?.data?.title ?? "Course";

  return (
    <div className="space-y-6 p-6">
      <Link href="/dashboard/my-learning" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="mr-1 size-4" /> Back to My Learning
      </Link>
      {courseLoading ? <Skeleton className="h-8 w-48" /> : <h1 className="text-2xl font-bold">{title}</h1>}
      {modulesLoading ? (
        <div className="space-y-3"><Skeleton className="h-24 w-full" /><Skeleton className="h-24 w-full" /></div>
      ) : modules.length === 0 ? (
        <Card><CardContent className="flex flex-col items-center py-12">
          <BookOpen className="mb-4 size-12 text-muted-foreground" />
          <p className="text-lg font-medium">No content yet</p>
        </CardContent></Card>
      ) : (
        <div className="space-y-4">
          {modules.map((mod) => (
            <Card key={mod.id}>
              <CardHeader>
                <CardTitle className="text-base">Module {mod.order}: {mod.title}</CardTitle>
                {mod.description && <p className="text-sm text-muted-foreground">{mod.description}</p>}
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="size-4" />
                  <span>Lessons available in this module</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseLearnPage;
