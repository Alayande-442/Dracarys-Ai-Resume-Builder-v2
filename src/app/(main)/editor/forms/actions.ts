"use server";

import openai from "@/lib/openai";
import { canUseAITools } from "@/lib/permissions";
import { getUserSubscriptionLevel } from "@/lib/subscriptions";
import {
  GenerateSummaryInput,
  generateSummarySchema,
  GenerateWorkExperienceInput,
  generateWorkExperienceSchema,
} from "@/lib/validation";
import { auth } from "@clerk/nextjs/server";
import { WorkExperience } from "@prisma/client";
export async function generateSummary(input: GenerateSummaryInput) {
  // TODO: only available to premium users
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!canUseAITools(subscriptionLevel, 1)) {
    throw new Error("Upgrade to a premium plan to use AI tools");
  }

  const { jobTitle, workExperiences, educations, skills } =
    generateSummarySchema.parse(input);

  const systemMessage = `
    You are a professional resume-writing assistant specializing in crafting compelling introduction summaries for job seekers. 
    Your role is to generate a clear, concise, and tailored professional summary based on the user’s input data, which may include skills, experience, achievements, and career goals.
    
    Output only the finalized summary — do not include headings, instructions, or any other text. The tone should be confident, polished, and suitable for inclusion at the top of a modern resume.
    `;

  const userMessage = `
    Based on the following information, write a professional resume summary suitable for the top section of a modern CV. Focus on clarity, impact, and relevance to potential employers. The summary should highlight key strengths, experience, and value the individual brings — all in a concise and polished tone:

     Job title: ${jobTitle || "N/A"}

    Work experience:
    ${workExperiences
      ?.map(
        (exp) => `
        Position: ${exp.position || "N/A"} at ${exp.company || "N/A"} from ${exp.startDate || "N/A"} to ${exp.endDate || "Present"}

        Description:
        ${exp.description || "N/A"}
        `,
      )
      .join("\n\n")}

      Education:
    ${educations
      ?.map(
        (edu) => `
        Degree: ${edu.degree || "N/A"} at ${edu.school || "N/A"} from ${edu.startDate || "N/A"} to ${edu.endDate || "N/A"}
        `,
      )
      .join("\n\n")}

      Skills:
      ${skills}
    `;

  console.log("systemMessage", systemMessage);
  console.log("userMessage", userMessage);

  //   COMMENT here we call the openai APi and pass the system and user message
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  //   COMMENT getting the aiResponse from the completion

  const aiResponse = completion.choices[0].message.content;

  if (!aiResponse) {
    throw new Error("AI failed to generate a summary");
  }

  return aiResponse;
}

// COMMENT generate work experience
export async function generateWorkExperience(
  input: GenerateWorkExperienceInput,
) {
  // TODO: to block non premium users
  const { userId } = await auth();

  if (!userId) {
    throw new Error("User not authenticated");
  }

  const subscriptionLevel = await getUserSubscriptionLevel(userId);

  if (!canUseAITools(subscriptionLevel, 1)) {
    throw new Error("Upgrade to a premium plan to use AI tools");
  }

  const { description } = generateWorkExperienceSchema.parse(input);

  const systemMessage = `
You’re a smart resume builder AI designed to craft a focused work experience entry from the user's input. 
Your goal is to create one concise, impactful job entry using only the details given. 
Stick strictly to the provided structure — omit any fields you can't confidently infer, but never invent new information. 
Ready to turn raw input into a standout resume highlight? Let’s get started!

 Job title: <job title>
  Company: <company name>
  Start date: <format: YYYY-MM-DD> (only if provided)
  End date: <format: YYYY-MM-DD> (only if provided)
  Description: <an optimized description in bullet format, might be inferred from the job title>
`;

  const userMessage = `
Please provide a work experience entry from this description:
${description}
`;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: systemMessage,
      },
      {
        role: "user",
        content: userMessage,
      },
    ],
  });

  const aiResponse = completion.choices[0].message.content;

  if (!aiResponse) {
    throw new Error("Failed to generate AI response");
  }

  console.log("aiResponse", aiResponse);

  return {
    position: aiResponse.match(/Job title: (.*)/)?.[1] || "",
    company: aiResponse.match(/Company: (.*)/)?.[1] || "",
    description: (aiResponse.match(/Description:([\s\S]*)/)?.[1] || "").trim(),
    startDate: aiResponse.match(/Start date: (\d{4}-\d{2}-\d{2})/)
      ? new Date(aiResponse.match(/Start date: (\d{4}-\d{2}-\d{2})/)![1])
      : null,
    endDate: aiResponse.match(/End date: (\d{4}-\d{2}-\d{2})/)
      ? new Date(aiResponse.match(/End date: (\d{4}-\d{2}-\d{2})/)![1])
      : null,
    id: "",
    resumeId: "",
    createdAt: new Date(),
    updatedAt: new Date(),
  } satisfies WorkExperience;
}
