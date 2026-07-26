"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { getModulesByCourse } from "@/services/course.services";
import { IModule } from "@/types/course.types";
import { useQuery } from "@tanstack/react-query";
import { BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

interface Props { params: Promise<{ courseId: string }> }

const CourseCurriculumPage = ({ params }: Props) => {
  const [courseId, setCourseId] = useState("");
  useEffect(() => { params.then((p) => setCourseId(p.courseId)); }, [params]);

  const { data, isLoading } = useQuery({
    queryKey: ["course-modules", courseId],
    queryFn: () => getModulesByCourse(courseId),
    enabled: !!courseId,
  });

  const modules: IModule[] = data?.data ?? [];

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Course Curriculum</h1>
      {isLoading ? (
        <div className="space-y-3"><Skeleton className="h-16 w-full" /><Skeleton className="h-16 w-full" /></div>
      ) : modules.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center py-12">
            <BookOpen className="mb-4 size-12 text-muted-foreground" />
            <p className="text-lg font-medium">No modules yet</p>
            <p className="text-sm text-muted-foreground">Add modules to build your course curriculum.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {modules.map((mod) => (
            <Card key={mod.id}>
              <CardHeader>
                <CardTitle className="text-base">Module {mod.order}: {mod.title}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseCurriculumPage;
