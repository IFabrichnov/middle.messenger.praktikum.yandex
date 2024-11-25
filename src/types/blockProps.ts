export interface BlockProps {
  events?: Record<string, EventListener | undefined>;
  [key: string]: any;
}
