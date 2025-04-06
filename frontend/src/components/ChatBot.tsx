import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, MinimizeIcon } from 'lucide-react';
import { QualificationForm } from './QualificationForm';
import { toast } from "sonner";

interface Message {
  type: 'bot' | 'user';
  content: string;
}

interface LeadData {
  name: string;
  email: string;
  companyName: string;
  industry: string;
  submittedAt: string;
}

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', content: "Hi! I'm here to help you learn about The APEX program. What would you like to know?" }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showQualificationForm, setShowQualificationForm] = useState(false);
  const [leadData, setLeadData] = useState<LeadData | null>(null);

  // Updated Zapier webhook URL
  const zapierLeadStorageUrl = "https://hooks.zapier.com/hooks/catch/21967734/2l3ubkn/";

  const storeLeadData = async (leadData: LeadData) => {
    try {
      // Format the data to match expected webhook format
      const formattedData = {
        name: leadData.name || "",
        email: leadData.email || "",
        companyName: leadData.companyName || "",
        industry: leadData.industry || "",
        source: "Chatbot",
        submittedAt: new Date().toISOString(),
        monthlyRevenue: "Unknown", // Consistently naming the revenue field
        phone: "Unknown", // Adding this field for consistency
        companySize: "Unknown" // Adding this field for consistency
      };
      
      console.log("CHATBOT: Formatted data being sent to Zapier:", formattedData);
      console.log("CHATBOT: Monthly Revenue value:", formattedData.monthlyRevenue); // Add explicit logging
      
      const response = await fetch(zapierLeadStorageUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "no-cors", // Handle CORS for Zapier
        body: JSON.stringify(formattedData),
      });
      
      console.log("CHATBOT: Lead data sent to storage. Response cannot be read due to no-cors mode.");
      return true;
    } catch (error) {
      console.error("CHATBOT: Error storing chatbot lead data:", error);
      return false;
    }
  };

  useEffect(() => {
    const savedLeadData = localStorage.getItem('leadData');
    if (savedLeadData) {
      setLeadData(JSON.parse(savedLeadData));
    }
  }, []);

  const getResponse = (message: string): string => {
    const lowerCase = message.toLowerCase();
    
    if (lowerCase.includes('pricing') || lowerCase.includes('cost') || lowerCase.includes('investment') || lowerCase.includes('price')) {
      if (!leadData) {
        setShowLeadForm(true);
        return "I'd be happy to discuss pricing. First, could you please share your contact information?";
      } else {
        setShowQualificationForm(true);
        return "Let's check if you qualify for the program, and then we can discuss specific pricing during our consultation.";
      }
    }

    if (lowerCase.includes('qualify') || lowerCase.includes('qualification') || lowerCase.includes('eligible')) {
      if (!leadData) {
        setShowLeadForm(true);
        return "I'll help you check if you qualify. First, please share your contact information.";
      } else {
        setShowQualificationForm(true);
        return "Great! Let's check if you qualify for the program.";
      }
    }

    if (lowerCase.includes('duration') || lowerCase.includes('how long') || lowerCase.includes('timeline')) {
      return "The APEX program runs for 12 weeks. During this time, we work intensively with your agency to implement proven growth systems.";
    }

    if (lowerCase.includes('process') || lowerCase.includes('how does it work')) {
      return "The program follows three phases: 1) Strategic Assessment & Planning, 2) Implementation & Systems Setup, and 3) Optimization & Scale. We work closely with you throughout each phase.";
    }

    if (lowerCase.includes('results') || lowerCase.includes('what can i expect')) {
      return "Our clients typically achieve significant growth during the 12-week program. Many agencies see substantial increases in monthly revenue and improved operational efficiency.";
    }

    return "I can tell you about our program duration, process, expected results, or qualification criteria. What would you like to know specifically?";
  };

  const handleLeadSubmit = async (formData: LeadData) => {
    console.log("CHATBOT: Submitting lead data:", formData);
    
    // Store the lead data using Zapier
    const success = await storeLeadData(formData);
    
    if (success) {
      toast.success("Information submitted successfully!");
    } else {
      toast.error("There was an issue submitting your information.");
    }
    
    setLeadData(formData);
    setShowLeadForm(false);
    localStorage.setItem('leadData', JSON.stringify(formData));
    setShowQualificationForm(true);
    setMessages(prev => [...prev, 
      { type: 'bot', content: `Thanks ${formData.name}! Let's check if you qualify for our program.` }
    ]);
  };

  const handleSend = () => {
    if (!inputMessage.trim()) return;

    const userMessage = { type: 'user' as const, content: inputMessage };
    setMessages(prev => [...prev, userMessage]);
    
    setTimeout(() => {
      const botResponse = { type: 'bot' as const, content: getResponse(inputMessage) };
      setMessages(prev => [...prev, botResponse]);
    }, 500);

    setInputMessage('');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg w-[380px] h-[500px] flex flex-col">
          <div className="bg-navy p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="text-white font-semibold">Brad Partners Assistant</h3>
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:text-cream"
                onClick={() => setIsOpen(false)}
              >
                <MinimizeIcon className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon"
                className="text-white hover:text-cream"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-accent text-white'
                      : 'bg-gray-100 text-navy'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}

            {showLeadForm && !leadData && (
              <div className="bg-cream p-4 rounded-lg">
                <h4 className="font-semibold mb-3">Please share your details:</h4>
                <div className="space-y-3">
                  <Input
                    placeholder="Name"
                    onChange={(e) => setLeadData(prev => ({ ...prev!, name: e.target.value }))}
                  />
                  <Input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setLeadData(prev => ({ ...prev!, email: e.target.value }))}
                  />
                  <Input
                    placeholder="Company Name"
                    onChange={(e) => setLeadData(prev => ({ ...prev!, companyName: e.target.value }))}
                  />
                  <Input
                    placeholder="Industry"
                    onChange={(e) => setLeadData(prev => ({ ...prev!, industry: e.target.value }))}
                  />
                  <Button 
                    className="w-full"
                    onClick={() => {
                      if (leadData?.name && leadData.email && leadData.companyName && leadData.industry) {
                        handleLeadSubmit(leadData);
                      } else {
                        toast.error("Please fill in all fields");
                      }
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            )}

            {showQualificationForm && (
              <div className="bg-cream p-4 rounded-lg">
                <QualificationForm />
              </div>
            )}
          </div>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              />
              <Button onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          className="rounded-full h-16 w-16 bg-accent hover:bg-accent-light shadow-lg hover:shadow-xl hover:shadow-accent/20 transition-all duration-300"
        >
          <MessageCircle className="h-7 w-7" />
        </Button>
      )}
    </div>
  );
};
