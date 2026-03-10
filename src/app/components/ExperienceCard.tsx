"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const cards = [
  {
    id: 1,
    image: "/images/Image1.webp",
    heading:
      "Leave city congestion behind and choose a stress-free commute through the clouds.",
    label: "Skip town, let's fly",
  },
  {
    id: 2,
    image: "/images/Image2.webp",
    heading:
      "Sit back and enjoy. Breathtaking views come standard with every seat.",
    label: "The experience",
  },
  {
    id: 3,
    image: "/images/Image3.webp",
    heading:
      "Enjoy seamless travel with a choreographed rideshare to the vertiport.",
    label: "The journey",
  },
];

export default function ExperienceCards() {
  const container = useRef<HTMLDivElement>(null);
  const mainImageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);
  const prevThumbRef = useRef<HTMLDivElement>(null);
  const nextThumbRef = useRef<HTMLDivElement>(null);
  const prevThumbImgRef = useRef<HTMLImageElement>(null);
  const nextThumbImgRef = useRef<HTMLImageElement>(null);
  const labelRightRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      const ctx = gsap.context(() => {
        cards.forEach((_, i) => {
          const isLast = i === cards.length - 1;
          const nextIndex = i + 1;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: container.current,
              start: `top+=${i * 100}% top`,
              end: `top+=${(i + 1) * 100}% top`,
              scrub: 1,
              pin: i === 0 ? container.current : false,
              pinSpacing: i === 0,
            },
          });

          if (!isLast) {
            // Current card scales down and fades slightly
            tl.to(
              mainImageRefs.current[i],
              {
                scale: 0.92,
                opacity: 0,
                duration: 0.5,
                ease: "power2.inOut",
              },
              0,
            );

            // Next card scales up from slightly smaller
            tl.fromTo(
              mainImageRefs.current[nextIndex],
              { scale: 0.92, opacity: 0 },
              { scale: 1, opacity: 1, duration: 0.5, ease: "power2.inOut" },
              0,
            );

            // Current text fades out
            tl.to(
              textRefs.current[i],
              {
                opacity: 0,
                y: -20,
                duration: 0.3,
              },
              0,
            );

            // Next text fades in
            tl.fromTo(
              textRefs.current[nextIndex],
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.3 },
              0.2,
            );

            // Prev thumb transitions
            tl.to(prevThumbRef.current, { opacity: 1, duration: 0.3 }, 0.2);

            // Next thumb transitions to next-next card or fades out on last
            if (nextIndex < cards.length - 1) {
              tl.to(
                nextThumbImgRef.current,
                {
                  attr: { src: cards[nextIndex + 1].image },
                  duration: 0,
                },
                0.5,
              );
            } else {
              tl.to(nextThumbRef.current, { opacity: 0, duration: 0.3 }, 0.4);
            }

            // Right label transitions
            tl.to(
              labelRightRef.current,
              {
                opacity: 0,
                duration: 0.2,
              },
              0,
            ).to(
              labelRightRef.current,
              {
                opacity: 1,
                duration: 0.2,
                onStart: () => {
                  if (labelRightRef.current) {
                    labelRightRef.current.textContent = cards[nextIndex].label;
                  }
                },
              },
              0.3,
            );
          }
        });
      }, container);

      return () => ctx.revert();
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative w-full bg-[#f5f2e8]"
      style={{ height: `${cards.length * 100}vh` }}
    >
      {/* Sticky inner */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Bottom left label */}
        <p className="absolute bottom-6 left-6 text-sm text-black/60 z-20">
          Experience Highlights
        </p>

        {/* Bottom right label */}
        <p
          ref={labelRightRef}
          className="absolute bottom-6 right-6 text-sm text-black/60 z-20"
        >
          {cards[0].label}
        </p>

        {/* Prev thumbnail - top left */}
        <div
          ref={prevThumbRef}
          className="absolute top-6 left-6 w-20 h-20 rounded-xl overflow-hidden z-20 opacity-0"
        >
          <img
            ref={prevThumbImgRef}
            src={cards[0].image}
            alt="previous"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Next thumbnail - bottom right */}
        <div
          ref={nextThumbRef}
          className="absolute bottom-16 right-6 w-28 h-28 rounded-xl overflow-hidden z-20"
        >
          <img
            ref={nextThumbImgRef}
            src={cards[1].image}
            alt="next"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Cards */}
        {cards.map((card, i) => (
          <div
            key={card.id}
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: i === 0 ? 10 : 5 }}
          >
            {/* Main image */}
            <div
              ref={(el) => {
                mainImageRefs.current[i] = el;
              }}
              className="relative w-[55vw] h-[80vh] rounded-2xl overflow-hidden"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <img
                src={card.image}
                alt={card.heading}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Text - right side */}
            <div
              ref={(el) => {
                textRefs.current[i] = el;
              }}
              className="absolute right-[5vw] top-1/2 -translate-y-1/2 max-w-xs z-20"
              style={{ opacity: i === 0 ? 1 : 0 }}
            >
              <p className="text-2xl font-medium text-black leading-snug">
                {card.heading}
              </p>

              <a
                href="#"
                className="mt-4 inline-block text-sm underline underline-offset-4 text-black"
              >
                Discover the Experience
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
