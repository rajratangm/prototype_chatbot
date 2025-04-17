
import React from "react";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Microscope, User } from "lucide-react";

export type MessageType = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

interface ChatMessageProps {
  message: MessageType;
  isLast?: boolean;
}

export default function ChatMessage({ message, isLast = false }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={cn("flex w-full gap-3 py-4", isUser ? "justify-end" : "justify-start")}>
      {!isUser && (
        <div className="flex-shrink-0">
          <Avatar className="h-8 w-8 bg-[#0b3c7c] text-white">
            <Microscope size={16} />
          </Avatar>
        </div>
      )}
      
      <div className={cn("flex max-w-[80%] flex-col", isUser ? "items-end" : "items-start")}>
        <div className={isUser ? "chat-bubble-user" : "chat-bubble-bot"}>
          <div className="whitespace-pre-wrap break-words">{message.content}</div>
        </div>
        <span className="mt-1 text-xs text-muted-foreground">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>

      {isUser && (
        <div className="flex-shrink-0">
          <Avatar className="h-8 w-8 bg-[#edf2f7] text-[#0b3c7c] border border-[#c8d6e5]">
            <User size={16} />
          </Avatar>
        </div>
      )}
    </div>
  );
}
