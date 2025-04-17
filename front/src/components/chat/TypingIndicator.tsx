
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { Microscope } from "lucide-react";

export default function TypingIndicator() {
  return (
    <div className="flex w-full gap-3 py-4">
      <div className="flex-shrink-0">
        <Avatar className="h-8 w-8 bg-primary text-primary-foreground">
          <Microscope size={16} />
        </Avatar>
      </div>
      
      <div className="chat-bubble-bot inline-flex items-center">
        <div className="typing-indicator">
          <span className="typing-indicator-dot"></span>
          <span className="typing-indicator-dot"></span>
          <span className="typing-indicator-dot"></span>
        </div>
      </div>
    </div>
  );
}
