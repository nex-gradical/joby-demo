// components/VideoScrub.tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function VideoScrub({ trigger }: { trigger: React.RefObject<HTMLDivElement> }) {
  const video = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    const vid = video.current;
    if (!vid) return;

    const handleLoaded = () => {
      vid.currentTime = 0;

      gsap.to(vid, {
        currentTime: vid.duration,
        ease: "none",
        scrollTrigger: {
          trigger: trigger.current,
          start: "top top",
          end: "+=1200%",
          scrub: 0.3, // lighter scrub just for video
        },
      });
    };

    if (vid.readyState >= 1) {
      handleLoaded();
    } else {
      vid.addEventListener("loadedmetadata", handleLoaded);
    }

    return () => {
      vid.removeEventListener("loadedmetadata", handleLoaded);
    };
  });

  return (
    <video
      ref={video}
      muted
      playsInline
      preload="auto"
      className="absolute top-0 left-0 w-full h-screen object-cover"
    >
      <source src="/video/joby.mp4" type="video/mp4" />
    </video>
  );
}