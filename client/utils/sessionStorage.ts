const LOGS_KEY = "tracktask_focus_logs";
const ACTIVE_KEY = "tracktask_focus_active";
const MAX_LOGS = 200;

import { ActiveSession, SessionLog } from "@/types/index";

export function loadLogs(): SessionLog[] {
  try {
    const logs: SessionLog[] = JSON.parse(localStorage.getItem(LOGS_KEY) || "[]");

    const uniqueLogsMap = new Map<string, SessionLog>();
    logs.forEach(log => uniqueLogsMap.set(log.id, log));

    return Array.from(uniqueLogsMap.values());
  } catch {
    return [];
  }
}

export function addLog(log: SessionLog) {
  const logs = loadLogs();

 const filteredLogs = logs.filter(
  l => l.startedAt !== log.startedAt || l.phase !== log.phase
);

  filteredLogs.unshift(log);

  localStorage.setItem(LOGS_KEY, JSON.stringify(filteredLogs.slice(0, MAX_LOGS)));
}



export function clearLogs() {
  localStorage.setItem(LOGS_KEY, "[]");
}

export function loadActive(): ActiveSession | null {
  try {
    return JSON.parse(localStorage.getItem(ACTIVE_KEY) || "null");
  } catch {
    return null;
  }
}

export function saveActive(session: ActiveSession | null) {
  if (!session) localStorage.removeItem(ACTIVE_KEY);
  else localStorage.setItem(ACTIVE_KEY, JSON.stringify(session));
}
