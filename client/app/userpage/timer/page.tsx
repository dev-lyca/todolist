"use client";

import { useTrackTaskFocus } from "@/hooks/useTrackTaskFocus";
import { clearLogs, loadLogs } from "@/utils/sessionStorage"; 
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CircularProgress,
  Input,
} from "@heroui/react";
import { useState } from "react";

export default function TrackTaskModoroUI() {
  const [work, setWork] = useState(25);
  const [breakTime, setBreakTime] = useState(5);

  const { secondsLeft, isRunning, isWorkPhase, start, pause, reset } =
    useTrackTaskFocus(work, breakTime);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;

  const logs = loadLogs();

  return (
    <div className="flex flex-col lg:flex-row gap-2 mt-14 mb-20 w-full mx-auto">
      {/* Main Timer Card */}
      <Card className="shadow-lg rounded-2xl flex-1">
        <CardHeader className="flex justify-between items-center border-b pb-2">
          <div>
            <h3 className="text-lg font-semibold">TrackTask Focus</h3>
            <p className="text-xs text-default-500">
              Stay focused with work & break cycles
            </p>
          </div>
          <Button size="sm" variant="flat" color="danger" onPress={reset}>
            Reset
          </Button>
        </CardHeader>

        <CardBody className="flex flex-col gap-6 items-center">
          {/* Progress Timer */}
          <div className="flex flex-col items-center">
            <CircularProgress
              aria-label="Pomodoro Timer"
              color={isWorkPhase ? "success" : "primary"}
              size="lg"
              value={
                (secondsLeft / (isWorkPhase ? work * 60 : breakTime * 60)) * 100
              }
              showValueLabel={false}
              classNames={{
                svg: "w-32 h-32 drop-shadow-md",
                value: "text-xl font-bold text-default-700",
              }}
            />
            <span className="mt-2 text-2xl font-mono font-bold">
              {minutes}:{seconds.toString().padStart(2, "0")}
            </span>
            <span className="text-sm text-default-500">
              {isWorkPhase ? "Work phase" : "Break phase"}
            </span>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-2 gap-4 w-full">
            <Input
              type="number"
              label="Work (min)"
              value={String(work)}
              onChange={(e) => setWork(Number(e.target.value))}
              disabled={isRunning}
            />
            <Input
              type="number"
              label="Break (min)"
              value={String(breakTime)}
              onChange={(e) => setBreakTime(Number(e.target.value))}
              disabled={isRunning}
            />
          </div>

          {/* Presets */}
          <div className="flex gap-2 flex-wrap justify-center">
            <Button
              size="sm"
              variant="flat"
              onPress={() => {
                setWork(25);
                setBreakTime(5);
              }}
            >
              Classic 25/5
            </Button>
            <Button
              size="sm"
              variant="flat"
              onPress={() => {
                setWork(45);
                setBreakTime(15);
              }}
            >
              Focus 45/15
            </Button>
            <Button
              size="sm"
              variant="flat"
              onPress={() => {
                setWork(15);
                setBreakTime(5);
              }}
            >
              Sprint 15/5
            </Button>
          </div>
        </CardBody>

        <CardFooter className="flex justify-between items-center gap-2 border-t pt-2">
          <div className="flex gap-2">
            {!isRunning ? (
              <Button color="success" onPress={start}>
                Start
              </Button>
            ) : (
              <Button variant="flat" color="warning" onPress={pause}>
                Pause
              </Button>
            )}
            <Button variant="flat" onPress={reset}>
              Stop
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* Logs Card */}
      <Card className="rounded-2xl w-full lg:w-1/3 max-h-100">
        <div className="px-4 py-3 text-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium text-sm">Logs</span>
            <Button
              size="sm"
              variant="light"
              color="danger"
              onPress={clearLogs}
            >
              Clear
            </Button>
          </div>
          <ul className=" max-h-100 overflow-y-auto space-y-2">
            {logs.length === 0 ? (
              <li className="text-xs text-default-400">No logs yet</li>
            ) : (
              logs.map((log) => (
                <li
                  key={log.id}
                  className="text-xs text-default-600 border-b pb-1"
                >
                  ✅ {log.phase === "work" ? "Work" : "Break"}{" "}
                  {Math.round(log.durationSeconds / 60)}min •{" "}
                  {new Date(log.startedAt).toLocaleString()}
                </li>
              ))
            )}
          </ul>
        </div>
      </Card>
    </div>
  );
}
