import { SignIn } from "@clerk/nextjs";

export default function page() {
  return (
    <main className="flex min-h-screen items-center justify-center p-3">
      <SignIn />
    </main>
  );
}
