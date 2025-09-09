"use client";
import { Button } from "@heroui/react";
import { Options, Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { ReactNode, useRef } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

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
  const splideRef = useRef<Splide>(null);

  const handlePrev = () => {
    splideRef.current?.splide?.go("<");
  };

  const handleNext = () => {
    splideRef.current?.splide?.go(">");
  };

  return (
    <div className="relative w-full">
      <Splide
        ref={splideRef}
        options={{
          rewind: true,
          arrows: false, // disable default Splide arrows
          pagination: false,
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

      {/* ✅ Custom HeroUI arrows */}
      <div className="absolute top-1/2 left-2 -translate-y-1/2 z-10">
        <Button
          isIconOnly
          size="sm"
          className="rounded-full shadow-md bg-white hover:bg-gray-100"
          onPress={handlePrev}
        >
          <BsChevronLeft className="w-4 h-4 text-gray-700" />
        </Button>
      </div>

      <div className="absolute top-1/2 right-2 -translate-y-1/2 z-10">
        <Button
          isIconOnly
          size="sm"
          className="rounded-full shadow-md bg-white hover:bg-gray-100"
          onPress={handleNext}
        >
          <BsChevronRight className="w-4 h-4 text-gray-700" />
        </Button>
      </div>
    </div>
  );
}
