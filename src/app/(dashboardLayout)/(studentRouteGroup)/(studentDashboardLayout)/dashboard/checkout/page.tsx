"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { checkout } from "@/services/enrollment.services";
import { useMutation } from "@tanstack/react-query";
import { CreditCard } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const CheckoutPage = () => {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: () => checkout(),
    onSuccess: (res) => {
      if (res.success) { toast.success("Checkout successful!"); router.push("/dashboard/my-learning"); }
      else { toast.error(res.message || "Checkout failed"); }
    },
  });

  return (
    <div className="mx-auto max-w-lg space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Checkout</h1>
        <p className="text-sm text-muted-foreground">Review and confirm your purchase</p>
      </div>
      <Card>
        <CardHeader><CardTitle>Order Summary</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">You are about to enroll in the selected courses.</p>
          <Button className="w-full" onClick={() => mutation.mutate()} disabled={mutation.isPending}>
            {mutation.isPending ? "Processing..." : "Pay Now"}
            <CreditCard className="ml-2 size-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPage;
