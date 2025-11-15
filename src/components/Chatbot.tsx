"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  options?: string[];
}

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Chatbot({ isOpen, onToggle }: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messageCounter, setMessageCounter] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const addBotMessage = useCallback((text: string, options?: string[]) => {
    setMessageCounter(prev => prev + 1);
    const message: Message = {
      id: `bot-${messageCounter}`,
      text,
      isBot: true,
      timestamp: new Date(),
      options
    };
    setMessages(prev => [...prev, message]);
  }, [messageCounter]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setTimeout(() => {
        addBotMessage(
          "Hey! 👋 I'm PupiBot, here to help with PUPITO questions. What do you need?",
          ["📦 Order/Shipping", "📏 Sizing Help", "↩️ Returns", "👥 Human Support"]
        );
      }, 500);
    }
  }, [isOpen, messages.length, addBotMessage]);

  const addUserMessage = useCallback((text: string) => {
    setMessageCounter(prev => prev + 1);
    const message: Message = {
      id: `user-${messageCounter}`,
      text,
      isBot: false,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  }, [messageCounter]);

  const handleBotResponse = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    // Order/Tracking - Direct to human help
    if (input.includes('order') || input.includes('track') || input.includes('shipping') || input.includes('delivery')) {
      return "For order tracking and shipping questions, our team can help you right away! 📦";
    }
    
    // Sizing - Quick answer with option for detailed help
    if (input.includes('size') || input.includes('fit') || input.includes('sizing')) {
      return "Our hoodies run slightly oversized for that streetwear look, tees are true to size. Need specific measurements? �";
    }
    
    // Returns/Exchanges - Clear policy
    if (input.includes('return') || input.includes('exchange') || input.includes('refund') || input.includes('problem') || input.includes('wrong') || input.includes('defect')) {
      return "We only accept returns for printing errors or quality defects since items are made-to-order. Have an issue with your order? �";
    }
    
    // Product questions
    if (input.includes('hoodie') || input.includes('shirt') || input.includes('tee') || input.includes('product') || input.includes('material')) {
      return "All PUPITO gear is made-to-order with premium materials and anime-inspired designs. Looking for something specific? 👕";
    }
    
    // Pricing
    if (input.includes('price') || input.includes('cost') || input.includes('discount') || input.includes('sale') || input.includes('cheap') || input.includes('expensive')) {
      return "Our prices include premium printing and materials. First-time buyers get 10% off with code FIRSTPUP! 💰";
    }
    
    // Direct human request
    if (input.includes('human') || input.includes('person') || input.includes('staff') || input.includes('representative') || input.includes('speak')) {
      return "I'll connect you with our team right now! Choose how you'd like to reach them: 👥";
    }
    
    // Greetings - Keep it short and direct
    if (input.includes('hello') || input.includes('hi') || input.includes('hey') || input.includes('sup')) {
      return "Hey there! 👋 I can help with sizing, orders, returns, or connect you with our team. What do you need?";
    }
    
    // Thanks
    if (input.includes('thank') || input.includes('thanks') || input.includes('appreciate')) {
      return "You're welcome! Need anything else? 😊";
    }
    
    // Default - Be direct about what you can help with
    return "I can help with sizing, orders, returns, or connect you with our team. What do you need? 🤔";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage = inputValue.trim();
    setInputValue("");
    addUserMessage(userMessage);
    
    // Show typing indicator
    setIsTyping(true);
    
    // Simulate thinking time
    setTimeout(() => {
      setIsTyping(false);
      const response = handleBotResponse(userMessage);
      
      // Add contextual options based on response type
      let options: string[] | undefined;
      if (userMessage.toLowerCase().includes('human')) {
        options = ["✅ Yes, connect me", "📧 Email instead", "💬 Keep chatting"];
      } else if (userMessage.toLowerCase().includes('size')) {
        options = ["📏 Size Guide", "📊 Size Chart", "💬 Ask Human"];
      } else if (userMessage.toLowerCase().includes('order')) {
        options = ["📦 Track Order", "📧 Email Support", "💬 Keep chatting"];
      }
      
      addBotMessage(response, options);
    }, 1000 + Math.random() * 1000); // 1-2 second response time
  };

  const handleOptionClick = (option: string) => {
    addUserMessage(option);
    
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      
      if (option.includes("connect me") || option.includes("Ask Human")) {
        addBotMessage(
          "Perfect! I'm connecting you with our human squad member. They'll be with you in just a moment! In the meantime, feel free to tell me what you need help with so I can pass along the context. 🤝",
          ["📧 Email Support", "📞 Contact Form", "💬 Keep chatting"]
        );
      } else if (option.includes("Size Guide") || option.includes("Size Chart")) {
        addBotMessage(
          "Here's the deal with sizing! 📏 Our hoodies run slightly oversized for that authentic streetwear look, while our tees are true to size. Would you like me to open the full size guide or help you with a specific item?",
          ["📖 Full Size Guide", "👕 Hoodie Sizes", "👔 Tee Sizes", "💬 Specific Item"]
        );
      } else if (option.includes("Track Order")) {
        addBotMessage(
          "To track your order, I'll need to connect you with our team since order details are secure! 📦 They can pull up your info instantly. Should I set up that connection?",
          ["✅ Yes please", "📧 Email instead"]
        );
      } else if (option.includes("Email")) {
        addBotMessage(
          "Great choice! Email is perfect for detailed questions. 📧 Our team responds within 4 hours and they're super helpful! Should I help you draft an email or direct you to the contact form?",
          ["📝 Contact Form", "💬 Draft Email", "🔙 Back to Chat"]
        );
      } else {
        addBotMessage(handleBotResponse(option));
      }
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.8, y: 20 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <div className={`bg-linear-to-br from-[#0D0D0D] to-[#1A1A1A] border border-[#FF69B4]/30 rounded-2xl shadow-[0_0_40px_rgba(255,105,180,0.3)] backdrop-blur ${isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'} transition-all duration-300`}>
          
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-[#FF69B4]/20">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="p-2 bg-linear-to-br from-[#FF69B4] to-[#FF1493] rounded-full">
                  <Bot className="w-5 h-5 text-black" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#32CD32] rounded-full border-2 border-[#0D0D0D]"></div>
              </div>
              <div>
                <h3 className="font-bold text-[#FF69B4] text-lg">PupiBot</h3>
                <p className="text-xs text-[#32CD32]">Online • Anime Expert</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="p-2 hover:bg-[#FF69B4]/10 rounded-lg transition-colors"
                aria-label={isMinimized ? "Maximize chatbot" : "Minimize chatbot"}
                title={isMinimized ? "Maximize chatbot" : "Minimize chatbot"}
              >
                {isMinimized ? <Maximize2 className="w-4 h-4 text-[#FFD700]" /> : <Minimize2 className="w-4 h-4 text-[#FFD700]" />}
              </button>
              <button
                onClick={onToggle}
                className="p-2 hover:bg-[#FF69B4]/10 rounded-lg transition-colors"
                aria-label="Close chatbot"
                title="Close chatbot"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[450px]">
                <AnimatePresence>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                    >
                      <div className={`flex items-end gap-2 max-w-[80%] ${message.isBot ? '' : 'flex-row-reverse'}`}>
                        <div className={`p-2 rounded-full shrink-0 ${message.isBot ? 'bg-linear-to-br from-[#FF69B4] to-[#FF1493]' : 'bg-linear-to-br from-[#00FFFF] to-[#1E90FF]'}`}>
                          {message.isBot ? <Bot className="w-4 h-4 text-black" /> : <User className="w-4 h-4 text-black" />}
                        </div>
                        <div>
                          <div className={`px-4 py-2 rounded-2xl ${message.isBot ? 'bg-[#1A1A1A] border border-[#FF69B4]/20' : 'bg-linear-to-r from-[#00FFFF] to-[#1E90FF] text-black'}`}>
                            <p className={`text-sm ${message.isBot ? 'text-white' : 'text-black'}`}>
                              {message.text}
                            </p>
                          </div>
                          
                          {/* Quick Options */}
                          {message.options && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {message.options.map((option, index) => (
                                <button
                                  key={index}
                                  onClick={() => handleOptionClick(option)}
                                  className="px-3 py-1 text-xs bg-[#FF69B4]/10 border border-[#FF69B4]/30 rounded-full text-[#FF69B4] hover:bg-[#FF69B4]/20 transition-colors"
                                >
                                  {option}
                                </button>
                              ))}
                            </div>
                          )}
                          
                          <p className="text-xs text-gray-500 mt-1">
                            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Typing Indicator */}
                <AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex justify-start"
                    >
                      <div className="flex items-end gap-2">
                        <div className="p-2 bg-linear-to-br from-[#FF69B4] to-[#FF1493] rounded-full">
                          <Bot className="w-4 h-4 text-black" />
                        </div>
                        <div className="px-4 py-2 bg-[#1A1A1A] border border-[#FF69B4]/20 rounded-2xl">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-[#FF69B4] rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-[#FF69B4] rounded-full animate-bounce [animation-delay:0.1s]"></div>
                            <div className="w-2 h-2 bg-[#FF69B4] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 border-t border-[#FF69B4]/20">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 bg-[#1A1A1A] border border-[#FF69B4]/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF69B4] focus:border-[#FF1493] transition-all"
                    disabled={isTyping}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="px-4 py-3 bg-linear-to-r from-[#FF69B4] to-[#FF1493] hover:from-[#1E90FF] hover:to-[#00FFFF] text-black hover:text-white rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Send message"
                    title="Send message"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex justify-center mt-2">
                  <p className="text-xs text-gray-500">
                    Powered by PUPITO AI • Anime streetwear specialist 🌟
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}