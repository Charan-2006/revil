"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import EventBackground from "@/components/ui/EventBackground";

const events = [
  {
    id: 1,
    title: "Beneath the Mask",
    image: "/events/beneath-the-mask.png",
    description:
      "A level-based mystery challenge where clues are hidden in plain sight.",
    date: "To Be Announced",
    type: "Puzzle / Mystery",
  },
  {
    id: 2,
    title: "Escape Room",
    image: "/events/escape-room.png",
    description:
      "A technical team-based challenge testing logic, speed, and teamwork.",
    date: "To Be Announced",
    type: "Technical",
  },
  {
    id: 3,
    title: "CTF – Trial of the Creed",
    image: "/events/ctf-creed.png",
    description:
      "A lore-driven Capture the Flag challenge inspired by Assassin’s Creed.",
    date: "To Be Announced",
    type: "Cyber Security",
  },
  {
    id: 4,
    title: "OH-SIN-T",
    image: "/events/oh-sint.png",
    description:
      "SOC-style investigation event focused on log analysis.",
    date: "To Be Announced",
    type: "Forensics",
  },
  {
    id: 5,
    title: "Project Sherlocks – Log Trace",
    image: "/events/sherlocks.png",
    description:
      "Trace logs and uncover hidden digital evidence.",
    date: "To Be Announced",
    type: "Investigation",
  },
  {
    id: 6,
    title: "Crime Chronicles",
    image: "/events/crime.png",
    description:
      "Reconstruct crimes using photographs and deduction.",
    date: "To Be Announced",
    type: "Analytical",
  },
  {
    id: 7,
    title: "Paper Presentation",
    image: "/events/paper.png",
    description:
      "Teams present technical papers on given topics.",
    date: "To Be Announced",
    type: "Academic",
  },
  {
    id: 8,
    title: "Pixel Palette",
    image: "/events/pixel.png",
    description:
      "A creative poster design event focused on visual storytelling.",
    date: "To Be Announced",
    type: "Creative",
  },
];

export default function EventsPage() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [canHover, setCanHover] = useState(false);

  /* 🖱️ Detect real hover capability */
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
      setCanHover(mq.matches);
    }
  }, []);

  /* ⌨️ Keyboard navigation */
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  const prev = () => {
    setActiveIndex((i) => (i === 0 ? events.length - 1 : i - 1));
  };

  const next = () => {
    setActiveIndex((i) => (i + 1) % events.length);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* SAME BACKGROUND AS HERO */}
      <EventBackground />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold text-primary mb-16 glitch-text text-center">
          EVENTS
        </h1>

        <div className="relative h-[520px] flex items-center justify-center">
          {/* LEFT BUTTON */}
          <button
            onClick={prev}
            className="absolute left-2 md:left-6 z-40
              w-12 h-12 rounded-full border border-blue-500/40
              text-blue-400 text-2xl font-bold
              hover:bg-blue-500 hover:text-black
              transition flex items-center justify-center"
            aria-label="Previous event"
          >
            ‹
          </button>

          {/* RIGHT BUTTON */}
          <button
            onClick={next}
            className="absolute right-2 md:right-6 z-40
              w-12 h-12 rounded-full border border-blue-500/40
              text-blue-400 text-2xl font-bold
              hover:bg-blue-500 hover:text-black
              transition flex items-center justify-center"
            aria-label="Next event"
          >
            ›
          </button>

          {/* CARDS */}
          {events.map((event, index) => {
            const offset = index - activeIndex;

            return (
              <div
                key={event.id}
                onMouseEnter={
                  canHover ? () => setActiveIndex(index) : undefined
                }
                className={`absolute transition-all duration-500 ease-out
                  ${offset === 0 ? "z-30 opacity-100" : ""}
                  ${Math.abs(offset) === 1 ? "z-20 opacity-50 blur-sm" : ""}
                  ${Math.abs(offset) > 1 ? "opacity-0 scale-75" : ""}
                `}
                style={{
                  transform: `translateX(${offset * 340}px) scale(${
                    offset === 0 ? 1 : 0.9
                  })`,
                }}
              >
                {/* CARD */}
                <div
                  className={`w-[320px] h-[460px] rounded-2xl overflow-hidden
                  bg-card border border-primary/20
                  hover:border-blue-500 hover:shadow-[0_0_40px_rgba(59,130,246,0.6)]
                  transition-transform transition-shadow duration-300
                  ${offset === 0 ? "hover:scale-[1.07]" : ""}
                  `}
                >
                  {/* IMAGE */}
                  <div className="relative h-56">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-col h-[204px] p-6">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-white mb-2">
                        {event.title}
                      </h2>

                      <p className="text-gray-400 text-sm mb-3">
                        {event.description}
                      </p>

                      <div className="flex justify-between text-xs">
                        <span className="text-blue-400 font-mono">
                          {event.type}
                        </span>
                        <span className="text-gray-400">
                          {event.date}
                        </span>
                      </div>
                    </div>

                    {/* REGISTER — PRECISE CURSOR TARGET */}
                    <div className="pt-4">
                      <button
                        data-grab
                        className="w-full px-4 py-2
                        bg-blue-500/10 text-blue-400 font-bold
                        border border-blue-500/30 rounded
                        hover:bg-blue-500 hover:text-black transition"
                      >
                        Register
                      </button>
                    </div>
                  </div>
                </div>
                {/* END CARD */}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
