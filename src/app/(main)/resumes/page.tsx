import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import { PlusSquare } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import prisma from "@/lib/prisma";
import { resumeDataInclude } from "@/lib/types";
import ResumeItem from "./ResumeItem";
export const metadata: Metadata = {
  title: "Resume page",
};
// We make this an async function to fetch data to the resume page for edit.

export default async function page() {
  const { userId } = await auth();
  if (!userId) {
    return null;
  }

  const [resumes, totalCount] = await Promise.all([
    prisma.resume.findMany({
      where: {
        userId,
      },
      orderBy: {
        updatedAt: "desc",
      },
      include: resumeDataInclude,
    }),
    prisma.resume.count({
      where: {
        userId,
      },
    }),
  ]);

  // TODO: check quota for non premium users

  // const resumes = await prisma.resume.findMany({
  //   where: {
  //     userId,
  //   },
  //   orderBy: {
  //     updatedAt: "desc",
  //   },
  //   include: resumeDataInclude,
  // });

  return (
    <main className="mx-auto w-full max-w-7xl space-y-6 px-3 py-6">
      <Button asChild className="mx-auto flex w-fit gap-2">
        <Link href="/editor">
          <PlusSquare className="size-5" />
          New resume
        </Link>
      </Button>

      <div className="space-y-1">
        <h1 className="text-3xl font-bold">Your resumes</h1>
        <p>Your total resumes: {totalCount}</p>
      </div>

      <div className="flex w-full grid-cols-2 flex-col gap-3 sm:grid md:grid-cols-3 lg:grid-cols-4">
        {resumes.map((resume) => (
          <ResumeItem key={resume.id} resume={resume} />
        ))}
      </div>
    </main>
  );
}
