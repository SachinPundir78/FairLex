"use client";

import { Button } from "../ui/button";
import { cn } from "@/src/lib/utils";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const HeroSection = () => {
  return (
    <section
      className={cn(
        "relative min-h-[820px] w-full overflow-hidden",
        "bg-white dark:bg-black transition-colors duration-500"
      )}
    >
      {/* 🌟 Backgrounds */}
      <div className="absolute inset-0 z-0">
        {/* Light Mode Glow */}
        <div
          className="absolute inset-0 dark:hidden"
          style={{
            backgroundImage: `
              radial-gradient(circle 600px at 0% 200px, #fef3c7, transparent),
              radial-gradient(circle 600px at 100% 200px, #fef3c7, transparent)
            `,
          }}
        />

        {/* 🌌 Dark Mode Midnight Aurora Glow */}
        <div
          className="absolute inset-0 hidden dark:block"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, 
              rgba(226, 232, 240, 0.2) 0%, 
              rgba(226, 232, 240, 0.1) 25%, 
              rgba(226, 232, 240, 0.05) 35%, 
              transparent 50%
              )
            `,
          }}
        />
      </div>

      {/* ✨ Hero Content */}
      <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-4 py-20 mt-23 md:flex-row md:py-24">
        {/* Text Content */}
        <div className="flex-1 space-y-8 text-center md:text-left md:ml-15">
          <h1 className="text-4xl font-bold tracking-tight text-black dark:text-white sm:text-5xl md:text-6xl">
            Where Legal Thought Becomes Legal{" "}
            <span className="bg-gradient-to-r from-red-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Insight
            </span>
          </h1>

          <p className="md:mx-1 mx-auto max-w-2xl text-lg text-gray-600 dark:text-gray-300 md:text-xl">
            FairLex is not just a blog — it’s a platform where the next
            generation of lawyers and thinkers shape the future of
            jurisprudence. Explore deep dives, case comments, and our monthly
            Fair Review magazine — all crafted to make law accessible,
            analytical, and alive.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:gap-4 sm:flex-row md:justify-start">
            <Button
              size="lg"
              className="rounded-full px-8 py-6 text-lg bg-primary text-white hover:opacity-90 dark:bg-white dark:text-black border-0"
            >
              Start Reading
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 py-6 text-lg text-black border-black dark:text-white dark:border-white dark:hover:bg-gray-500 hover:bg-black/10"
            >
              Explore Topics
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 pt-8 md:max-w-md">
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary dark:text-indigo-400">
                1K+
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Published Articles
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary dark:text-indigo-400">
                50+
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Expert Writers
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-2xl font-bold text-primary dark:text-indigo-400">
                10M+
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Monthly Readers
              </div>
            </div>
          </div>
        </div>

        {/* 🎬 Lottie Animation Section */}
        <div className="mt-12 flex-1 md:mt-0 flex items-center justify-center">
          <div
            className={cn(
              "relative mx-auto h-85 w-85 rounded-2xl overflow-hidden",
              "bg-gradient-to-br from-white/5 to-transparent dark:from-white/10",
              "border border-primary/20 dark:border-white/10 backdrop-blur-lg",
              "shadow-2xl shadow-indigo-500/10"
            )}
          >
            <DotLottieReact
              src="/law.json" // 👈 Ensure your file is in public/
              loop
              autoplay
              className="h-full w-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
