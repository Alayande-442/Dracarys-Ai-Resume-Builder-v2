"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/assets/main-logo.jpeg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import resumePreview from "@/assets/Resume-purplee.jpg";

// Typewriter component
function TypewriterText({
  phrases,
  speed = 100,
  pauseDuration = 2000,
}: {
  phrases: string[];
  speed?: number;
  pauseDuration?: number;
}) {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];

    if (isTyping) {
      // Typing phase
      if (currentText.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        // Finished typing, pause before erasing
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, pauseDuration);
        return () => clearTimeout(timeout);
      }
    } else {
      // Erasing phase
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, speed / 2); // Erase faster than typing
        return () => clearTimeout(timeout);
      } else {
        // Finished erasing, move to next phrase
        setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        setIsTyping(true);
      }
    }
  }, [
    currentText,
    currentPhraseIndex,
    isTyping,
    phrases,
    speed,
    pauseDuration,
  ]);

  return (
    <span className="inline-block bg-gradient-to-r from-purple-950 to-purple-500 bg-clip-text text-transparent">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function Home() {
  const phrases = [
    "standout resume",
    "impressive resume",
    "eye-catching resume",
  ];

  return (
    <main className="bg-purple-600-100 flex min-h-screen flex-col items-center justify-around py-12 text-center text-gray-900 md:flex-row md:text-start lg:gap-5">
      <div className="max-w-prose space-y-3">
        <Image
          src={logo}
          alt="Logo"
          width={150}
          height={150}
          className="mx-auto md:ms-0"
        />

        <h1 className="scroll-m-20 whitespace-nowrap text-2xl font-extrabold tracking-tight lg:text-3xl">
          B<span className="text-gray-500">u</span>ild your{" "}
          <TypewriterText phrases={phrases} speed={100} pauseDuration={2000} />{" "}
          in min<span className="text-gray-500">u</span>tes
        </h1>

        <p className="text-lg text-gray-500">
          Our <span className="font-bold">AI resume builder</span> helps you
          craft a professional resume effortlessly — no experience required.
        </p>

        <Button asChild variant="premium">
          <Link href="/editor">Get started</Link>
        </Button>
      </div>
      <div>
        <Image
          src={resumePreview}
          alt="Resume preview"
          width={600}
          height={500}
          className="mx-auto md:ms-0"
        />
      </div>
    </main>
  );
}
