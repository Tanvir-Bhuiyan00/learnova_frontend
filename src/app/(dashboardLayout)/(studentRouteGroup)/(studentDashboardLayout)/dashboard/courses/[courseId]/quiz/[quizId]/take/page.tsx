"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Skeleton } from "@/components/ui/skeleton";
import { getQuizForTake, submitAttempt } from "@/services/quiz.services";
import { IQuizQuestion } from "@/types/quiz.types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Props { params: Promise<{ courseId: string; quizId: string }> }

interface QuizTakeData {
  title: string;
  questions: IQuizQuestion[];
}

const TakeQuizPage = ({ params }: Props) => {
  const [courseId, setCourseId] = useState("");
  const [quizId, setQuizId] = useState("");
  useEffect(() => { params.then((p) => { setCourseId(p.courseId); setQuizId(p.quizId); }); }, [params]);

  const { data, isLoading } = useQuery({
    queryKey: ["quiz-take", courseId, quizId],
    queryFn: () => getQuizForTake(courseId, quizId),
    enabled: !!courseId && !!quizId,
  });

  const quizData = data?.data as unknown as QuizTakeData | undefined;
  const questions = quizData?.questions ?? [];
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const submitMutation = useMutation({
    mutationFn: () => submitAttempt(quizId, { answers: Object.entries(answers).map(([questionId, selectedAnswer]) => ({ questionId, selectedAnswer })) }),
    onSuccess: (res) => { toast.success(res.success ? "Quiz submitted!" : "Submission failed"); },
  });

  if (isLoading) return <div className="p-6"><Skeleton className="h-48" /></div>;

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-6">
      <h1 className="text-2xl font-bold">{quizData?.title ?? "Quiz"}</h1>
      {questions.length === 0 ? (
        <Card><CardContent className="py-12 text-center text-muted-foreground">No questions available</CardContent></Card>
      ) : (
        <div className="space-y-6">
          {questions.map((q, i) => (
            <Card key={q.id}>
              <CardHeader><CardTitle className="text-base">{i + 1}. {q.question}</CardTitle></CardHeader>
              <CardContent>
                <RadioGroup value={answers[q.id] || ""} onValueChange={(v) => setAnswers({ ...answers, [q.id]: v })}>
                  {q.options.map((opt) => (
                    <div key={opt} className="flex items-center gap-2 py-1">
                      <RadioGroupItem value={opt} id={`${q.id}-${opt}`} />
                      <Label htmlFor={`${q.id}-${opt}`} className="text-sm">{opt}</Label>
                    </div>
                  ))}
                </RadioGroup>
              </CardContent>
            </Card>
          ))}
          <Button className="w-full" onClick={() => submitMutation.mutate()} disabled={submitMutation.isPending}>
            {submitMutation.isPending ? "Submitting..." : "Submit Answers"}
          </Button>
        </div>
      )}
    </div>
  );
};

export default TakeQuizPage;
