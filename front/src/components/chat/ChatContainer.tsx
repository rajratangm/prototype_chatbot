
import React, { useRef, useEffect } from "react";
import ChatMessage, { MessageType } from "./ChatMessage";
import TypingIndicator from "./TypingIndicator";

interface ChatContainerProps {
  messages: MessageType[];
  isLoading?: boolean;
}

export default function ChatContainer({ messages, isLoading = false }: ChatContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  return (
    <div 
      ref={containerRef}
      className="flex flex-1 flex-col overflow-y-auto p-4 scroll-smooth"
    >
      {messages.length === 0 ? (
        <div className="flex flex-1 items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground">Welcome to Gut Research Assistant</h2>
            <p className="mt-2 text-muted-foreground">
              Ask any questions about gut health and research
            </p>
          </div>
        </div>
      ) : (
        <>
          {messages.map((message, index) => (
            <ChatMessage 
              key={message.id} 
              message={message} 
              isLast={index === messages.length - 1}
            />
          ))}
          {isLoading && <TypingIndicator />}
        </>
      )}
    </div>
  );
}
