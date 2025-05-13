import * as React from "react"

export function Card({ children, className }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={`bg-white rounded-lg shadow ${className}`}>{children}</div>
}

export function CardHeader({ children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="p-4 border-b">{children}</div>
}

export function CardTitle({ children }: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h2 className="text-lg font-bold">{children}</h2>
}

export function CardContent({ children }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className="p-4">{children}</div>
}
