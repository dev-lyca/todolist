const LOGS_KEY = "tracktask_focus_logs";
const ACTIVE_KEY = "tracktask_focus_active";
const MAX_LOGS = 200;

import { ActiveSession, SessionLog } from "@/types/index";

export function loadLogs(): SessionLog[] {
  try {
    return JSON.parse(localStorage.getItem(LOGS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function addLog(log: SessionLog) {
  const logs = loadLogs();

  // Remove any log with the same id
  const filteredLogs = logs.filter(l => l.id !== log.id);

  // Add the new log at the front
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
