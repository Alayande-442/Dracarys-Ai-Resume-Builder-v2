"use server";

import openai from "@/lib/openai";
import { GenerateSummaryInput, generateSummarySchema } from "@/lib/validation";

export async function generateSummary(input: GenerateSummaryInput) {
  // TODO: only available to premium users

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
