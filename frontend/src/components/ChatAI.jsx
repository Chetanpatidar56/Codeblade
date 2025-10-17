import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import {SendHorizontal, Bot, User, Sparkles } from "lucide-react";
import axiosClient from "../client/axiosClient";

function ChatAI({ problem }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamingMessageId, setStreamingMessageId] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const messagesEndRef = useRef(null);

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const onSubmit = async (data) => {
    const userMessage = { 
      id: Date.now(),
      role: "user", 
      parts: [{ text: data.message }],
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages((prev) => [...prev, userMessage]);
    reset();
    setIsLoading(true);

    try {
      const response = await axiosClient.post("/ai/chat", {
        messages: [...messages, userMessage],
        title: problem.title,
        description: problem.description,
        testcases: problem.visibletestcases,
        startcode: problem.startcode
      });

      const assistantMessageId = Date.now();
      setStreamingMessageId(assistantMessageId);
      setMessages((prev) => [
        ...prev,
        {
          id: assistantMessageId,
          role: "model",
          parts: [{ text: "" }],
          isStreaming: true,
          timestamp: new Date().toLocaleTimeString()
        },
      ]);

      const responseText = response.data.message;
      const words = responseText.split(" ");
      
      for (let i = 0; i < words.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 30));
        
        setMessages(prev => prev.map(msg => 
          msg.id === assistantMessageId 
            ? { 
                ...msg, 
                parts: [{ text: words.slice(0, i + 1).join(" ") }] 
              }
            : msg
        ));
      }
      
      setMessages(prev => prev.map(msg => 
        msg.id === assistantMessageId 
          ? { ...msg, isStreaming: false }
          : msg
      ));
      setStreamingMessageId(null);
      
    } catch (error) {
      console.error("API Error", error);
      setMessages((prev) => [
        ...prev,
        { 
          id: Date.now(),
          role: "model", 
          parts: [{ text: "Sorry, I encountered an error. Please try again." }],
          timestamp: new Date().toLocaleTimeString()
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-[80vh] rounded-lg overflow-hidden transition-colors duration-300 ${
      darkMode ? 'bg-[#1e1e1e]' : 'bg-white'
    }`}>
      {/* Header */}
      <div className={`p-4 border-b flex items-center flex-shrink-0 transition-colors duration-300 ${
        darkMode ? 'bg-[#252526] border-[#3c3c3c]' : 'bg-gray-50 border-gray-200'
      }`}>
        <div className={`p-2 rounded-full mr-3 ${
          darkMode ? 'bg-blue-900/30' : 'bg-blue-50'
        }`}>
          <Sparkles size={20} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
        </div>
        <div>
          <h3 className={`font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
            AI Coding Assistant
          </h3>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Ask for help with {problem?.title || 'this problem'}
          </p>
        </div>
      </div>

      {/* Chat messages */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-6 ${
        darkMode ? 'bg-[#1e1e1e]' : 'bg-white'
      }`}>
        {messages.length === 0 && (
          <div className="text-center mt-10 px-4">
            <div className={`inline-flex p-3 rounded-full mb-4 ${
              darkMode ? 'bg-blue-900/30' : 'bg-blue-50'
            }`}>
              <Bot size={24} className={darkMode ? 'text-blue-400' : 'text-blue-600'} />
            </div>
            <h3 className={`font-semibold text-lg mb-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Hello! I'm your AI coding assistant
            </h3>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Ask me anything about the problem, request hints, or get code review
            </p>
          </div>
        )}
        
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div className={`flex max-w-[85%] ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
             
              <div className="flex-1">
                <div className={`px-4 py-3 rounded-2xl transition-colors duration-300 ${
                  msg.role === "user" 
                    ? darkMode
                      ? "bg-blue-900/30 text-gray-200 rounded-br-md border border-blue-700/30"
                      : "bg-blue-500 text-white rounded-br-md"
                    : darkMode
                      ? "bg-[#252526] text-gray-200 rounded-bl-md border border-[#3c3c3c]"
                      : "bg-gray-100 text-gray-900 rounded-bl-md"
                }`}>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {msg.parts[0].text}
                  </div>
                  {msg.isStreaming && (
                    <span className={`ml-1 animate-pulse ${
                      darkMode ? 'text-blue-400' : 'text-blue-600'
                    }`}>|</span>
                  )}
                </div>
                <div className={`text-xs mt-1 ${
                  msg.role === "user" ? "text-right" : "text-left"
                } ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                  {msg.timestamp}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input box */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`p-4 border-t flex-shrink-0 transition-colors duration-300 ${
          darkMode ? 'bg-[#252526] border-[#3c3c3c]' : 'bg-gray-50 border-gray-200'
        }`}
      >
        <div className="flex items-center gap-2">
          <input
            placeholder={`Ask about ${problem?.title || 'this problem'}...`}
            className={`flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
              darkMode
                ? 'bg-[#1e1e1e] border-[#3c3c3c] text-gray-200 placeholder-gray-500'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-400'
            }`}
            {...register("message", { required: true, minLength: 1 })}
            disabled={isLoading}
          />

          <button
            type="submit"
            className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
              darkMode
                ? 'bg-blue-600 hover:bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
            disabled={errors.message || isLoading || streamingMessageId !== null}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              
              <SendHorizontal size={20} />
            )}
            
          </button>
        </div>
        {errors.message && (
          <p className={`text-xs mt-2 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
            Please enter a message
          </p>
        )}
        <p className={`text-xs mt-2 text-center ${
          darkMode ? 'text-gray-500' : 'text-gray-400'
        }`}>
          I can explain problems, provide hints, review code, and suggest solutions
        </p>
      </form>
    </div>
  );
}

export default ChatAI;
