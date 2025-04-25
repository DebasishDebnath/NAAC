import React from "react";
import { Tooltip } from "recharts";

export function ChartContainer({ children }) {
  return <div className="w-full h-[300px]">{children}</div>;
}

export function ChartTooltip({ content, cursor }) {
  return <Tooltip content={content} cursor={cursor} />;
}

export function ChartTooltipContent({ payload, label, hideLabel }) {
  if (!payload || payload.length === 0) return null;

  return (
    <div className="rounded-md border bg-background p-2 shadow-sm">
      {!hideLabel && <p className="text-sm text-muted-foreground">{label}</p>}
      <div className="flex flex-col gap-1">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium">{entry.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
