
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Key } from "lucide-react";
import { openAIService } from "@/lib/openai";
import { useToast } from "@/hooks/use-toast";

interface APIKeyFormProps {
  onSubmit: () => void;
}

export default function APIKeyForm({ onSubmit }: APIKeyFormProps) {
  const [apiKey, setApiKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (!apiKey.trim().startsWith("sk-")) {
        toast({
          title: "Invalid API Key",
          description: "Please enter a valid OpenAI API key starting with 'sk-'",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }

      openAIService.setApiKey(apiKey.trim());
      
      toast({
        title: "API Key Set",
        description: "Your OpenAI API key has been set successfully",
      });
      
      onSubmit();
    } catch (error) {
      console.error("Error setting API key:", error);
      toast({
        title: "Error Setting API Key",
        description: "There was an error setting your API key. Please try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key size={20} className="text-primary" />
          API Key Required
        </CardTitle>
        <CardDescription>
          Please provide your OpenAI API key to use the chat functionality.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter your OpenAI API key (sk-...)"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              required
            />
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
              <p>
                Your API key is stored locally in your browser and is only used to make requests to the OpenAI API.
                For production, you should move API calls to a secure backend.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isSubmitting || !apiKey.trim()}
          >
            {isSubmitting ? "Setting Key..." : "Submit API Key"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
