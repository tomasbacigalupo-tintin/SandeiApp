import * as React from "react";
import { cn } from "@/lib/utils";

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse bg-muted rounded-md", className)} />;
}

export default Skeleton;
