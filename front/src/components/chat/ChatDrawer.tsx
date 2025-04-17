
import React from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import ChatContainer from "./ChatContainer";
import ChatInput from "./ChatInput";
import RelatedQuestions from "./RelatedQuestions";
import ContextDisplay from "./ContextDisplay";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { MessageType } from "./ChatMessage";
import { useIsMobile } from "@/hooks/use-mobile";

interface ChatDrawerProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  messages: MessageType[];
  isLoading: boolean;
  onSend: (message: string) => void;
  relatedQuestions: string[];
  onRelatedQuestionClick: (question: string) => void;
  context: string;
  showContext: boolean;
  toggleContext: () => void;
}

export default function ChatDrawer({
  isOpen,
  onOpenChange,
  messages,
  isLoading,
  onSend,
  relatedQuestions,
  onRelatedQuestionClick,
  context,
  showContext,
  toggleContext,
}: ChatDrawerProps) {
  const isMobile = useIsMobile();

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent 
        className={`p-0 gap-0 flex flex-col ${isMobile ? "w-full" : "w-[400px]"} h-[600px] border-l-2 border-l-[#0b3c7c]`} 
        side="right"
      >
        <div className="flex flex-1 flex-col h-full overflow-hidden">
          <div className="bg-[#0b3c7c] p-3">
            <h2 className="text-lg font-semibold text-white">Gut Health Assistant</h2>
            <p className="text-xs text-white/80">
              Official Research Assistant Portal
            </p>
          </div>
          
          <div className="flex flex-1 flex-col overflow-hidden">
            <ChatContainer messages={messages} isLoading={isLoading} />
            
            <div className="px-3 pb-3">
              {context && messages.length > 0 && (
                <div className="mb-2 flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs border-[#0b3c7c] text-[#0b3c7c]"
                    onClick={toggleContext}
                  >
                    <FileText size={14} className="mr-1" />
                    {showContext ? "Hide Research Context" : "Show Research Context"}
                  </Button>
                </div>
              )}
              
              <ContextDisplay context={context} isVisible={showContext} />
              
              <RelatedQuestions
                questions={relatedQuestions}
                onSelect={onRelatedQuestionClick}
                isLoading={isLoading && messages.length > 0 && messages[messages.length - 1].role === "user"}
              />
              
              <ChatInput onSend={onSend} disabled={isLoading} />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
