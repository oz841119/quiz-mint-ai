import { cn } from "@/lib/utils";

export const PingAnimation = ({ className }: { className?: string }) => {
  return (
    <div className={cn("relative size-3 flex", className)}>
      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
      <span className="relative inline-flex size-3 rounded-full bg-green-500" />
    </div>
  );
};
