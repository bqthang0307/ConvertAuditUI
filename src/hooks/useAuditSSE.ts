// useAuditStream.ts
import { useEffect, useState } from "react";

type Evt =
  | { type: "hello"; connected: boolean }
  | { type: "progress"; percent: number; stage?: string; message?: string }
  | { type: "completed"; result: unknown }
  | { type: "error"; error: string };

export function useAuditSSE(streamUrl?: string) {
  const [events, setEvents] = useState<Evt[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');

  useEffect(() => {
    if (!streamUrl) {
      setConnectionStatus('disconnected');
      return;
    }
    
    if (!("EventSource" in window)) {
      setConnectionStatus('error');
      return;
    }

    setConnectionStatus('connecting');
    const es = new EventSource(streamUrl);
    
    es.onopen = () => {
      setConnectionStatus('connected');
    };
    
    es.onmessage = (e) => {
      try {
        const evt = JSON.parse(e.data) as Evt;
        setEvents((prev) => [...prev, evt]);
      } catch (error) {
        console.error('Failed to parse SSE event:', error);
        setEvents((prev) => [...prev, { type: "error", error: "Failed to parse event data" }]);
      }
    };
    
    es.onerror = (error) => {
      console.error('SSE connection error:', error);
      setConnectionStatus('error');
      setEvents((prev) => [...prev, { type: "error", error: "Connection error occurred" }]);
    };
    
    return () => {
      es.close();
      setConnectionStatus('disconnected');
    };
  }, [streamUrl]);

  const latest = events[events.length - 1];
  return { events, latest, connectionStatus };
}
