
import React, { useState, useEffect } from "react";
import FloatingChatButton from "./FloatingChatButton";
import ChatDrawer from "./ChatDrawer";
import { backendService, createNewMessage } from "@/lib/openai";
import { MessageType } from "./ChatMessage";
import { useToast } from "@/hooks/use-toast";

export default function ChatInterface() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState("");
  const [showContext, setShowContext] = useState(false);
  const [relatedQuestions, setRelatedQuestions] = useState<string[]>([]);
  const { toast } = useToast();

  // Show greeting message when chat first opens
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = createNewMessage(
        "assistant",
        `नमस्ते! 🙏 Welcome to the Gut Health Research Portal. How may I assist you today? You can ask me about gut health, digestion, nutrition, or related research.`
      );
      setMessages([greeting]);
    }
  }, [isOpen, messages.length]);

  const handleSendMessage = async (content: string) => {
    const userMessage = createNewMessage("user", content);
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setRelatedQuestions([]);

    try {
      const { answer, context, relatedQuestions } = await backendService.generateResponse(content);
      
      const botMessage = createNewMessage("assistant", answer);
      setMessages((prev) => [...prev, botMessage]);
      setContext(context);
      setRelatedQuestions(relatedQuestions);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get a response. Please check if the backend server is running.",
        variant: "destructive"
      });
      const errorMessage = createNewMessage(
        "assistant", 
        "I'm sorry, I encountered an error processing your request. Please check if the backend server is running correctly."
      );
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRelatedQuestionClick = (question: string) => {
    handleSendMessage(question);
  };

  const toggleContext = () => {
    setShowContext(!showContext);
  };

  return (
    <>
      <FloatingChatButton 
        isOpen={isOpen} 
        onClick={() => setIsOpen(!isOpen)} 
      />
      
      <ChatDrawer
        isOpen={isOpen}
        onOpenChange={setIsOpen}
        messages={messages}
        isLoading={isLoading}
        onSend={handleSendMessage}
        relatedQuestions={relatedQuestions}
        onRelatedQuestionClick={handleRelatedQuestionClick}
        context={context}
        showContext={showContext}
        toggleContext={toggleContext}
      />
    </>
  );
}
