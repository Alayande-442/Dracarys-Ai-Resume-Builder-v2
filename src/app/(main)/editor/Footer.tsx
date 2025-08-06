import { Button } from "@/components/ui/button";
import Link from "next/link";
import { steps } from "./steps";
import { FileUpIcon, PenLineIcon } from "lucide-react";

// COMMENT counting steps for the previous and next buttons
interface FooterProps {
  currentStep: string;
  setCurrentStep: (step: string) => void;
  showSmResumePreview: boolean;
  setShowSmResumePreview: (show: boolean) => void;
}

export default function Footer({
  currentStep,
  setCurrentStep,
  showSmResumePreview,
  setShowSmResumePreview,
}: FooterProps) {
  const previousStep = steps.find(
    (_, index) => steps[index + 1]?.key === currentStep,
  );
  const nextStep = steps.find(
    (_, index) => steps[index - 1]?.key === currentStep,
  );

  return (
    <footer className="w-full border-t px-3 py-5 text-center">
      <div className="mx-auto flex max-w-7xl flex-wrap justify-between gap-2">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={
              previousStep ? () => setCurrentStep(previousStep.key) : undefined
            }
            disabled={!previousStep}
          >
            Previous step
          </Button>
          <Button
            onClick={nextStep ? () => setCurrentStep(nextStep.key) : undefined}
            disabled={!nextStep}
          >
            Next step
          </Button>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          title={
            showSmResumePreview ? "show input form" : "show resume preview"
          }
          onClick={() => setShowSmResumePreview(!showSmResumePreview)}
        >
          {showSmResumePreview ? <PenLineIcon /> : <FileUpIcon />}
        </Button>

        <div className="flex items-center gap-3">
          <Button variant="secondary" asChild>
            <Link href="/resumes">Close</Link>
          </Button>
          <p className="text-muted-foreground opacity-0">saving...</p>
        </div>
      </div>
    </footer>
  );
}
