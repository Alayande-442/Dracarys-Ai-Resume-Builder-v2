"use client";

// import GeneralInfoForm from "./forms/GeneralInfoForm";
import PersonalInfoForm from "./forms/PersonalInfoForm";
import { useSearchParams } from "next/navigation";
import { steps } from "./steps";
import Breadcrumbs from "./Breadcrumbs";
import Footer from "./Footer";
import { useState } from "react";
import { resumeValues } from "@/lib/validation";
import ResumePreviewSection from "./ResumePreviewSection";
import { cn } from "@/lib/utils";
import useUnloadWarning from "@/hooks/useUnloadWarning";
import useAutoSaveResume from "./useAutoSaveResume";

export default function ResumeEditor() {
  const searchParams = useSearchParams();

  // this part is used to store resume data / input in this editor component
  const [resumeData, setResumeData] = useState<resumeValues>({});
  // COMMENT the resumeValues contains all the resume data from the validation data

  // COMMENT to toggle btw then form section and the preview section on small screen
  const [showSmResumePreview, setShowSmResumePreview] = useState(false);

  // COMMENT Auo save hook
  const { isSaving, hasUnsavedChanges } = useAutoSaveResume(resumeData);
  useUnloadWarning(hasUnsavedChanges);

  const currentStep = searchParams.get("step") || steps[0].key;
  function setStep(key: string) {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("step", key);
    window.history.pushState(null, "", `?${newSearchParams.toString()}`);
  }

  const FormComponent = steps.find(
    (step) => step.key === currentStep,
  )?.component;

  return (
    <div className="flex min-h-screen flex-col">
      <header className="space-y-1.5 border-b px-3 py-5 text-center">
        <h1 className="text-2xl font-bold">Customize your resume here</h1>
        <p className="text-sm text-muted-foreground">
          Complete the steps below to build your resume. Your progress saves
          automatically.
        </p>
      </header>
      <main className="relative h-full flex-grow">
        <div className="absolute bottom-0 top-0 flex w-full">
          {/* content */}
          <div
            className={cn(
              "w-full space-y-6 overflow-y-auto p-3 md:block md:w-1/2",
              showSmResumePreview && "hidden",
            )}
          >
            {/* COMMENT for the > svg */}
            <Breadcrumbs currentStep={currentStep} setCurrentStep={setStep} />
            {/* COMMENT for the form */}
            {FormComponent && (
              <FormComponent
                resumeData={resumeData}
                setResumeData={setResumeData}
              />
            )}
          </div>
          <div className="grow md:border-r" />
          <ResumePreviewSection
            resumeData={resumeData}
            setResumeData={setResumeData}
            className={cn(showSmResumePreview && "flex")}
          />
        </div>
      </main>
      <Footer
        currentStep={currentStep}
        setCurrentStep={setStep}
        showSmResumePreview={showSmResumePreview}
        setShowSmResumePreview={setShowSmResumePreview}
        isSaving={isSaving}
      />
    </div>
  );
}
