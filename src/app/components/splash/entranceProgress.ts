// Shared damped spring entrance with a configurable hold.
export function entranceProgress(
  elapsed: number,
  delay = 1,
  { damping = 5, frequency = 5 }: { damping?: number; frequency?: number } = {},
): number {
  const time = Math.max(elapsed - delay, 0);
  if (time === 0) return 0;
  if (time >= 2) return 1;

  return 1 - Math.exp(-damping * time) * (
    Math.cos(frequency * time) + (damping / frequency) * Math.sin(frequency * time)
  );
}
