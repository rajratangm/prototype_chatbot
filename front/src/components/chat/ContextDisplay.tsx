
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileText } from "lucide-react";

interface ContextDisplayProps {
  context: string;
  isVisible: boolean;
}

export default function ContextDisplay({ 
  context, 
  isVisible 
}: ContextDisplayProps) {
  if (!isVisible || !context) return null;

  return (
    <Card className="mt-4">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm flex items-center gap-2">
          <FileText size={16} className="text-muted-foreground" />
          Retrieved Context
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <ScrollArea className="h-[200px]">
          <div className="text-sm text-muted-foreground whitespace-pre-wrap">
            {context}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
