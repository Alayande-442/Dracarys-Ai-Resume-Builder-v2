import { useToast } from "@/hooks/use-toast";
import useDebounce from "@/hooks/useDebounce";
import { resumeValues } from "@/lib/validation";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { saveResume } from "./actions";
import { Button } from "@/components/ui/button";

export default function useAutoSaveResume(resumeData: resumeValues) {
  const searchParams = useSearchParams();

  const { toast } = useToast();
  const debouncedResumeData = useDebounce(resumeData, 1500);

  const [resumeId, setResumeId] = useState(resumeData.id);

  const [lastSavedData, setLastSavedData] = useState(
    structuredClone(resumeData),
  );

  const [isSaving, setIsSaving] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
  }, [debouncedResumeData]);

  useEffect(() => {
    async function save() {
      try {
        setIsSaving(true);
        setIsError(false);

        const newData = structuredClone(debouncedResumeData);
        const updatedResume = await saveResume({
          ...newData,
          ...(lastSavedData.photo?.toString() === newData.photo?.toString() && {
            photo: undefined,
          }),
          id: resumeId,
        });
        setResumeId(updatedResume.id);
        setLastSavedData(newData);

        if (searchParams.get("resumeId") === updatedResume.id) {
          const newSearchParams = new URLSearchParams(searchParams);
          newSearchParams.set("resumeId", updatedResume.id);
          window.history.replaceState(
            null,
            "",
            `?${newSearchParams.toString()}`,
          );
        }
      } catch (error) {
        setIsError(true);
        console.error(error);
        const { dismiss } = toast({
          variant: "destructive",
          title: "Error",
          description: (
            <div className="space-y-3">
              <p>could not save changes</p>

              <Button
                onClick={() => {
                  dismiss();
                  save();
                }}
              >
                try again
              </Button>
            </div>
          ),
        });
      } finally {
        setIsSaving(false);
      }
    }

    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData) !== JSON.stringify(lastSavedData);
    if (hasUnsavedChanges && debouncedResumeData && !isSaving && !isError) {
      save();
    }
  }, [
    debouncedResumeData,
    lastSavedData,
    isSaving,
    isError,
    toast,
    searchParams,
    resumeId,
  ]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData) !== JSON.stringify(lastSavedData),
  };
}
