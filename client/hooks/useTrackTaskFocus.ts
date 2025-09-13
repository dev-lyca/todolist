"use client";

import { addLog } from "@/utils/sessionStorage";
import { useEffect, useRef, useState } from "react";

export function useTrackTaskFocus(workMinutes: number, breakMinutes: number) {
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60);

  const [isRunning, setIsRunning] = useState(false);

  const [isWorkPhase, setIsWorkPhase] = useState(true);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const [phaseStart, setPhaseStart] = useState<string>(new Date().toISOString());

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const pause = () => {
    setIsRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const reset = () => {
    pause();
    setIsWorkPhase(true);
    setSecondsLeft(workMinutes * 60);
  };

 useEffect(() => {
  if (!isRunning) return;
  intervalRef.current = setInterval(() => {
    setSecondsLeft((prev) => {
      if (prev > 1) return prev - 1;

      const now = new Date().toISOString();

       addLog({
        id: crypto.randomUUID(),
        phase: isWorkPhase ? "work" : "break",
        durationSeconds: isWorkPhase ? workMinutes * 60 : breakMinutes * 60,
        startedAt: phaseStart,
        endedAt: now,
      });

      // Stop or switch phase
      if (isWorkPhase) {
        setIsWorkPhase(false);
        setPhaseStart(new Date().toISOString());
        return breakMinutes * 60;
      } else {
        setIsRunning(false); 
        return 0;
      }
    });
  }, 1000);

  return () => clearInterval(intervalRef.current!);
}, [isRunning, isWorkPhase, workMinutes, breakMinutes]);

  return {
    secondsLeft,
    isRunning,
    isWorkPhase,
    start,
    pause,
    reset,
  };
}
