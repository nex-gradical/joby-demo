"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import ExperienceCards from "./ExperienceCard";

gsap.registerPlugin(ScrollTrigger);

// At the top of ScrollVideoTwo, add the cards data
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

const SLOTS = {
  EXIT: { x: "-28vw", y: "-28vh", opacity: 1 },
  ACTIVE: { x: "0vw", y: "0vh", opacity: 1 },
  PREVIEW: { x: "10vw", y: "10vh", opacity: 1 },
  HIDDEN_START: { x: "35vw", y: "50vh", opacity: 0 },
  HIDDEN_END: { x: "-50vw", y: "-50vh", opacity: 0 },
};

export default function ScrollVideo() {
  const container = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subTextRef = useRef<HTMLDivElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const sceneOneRef = useRef<HTMLDivElement>(null);
  const sceneTwoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const subTextOne = useRef<HTMLDivElement>(null);
  const subTextTwo = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressBarDivRef = useRef<HTMLDivElement>(null);
  const cardInnerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const partTwoRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cardTextRefs = useRef<(HTMLDivElement | null)[]>([]);
  const bottomTextRef = useRef<HTMLDivElement>(null);
  const smallTextRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const vid = video.current;
      const vidContainer = videoContainerRef.current;
      if (!vid || !vidContainer) return;

      const handleLoaded = () => {
        vid.currentTime = 0;

        ScrollTrigger.refresh();

        const introTl = gsap.timeline({
          onComplete: () => {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: container.current,
                start: "top top",
                end: "+=1200%",
                scrub: 1,
                pin: sceneOneRef.current,
                pinSpacing: true,
              },
            });

            tl.fromTo(
              [progressBarRef.current, progressBarDivRef.current],
              { opacity: 0 },
              { opacity: 1, duration: 0.05 },
              0.1,
            )
              .fromTo(
                progressBarRef.current,
                { scaleY: 0 },
                { scaleY: 1, ease: "none", duration: 1 },
                0,
              )
              .to(
                [progressBarRef.current, progressBarDivRef.current],
                { opacity: 0, duration: 0.05 },
                1,
              );
            let lastTime = -1;
            tl.to(
              vid,
              {
                currentTime: vid.duration,
                ease: "none",
                duration: 1,
                onUpdate: function () {
                  const newTime = Math.round(vid.currentTime * 28) / 28;
                  if (newTime !== lastTime) {
                    lastTime = newTime;
                    vid.currentTime = newTime;
                  }
                },
              },
              0,
            );

            tl.to(
              vidContainer,
              {
                height: "100vh",
                borderRadius: "0rem",
                duration: 0.1,
              },
              0,
            )
              .to(headlineRef.current, { opacity: 0, y: 100, duration: 0.1 }, 0)
              .to(subTextRef.current, { opacity: 0, duration: 0.05 }, 0.05);

            tl.to(
              subTextOne.current,
              { opacity: 1, y: -20, duration: 0.1 },
              0.1,
            ).to(
              subTextOne.current,
              { opacity: 0, y: -40, duration: 0.1 },
              0.4,
            );

            tl.to(
              subTextTwo.current,
              { opacity: 1, y: -20, duration: 0.1 },
              0.5,
            ).to(
              subTextTwo.current,
              { opacity: 0, y: -40, duration: 0.1 },
              0.96,
            );

            gsap
              .timeline({
                scrollTrigger: {
                  trigger: sceneTwoRef.current,
                  start: "top bottom",
                  end: "top top",
                  scrub: 1,
                },
              })
              .to(
                videoContainerRef.current,
                {
                  borderBottomLeftRadius: "10rem",
                  borderBottomRightRadius: "10rem",
                },
                0,
              )
              .fromTo(textRef.current, { scale: 0.2 }, { scale: 1 }, 0);

            const smoothTl = gsap.timeline({
              scrollTrigger: {
                trigger: sceneTwoRef.current,
                start: "top top",
                end: "+=400%",
                pin: true,
                pinSpacing: true,
                scrub: true,
                // markers: true,
              },
            });

            smoothTl
              .to(
                container.current,
                {
                  backgroundColor: "#ffffff",
                  duration: 0.1,
                  ease: "none",
                },
                0.01,
              )
              .to(
                textRef.current,
                {
                  color: "#000000",
                  duration: 0.1,
                  ease: "none",
                },
                0.01,
              );
            smoothTl.to(
              textRef.current,
              {
                scale: 0,
                ease: "power4.out",
                y: -150,
                duration: 0.5,
              },
              0.225,
            );
            const c = cardRefs.current;
            const ci = cardInnerRefs.current;
            const t = cardTextRefs.current;

            // ── Initial state ──
            gsap.set(c[0], { ...SLOTS.ACTIVE, y: "45vh", opacity: 1 });
            gsap.set(ci[0], { scale: 0 });

            gsap.set(c[1], { ...SLOTS.PREVIEW, opacity: 1, y: "0" });
            gsap.set(ci[1], { scale: 0, transformOrigin: "bottom right" });

            gsap.set(c[2], { ...SLOTS.PREVIEW, opacity: 1, y: "0", x: "10vw" });
            gsap.set(ci[2], { scale: 0, transformOrigin: "bottom right" });

            gsap.set(t, { opacity: 0 });

            // ── Step 0 ──
            smoothTl

              .to(c[0], { y: "0vh", duration: 0.2, ease: "power2.out" }, 0.15)
              .to(ci[0], { scale: 1, duration: 0.2, ease: "power2.out" }, 0.15)
              .to(
                ci[1],
                { scale: 0.2, duration: 0.2, ease: "power2.out" },
                0.15,
              )
              .to(t[0], { opacity: 1, duration: 0.05 }, 0.33)
              .to(smallTextRef.current, { opacity: 0 }, 0.14);

            // ── Step 1 ──
            smoothTl
              .to(t[0], { opacity: 0, duration: 0.04 }, 0.38)
              .to(
                c[0],
                {
                  ...SLOTS.EXIT,
                  duration: 0.2,
                  ease: "power2.inOut",
                  scale: 0.2,
                  y: "-36vh",
                },
                0.4,
              )
              .to(
                c[1],
                { ...SLOTS.ACTIVE, duration: 0.2, ease: "power2.inOut" },
                0.4,
              )
              .to(ci[1], { scale: 1, duration: 0.2, ease: "power2.inOut" }, 0.4)
              .to(c[2], { opacity: 1, duration: 0.2, ease: "power2.out" }, 0.4)
              .to(
                ci[2],
                { scale: 0.2, duration: 0.2, ease: "power2.out" },
                0.46,
              )
              .to(t[1], { opacity: 1, duration: 0.05 }, 0.58);

            // ── Step 2 ──
            smoothTl
              .to(t[1], { opacity: 0, duration: 0.04 }, 0.62)
              .set(ci[1], { transformOrigin: "top left" }, 0.63)
              .to(
                ci[0],
                {
                  scale: 0,
                  duration: 0.2,
                  ease: "power2.inOut",
                  transformOrigin: "top left",
                },
                0.63,
              )
              .to(c[0], { opacity: 1 }, 0.64)
              .to(
                c[1],
                {
                  ...SLOTS.EXIT,
                  scale: 0.2,
                  y: "-36vh",
                  duration: 0.2,
                  ease: "power2.inOut",
                },
                0.63,
              )
              .to(
                ci[1],
                { scale: 1, duration: 0.2, ease: "power2.inOut" },
                0.64,
              )
              .to(
                c[2],
                { ...SLOTS.ACTIVE, duration: 0.2, ease: "power2.inOut" },
                0.64,
              )
              .to(
                ci[2],
                { scale: 1, duration: 0.2, ease: "power2.inOut" },
                0.64,
              )
              .to(t[2], { opacity: 1, duration: 0.05 }, 0.82);

            gsap.set(bottomTextRef.current, { opacity: 1 });
            const words =
              bottomTextRef.current?.querySelectorAll(".letter") ?? [];

            gsap.to(words.length ? words : [], {
              color: "#000000",
              stagger: 0.1,
              duration: 0.1,
              ease: "none",
              scrollTrigger: {
                trigger: bottomTextRef.current,
                start: "top 80%",
                end: "+=380",
                scrub: true,
                // markers: true,
              },
            });
          },
        });

        gsap.set(videoContainerRef.current, {
          scaleY: 0,
          transformOrigin: "top",
        });

        // Intro - reveal by scaling up
        introTl.to(videoContainerRef.current, {
          scaleY: 1,
          transformOrigin: "top",
          duration: 1,
          ease: "power3.out",
        });
      };

      if (vid.readyState >= 1) {
        handleLoaded();
      } else {
        vid.addEventListener("loadedmetadata", handleLoaded);
      }

      return () => {
        vid.removeEventListener("loadedmetadata", handleLoaded);
        ScrollTrigger.getAll().forEach((t) => t.kill());
      };
    },
    { scope: container },
  );

  return (
    <section
      ref={container}
      className="relative w-full h-full bg-[#1a8cff] overflow-x-hidden"
    >
      {/* Scene One */}
      <div
        ref={sceneOneRef}
        className="relative w-full h-screen flex items-start justify-center overflow-hidden"
      >
        <div
          ref={videoContainerRef}
          className="relative z-10 w-full overflow-hidden will-change-[height]"
          style={{
            height: "85vh",
            borderBottomLeftRadius: "10rem",
            borderBottomRightRadius: "10rem",
          }}
        >
          <video
            ref={video}
            muted
            playsInline
            preload="metadata"
            className="absolute top-0 left-0 w-full h-screen object-cover"
          >
            <source src="/video/output.mp4" type="video/mp4" />
          </video>
        </div>

        <div
          ref={headlineRef}
          className="absolute z-20 bottom-40 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none"
        >
          <p className="text-7xl font-bold text-white">
            Skip traffic.
            <br /> Time to fly.
          </p>
        </div>

        <div className="absolute bottom-10 text-center w-full pointer-events-none -z-10">
          <p ref={subTextRef} className="text-sm text-white font-medium">
            The future of aviation is coming soon.
          </p>
        </div>

        <div className="absolute w-full bottom-10 left-10 z-20 flex gap-3 ">
          {/* Vertical progress bar track */}
          <div
            ref={progressBarDivRef}
            className="relative w-0.5 opacity-0 bg-white/20 rounded-full self-stretch"
          >
            <div
              ref={progressBarRef}
              className="absolute top-0  left-0 w-full h-full bg-white rounded-full origin-top scale-y-0"
            />
          </div>

          {/* Subtexts */}
          <div className="relative text-2xl w-full h-25">
            <div
              ref={subTextOne}
              className=" w-full bottom-0 absolute opacity-0 leading-6 text-white"
            >
              <p>
                Elevate your commute with our <br />
                all-electric air taxi, soon to be <br /> bookable at the tap of
                a button.
              </p>
            </div>
            <div
              ref={subTextTwo}
              className=" w-full bottom-0 absolute opacity-0 leading-6 text-white"
            >
              <p>
                Zero traffic. Zero operating <br />
                emissions. Just the space and <br />
                time your day deserves.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scene Two */}
      <section
        ref={sceneTwoRef}
        className="relative h-screen text-center   overflow-hidden"
      >
        <div>
          <p
            ref={textRef}
            className="text-[10vw] font-medium tracking-tighter leading-none  text-white"
          >
            Nowhere to go but Up
          </p>
        </div>
        <div className="absolute  bottom-4 left-4">
          <p className="text-xs">Experience Highlight</p>
        </div>
        <div ref={smallTextRef} className="absolute  bottom-4 right-4">
          <p className="text-xs">Skip town, let's fly</p>
        </div>
        <div
          ref={partTwoRef}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* 3 independent card image elements, all centered at same origin */}
          {cards.map((card, index) => (
            <div
              key={card.id}
              ref={(el) => {
                cardRefs.current[index] = el;
              }}
              className="absolute will-change-transform"
              style={{
                zIndex: index === 1 ? 20 : 10,
                left: "50%",
                top: "50%",
                marginLeft: "-22.5vw",
                marginTop: "-46vh",
              }}
            >
              <div
                ref={(el) => {
                  cardInnerRefs.current[index] = el;
                }}
                className="w-[45vw] h-[90vh] will-change-transform overflow-hidden"
                style={{ borderRadius: "1.5rem" }}
              >
                <img
                  src={card.image}
                  alt={card.label}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}

          {/* 3 text blocks, all at same fixed position right of center card.
              GSAP toggles opacity so only the active card's text shows. */}
          {cards.map((card, index) => (
            <div
              key={`text-${card.id}`}
              ref={(el) => {
                cardTextRefs.current[index] = el;
              }}
              className="absolute text-left pointer-events-none"
              style={{
                left: "calc(50% + 23vw + 2rem)",
                top: "50%",
                transform: "translateY(-50%)",
                width: "18vw",
                zIndex: 30,
              }}
            >
              <p className="text-xs font-bold uppercase tracking-widest mb-3 text-black/50">
                {card.label}
              </p>
              <h3 className="text-lg font-medium leading-snug text-black">
                {card.heading}
              </h3>
              <button className="mt-5 text-sm border-b border-black pb-1 pointer-events-auto">
                Discover the Experience
              </button>
            </div>
          ))}
          {/* Texts */}
        </div>
      </section>
      <div ref={bottomTextRef} className="relative z-40 px-20 pb-100 h-full">
        <p className="pl-82 text-4xl font-medium leading-tight text-gray-400/20">
          {"Imagine looking forward to your commute. And forgetting what gridlock feels like. When flight is a part of everyday life, anything is possible."
            .split("")
            .map((char, i) => (
              <span key={i} className="letter inline-block">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
        </p>
      </div>
    </section>
  );
}
