"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import logo from "@/assets/main-logo.jpeg";
import resumePreview from "@/assets/Resume-purplee.jpg";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import BackgroundBlobs from "@/components/BackgroundBlobs";

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
      if (currentText.length < currentPhrase.length) {
        const timeout = setTimeout(() => {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        }, speed);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => {
          setIsTyping(false);
        }, pauseDuration);
        return () => clearTimeout(timeout);
      }
    } else {
      if (currentText.length > 0) {
        const timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, speed / 2);
        return () => clearTimeout(timeout);
      } else {
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
    <span className="inline-block bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text font-bold text-transparent">
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  );
}

export default function Home() {
  const phrases = [
    "ATS-optimized resume",
    "job-winning resume",
    "professional resume",
  ];

  // Integration platforms (duplicated for seamless looping)
  const platforms = [
    "LinkedIn",
    "Indeed",
    "Greenhouse",
    "Workday",
    "ZipRecruiter",
    "Lever",
    "Monster",
    "Glassdoor",
  ];

  return (
    <div className="relative bg-gray-900 text-white">
      {/* Hero Section */}
      <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-transparent px-6 py-16 text-center md:flex-row md:text-left lg:gap-16">
        <BackgroundBlobs />

        {/* Content Section */}
        <div className="relative z-10 max-w-2xl space-y-8">
          <Image
            src={logo}
            alt="Resume.ai Logo"
            width={120}
            height={120}
            className="mx-auto drop-shadow-lg md:mx-0"
          />

          <h1 className="text-4xl font-extrabold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Optimize Your{" "}
            <TypewriterText
              phrases={phrases}
              speed={100}
              pauseDuration={2000}
            />{" "}
            with AI
          </h1>

          <p className="text-lg text-gray-300 md:text-xl lg:text-2xl">
            Get past ATS systems and land more interviews with our AI-powered
            Chrome extension. Trusted by{" "}
            <span className="font-bold text-white">50,000+ professionals</span>.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center md:justify-start">
            <Button
              asChild
              className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-4 text-lg font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:shadow-2xl"
            >
              <Link href="/editor">✨ Get Started Free</Link>
            </Button>
            {/* <Button
              asChild
              className="rounded-full border-2 border-blue-600 bg-transparent px-8 py-3 text-lg font-semibold text-blue-400 transition-transform hover:scale-105 hover:bg-blue-600/10"
            >
              <Link href="https://chromewebstore.google.com">
                Install Chrome Extension
              </Link>
            </Button> */}
          </div>
        </div>

        {/* Resume Preview */}
        <div className="relative z-10 mt-12 md:mt-0">
          <Image
            src={resumePreview}
            alt="Resume Preview"
            width={500}
            height={600}
            className="mx-auto rounded-xl shadow-2xl transition-transform hover:scale-105 md:mx-0"
          />
        </div>
      </main>
      {/* Proven Results Section */}
      <section className="bg-gray-800 py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Proven Results</h2>
          <p className="mt-4 text-lg text-gray-300">
            Join thousands of professionals who transformed their job search
            with Resume.ai.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-4xl font-bold text-blue-400">95%</h3>
              <p className="mt-2 text-gray-300">ATS Pass Rate</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-blue-400">50K+</h3>
              <p className="mt-2 text-gray-300">Active Users</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-blue-400">2M+</h3>
              <p className="mt-2 text-gray-300">Resumes Optimized</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-blue-400">&lt;30s</h3>
              <p className="mt-2 text-gray-300">Average Process Time</p>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">Powerful Features</h2>
          <p className="mt-4 text-lg text-gray-300">
            Our tools help you create, optimize, and submit resumes that stand
            out.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-gray-800 p-6 shadow-lg">
              <h3 className="text-xl font-semibold">Chrome Extension</h3>
              <p className="mt-2 text-gray-300">
                Analyze job descriptions and optimize your resume in real-time
                across all major job boards.
              </p>
            </div>
            <div className="rounded-lg bg-gray-800 p-6 shadow-lg">
              <h3 className="text-xl font-semibold">Multi-Browser Support</h3>
              <p className="mt-2 text-gray-300">
                Works seamlessly on Chrome, Edge, Firefox, and Opera.
              </p>
            </div>
            <div className="rounded-lg bg-gray-800 p-6 shadow-lg">
              <h3 className="text-xl font-semibold">API & Roch Webhooks</h3>
              <p className="mt-2 text-gray-300">
                Integrate our optimization engine into your tools with our
                robust API.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Integrations Section */}
      <section className="bg-gray-800 py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Seamless Integrations
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Connect with top job boards and professional networks effortlessly.
          </p>
          <div className="mt-12 overflow-hidden">
            <motion.div
              className="flex gap-6"
              animate={{
                x: [0, -100 * platforms.length], // Adjust based on number of items
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: platforms.length * 4, // Adjust speed (4s per item)
                  ease: "linear",
                },
              }}
              style={{ display: "inline-flex", whiteSpace: "nowrap" }}
            >
              {[...platforms, ...platforms].map(
                (
                  platform,
                  index, // Duplicate for seamless loop
                ) => (
                  <div
                    key={index}
                    className="flex-shrink-0 rounded-lg bg-transparent/10 px-6 py-3 text-lg font-semibold"
                  >
                    {platform}
                  </div>
                ),
              )}
            </motion.div>
          </div>
        </div>
      </section>
      {/* Pricing Section
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold md:text-4xl">
            Simple, Transparent Pricing
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Choose the plan that fits your career goals.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-gray-800 p-6 shadow-lg">
              <h3 className="text-xl font-semibold">Free</h3>
              <p className="mt-2 text-3xl font-bold">
                $0 <span className="text-lg">forever</span>
              </p>
              <ul className="mt-4 space-y-2 text-gray-300">
                <li>3 resume optimizations/month</li>
                <li>Basic ATS compatibility check</li>
                <li>Chrome extension access</li>
                <li>Community support</li>
              </ul>
              <Button
                asChild
                className="mt-6 rounded-full bg-blue-600 px-6 py-3 text-white"
              >
                <Link href="/signup">Start Free</Link>
              </Button>
            </div>
            <div className="rounded-lg border-2 border-blue-600 bg-gray-800 p-6 shadow-lg">
              <h3 className="text-xl font-semibold">Pro</h3>
              <p className="mt-2 text-3xl font-bold">
                $25 <span className="text-lg">/month</span>
              </p>
              <ul className="mt-4 space-y-2 text-gray-300">
                <li>Unlimited resume optimizations</li>
                <li>Advanced ATS scoring (95% pass rate)</li>
                <li>Multi-browser support</li>
                <li>Priority support</li>
                <li>API access</li>
              </ul>
              <Button
                asChild
                className="mt-6 rounded-full bg-blue-600 px-6 py-3 text-white"
              >
                <Link href="/signup">Get Pro</Link>
              </Button>
            </div>
            <div className="rounded-lg bg-gray-800 p-6 shadow-lg">
              <h3 className="text-xl font-semibold">Enterprise</h3>
              <p className="mt-2 text-3xl font-bold">Custom</p>
              <ul className="mt-4 space-y-2 text-gray-300">
                <li>Everything in Pro</li>
                <li>Unlimited API requests</li>
                <li>Dedicated account manager</li>
                <li>SLA guarantees</li>
              </ul>
              <Button
                asChild
                className="mt-6 rounded-full bg-blue-600 px-6 py-3 text-white"
              >
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
}
