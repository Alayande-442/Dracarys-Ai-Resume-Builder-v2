// COMMENT this is used to create a prop type for the editor form
import { resumeValues } from "./validation";

export interface EditorFormProps {
  resumeData: resumeValues;
  setResumeData: (data: resumeValues) => void;
}
