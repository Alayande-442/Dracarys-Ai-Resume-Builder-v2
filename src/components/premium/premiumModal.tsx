"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Check } from "lucide-react";
import { Button } from "../ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { createCheckoutSession } from "./actions";
import { env } from "@/env";

const premiumFeatures = ["Ai tools", "Up to 3 resume for download"];
const premiumPlusFeatures = ["Infinite resume", "Custom design"];

export default function PremiumModal() {
  const { open, setOpen } = usePremiumModal();

  const { toast } = useToast();
  const [loading, setIsLoading] = useState(false);

  async function handlePremiumClick(priceId: string) {
    try {
      setIsLoading(true);
      const redirectUrl = await createCheckoutSession(priceId);
      window.location.href = redirectUrl;
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create checkout session",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        if (!loading) {
          setOpen(open);
        }
      }}
    >
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Dracarys AI Resume Builder premium</DialogTitle>
        </DialogHeader>
        <p className="space-y-6">
          Upgrade to premium to unlock advanced features.
        </p>

        <div className="flex">
          <div className="flex w-1/2 flex-col space-y-5">
            <h3 className="text-center text-lg font-bold">premium</h3>
            <ul className="list-inside space-y-2">
              {premiumFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-purple-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              onClick={() =>
                handlePremiumClick(env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_MONTHLY)
              }
              disabled={loading}
            >
              Get premium
            </Button>
          </div>
          <div className="border-1 mx-6" />
          <div className="flex w-1/2 flex-col space-y-5">
            <h3 className="bg-gradient-to-r from-purple-950 to-purple-500 bg-clip-text text-center text-lg font-bold text-transparent">
              premium plus
            </h3>
            <ul className="list-inside space-y-2">
              {premiumPlusFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-purple-500" />
                  {feature}
                </li>
              ))}
            </ul>
            <Button
              variant="premium"
              onClick={() =>
                handlePremiumClick(
                  env.NEXT_PUBLIC_STRIPE_PRICE_ID_PRO_PLUS_MONTHLY,
                )
              }
              disabled={loading}
            >
              Get premium plus
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
