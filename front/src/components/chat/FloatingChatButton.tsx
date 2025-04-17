
import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FloatingChatButtonProps {
  isOpen: boolean;
  onClick: () => void;
}

export default function FloatingChatButton({ isOpen, onClick }: FloatingChatButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={cn(
        "fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg",
        "bg-[#0b3c7c] text-white hover:bg-[#0a2a5e] z-50 border-2 border-white",
      )}
    >
      {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
    </Button>
  );
}
