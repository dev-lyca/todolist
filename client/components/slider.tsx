"use client";
import { Options, Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { ReactNode } from "react";

interface SliderProps {
  children: ReactNode[];
  perView?: number;
  gap?: string;
  breakpoints?: Options["breakpoints"];
  options?: Options;
  className?: string;
}

export default function Slider({
  children,
  perView = 1.5,
  gap = "6px",
  breakpoints = {},
  options = {},
  className = "",
}: SliderProps) {
  return (
    <Splide
      options={{
        rewind: true,
        arrows: false, // ✅ show next/prev arrows
        pagination: false, // optional, hides dots
        perPage: perView,
        gap,
        breakpoints: {
          640: { perPage: 1.2, gap: "8px" },
          768: { perPage: 2, gap: "12px" },
          1024: { perPage: 3, gap: "16px" },
          1280: { perPage: 4, gap: "20px" },
          1536: { perPage: 5, gap: "24px" },
          ...breakpoints,
        },
        ...options,
      }}
      className={className}
    >
      {children.map((child, i) => (
        <SplideSlide key={i}>{child}</SplideSlide>
      ))}
    </Splide>
  );
}
