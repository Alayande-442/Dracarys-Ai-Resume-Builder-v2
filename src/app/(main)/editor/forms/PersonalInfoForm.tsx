import { personalInfoSchema, personalInfoValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export default function PersonalInfoForm() {
  const form = useForm<personalInfoValues>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      jobTitle: "",
      city: "",
      country: "",
      phone: "",
      email: "",
    },
  });
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div className="space-y-1.5 text-center">
        <h1 className="text-2xl font-semibold">Personal Info</h1>
        <p className="text-sm text-muted-foreground">
          Walk us through your background.
        </p>
      </div>
      {/* COMMENT form section */}

      <Form {...form}>
        <form className="space-y-3"></form>
      </Form>
    </div>
  );
}
