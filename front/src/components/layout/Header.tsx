
import React from "react";
import { Microscope } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary">
          <Microscope className="text-primary-foreground" size={20} />
        </div>
        <div>
          <h1 className="text-lg font-semibold">Gut Research Assistant</h1>
          <p className="text-xs text-muted-foreground">Your AI companion for gut health</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground hidden sm:inline-block">
          Powered by Advanced RAG Technology
        </span>
      </div>
    </header>
  );
}
