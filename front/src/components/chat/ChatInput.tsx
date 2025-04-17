
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export default function ChatInput({ onSend, disabled = false, placeholder = "Ask about gut health..." }: ChatInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex w-full items-end gap-2 border-t bg-background p-4">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="min-h-12 max-h-36 resize-none border-[#c8d6e5]"
        disabled={disabled}
      />
      <Button 
        onClick={handleSend} 
        size="icon" 
        disabled={!message.trim() || disabled}
        className={cn(
          "flex-shrink-0 rounded-full h-12 w-12",
          message.trim() && !disabled ? "bg-[#0b3c7c] hover:bg-[#0a2a5e]" : "bg-muted text-muted-foreground"
        )}
      >
        <SendHorizontal size={18} />
      </Button>
    </div>
  );
}
