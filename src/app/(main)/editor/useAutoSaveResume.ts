import useDebounce from "@/hooks/useDebounce";
import { resumeValues } from "@/lib/validation";
import { useEffect, useRef, useState } from "react";

const clone = (obj: any) =>
  typeof structuredClone === "function"
    ? structuredClone(obj)
    : JSON.parse(JSON.stringify(obj));

export default function useAutoSaveResume(resumeData: resumeValues) {
  const debouncedResumeData = useDebounce(resumeData, 1500);

  const [lastSavedData, setLastSavedData] = useState(clone(resumeData));
  const [isSaving, setIsSaving] = useState(false);
  const isSavingRef = useRef(false);

  useEffect(() => {
    const save = async () => {
      isSavingRef.current = true;
      setIsSaving(true);

      await new Promise((resolve) => setTimeout(resolve, 1000));
      setLastSavedData(clone(debouncedResumeData));
      setIsSaving(false);
      isSavingRef.current = false;
    };

    const hasUnsavedChanges =
      JSON.stringify(debouncedResumeData) !== JSON.stringify(lastSavedData);

    if (hasUnsavedChanges && debouncedResumeData && !isSavingRef.current) {
      save();
    }
  }, [debouncedResumeData, lastSavedData]);

  return {
    isSaving,
    hasUnsavedChanges:
      JSON.stringify(resumeData) !== JSON.stringify(lastSavedData),
  };
}
