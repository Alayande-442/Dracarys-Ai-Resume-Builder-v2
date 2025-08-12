"use client";
import { Button } from "@/components/ui/button";
import usePremiumModal from "@/hooks/usePremiumModal";
import { PlusSquare } from "lucide-react";
import Link from "next/link";

interface CreateResumesButtonProps {
  canCreate: boolean;
}

export default function CreateResumesButton({
  canCreate,
}: CreateResumesButtonProps) {
  const premiumModal = usePremiumModal();

  if (canCreate) {
    return (
      <Button
        asChild
        className="duration-900 mx-auto flex w-fit gap-2 bg-gradient-to-r from-purple-950 to-purple-500 text-white shadow transition-colors ease-in-out hover:from-purple-500 hover:to-purple-950"
      >
        <Link href="/editor">
          <PlusSquare className="size-5" />
          New resume
        </Link>
      </Button>
    );
  }

  return (
    <Button
      onClick={() => premiumModal.setOpen(true)}
      className="mx-auto flex w-fit gap-2 bg-gradient-to-r from-purple-950 to-purple-500 text-white shadow transition-colors ease-in-out hover:from-purple-500 hover:to-purple-950"
    >
      <PlusSquare className="size-5" />
      New resume
    </Button>
  );
}
