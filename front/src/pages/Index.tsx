
import React from "react";
import Header from "@/components/layout/Header";
import ChatInterface from "@/components/chat/ChatInterface";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex flex-1 flex-col bg-[#f8f8f8]">
        <div className="container max-w-4xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-[#0b3c7c]">Gut Health Research Portal</h1>
            <p className="text-muted-foreground">
              An official resource for gut health information and research
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e2e8f0]">
              <h2 className="text-xl font-semibold mb-3 text-[#0b3c7c]">About this Portal</h2>
              <p className="text-muted-foreground">
                This portal provides research-backed information about gut health, 
                microbiome research, digestive conditions, and nutrition recommendations.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e2e8f0]">
              <h2 className="text-xl font-semibold mb-3 text-[#0b3c7c]">How to Use</h2>
              <ol className="list-decimal list-inside text-muted-foreground space-y-2">
                <li>Click the chat icon in the bottom right</li>
                <li>Ask any question about gut health</li>
                <li>Explore related questions for deeper insights</li>
                <li>View research context for transparency</li>
              </ol>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-[#e2e8f0] mb-8">
            <h2 className="text-xl font-semibold mb-3 text-[#0b3c7c]">Important Topics</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="p-3 bg-[#f1f5f9] rounded-md text-center text-[#0b3c7c]">Microbiome Diversity</div>
              <div className="p-3 bg-[#f1f5f9] rounded-md text-center text-[#0b3c7c]">Probiotics & Prebiotics</div>
              <div className="p-3 bg-[#f1f5f9] rounded-md text-center text-[#0b3c7c]">IBS Management</div>
              <div className="p-3 bg-[#f1f5f9] rounded-md text-center text-[#0b3c7c]">Diet & Gut Health</div>
              <div className="p-3 bg-[#f1f5f9] rounded-md text-center text-[#0b3c7c]">Gut-Brain Connection</div>
              <div className="p-3 bg-[#f1f5f9] rounded-md text-center text-[#0b3c7c]">Digestive Enzymes</div>
            </div>
          </div>

          <div className="bg-[#e9f7fe] p-4 rounded-lg border border-[#bde0fe] text-center">
            <p className="text-sm text-[#0b3c7c]">
              This portal is managed by the Research Department. For official inquiries, please contact <a href="mailto:contact@gutresearch.com" className="font-medium underline">contact@gutresearch.gov.in</a>
            </p>
          </div>
        </div>
      </main>
      
      <ChatInterface />
    </div>
  );
};

export default Index;
