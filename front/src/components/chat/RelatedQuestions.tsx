
import React from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb } from "lucide-react";

interface RelatedQuestionsProps {
  questions: string[];
  onSelect: (question: string) => void;
  isLoading?: boolean;
}

export default function RelatedQuestions({ 
  questions, 
  onSelect, 
  isLoading = false 
}: RelatedQuestionsProps) {
  if (questions.length === 0 && !isLoading) return null;

  return (
    <div className="mt-4 space-y-2">
      <div className="flex items-center gap-2">
        <Lightbulb size={16} className="text-muted-foreground" />
        <h3 className="text-sm font-medium text-muted-foreground">
          Related Questions
        </h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {isLoading ? (
          <>
            <Button variant="outline" size="sm" disabled className="animate-pulse h-8">
              Loading suggestions...
            </Button>
          </>
        ) : (
          questions.map((question, index) => (
            <Button 
              key={index} 
              variant="outline" 
              size="sm"
              className="h-auto py-1.5 text-xs text-left"
              onClick={() => onSelect(question)}
            >
              {question}
            </Button>
          ))
        )}
      </div>
    </div>
  );
}
