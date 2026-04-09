"use client";

import { useState } from "react";
import { useLocale } from "@/lib/locale-context";

type Message = {
  from: "bot" | "user";
  text: string;
};

const quickReplies = {
  en: ["Tell me about yourself", "What's your tech stack?", "How to contact you?"],
  id: ["Ceritakan tentang dirimu", "Apa tech stack-mu?", "Bagaimana menghubungimu?"],
};

const botResponses: Record<string, { en: string; id: string }> = {
  "Tell me about yourself": {
    en: "I'm a Software Engineer with a degree in Information Systems. I focus on building clean, performant web apps using React, Next.js, and TypeScript.",
    id: "Saya seorang Software Engineer lulusan Sistem Informasi. Saya fokus membangun aplikasi web yang clean dan performant menggunakan React, Next.js, dan TypeScript.",
  },
  "Ceritakan tentang dirimu": {
    en: "I'm a Software Engineer with a degree in Information Systems. I focus on building clean, performant web apps using React, Next.js, and TypeScript.",
    id: "Saya seorang Software Engineer lulusan Sistem Informasi. Saya fokus membangun aplikasi web yang clean dan performant menggunakan React, Next.js, dan TypeScript.",
  },
  "What's your tech stack?": {
    en: "React, Next.js, TypeScript, Laravel, Tailwind CSS, PostgreSQL, and Go. I'm always learning new things!",
    id: "React, Next.js, TypeScript, Laravel, Tailwind CSS, PostgreSQL, dan Go. Saya selalu belajar hal baru!",
  },
  "Apa tech stack-mu?": {
    en: "React, Next.js, TypeScript, Laravel, Tailwind CSS, PostgreSQL, and Go. I'm always learning new things!",
    id: "React, Next.js, TypeScript, Laravel, Tailwind CSS, PostgreSQL, dan Go. Saya selalu belajar hal baru!",
  },
  "How to contact you?": {
    en: "You can reach me via email or connect on LinkedIn and GitHub. Scroll down to the Contact section!",
    id: "Kamu bisa menghubungi saya via email atau terhubung di LinkedIn dan GitHub. Scroll ke bagian Contact!",
  },
  "Bagaimana menghubungimu?": {
    en: "You can reach me via email or connect on LinkedIn and GitHub. Scroll down to the Contact section!",
    id: "Kamu bisa menghubungi saya via email atau terhubung di LinkedIn dan GitHub. Scroll ke bagian Contact!",
  },
};

const defaultResponse = {
  en: "Thanks for your message! This is a static bot for now — feel free to reach out via the Contact section below.",
  id: "Terima kasih atas pesanmu! Bot ini masih statis — silakan hubungi saya via bagian Contact di bawah.",
};

export default function ChatWidget() {
  const { locale } = useLocale();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "bot",
      text:
        locale === "en"
          ? "Hi! I'm Arik's portfolio bot. Ask me anything or pick a question below."
          : "Hai! Saya bot portfolio Arik. Tanya apa saja atau pilih pertanyaan di bawah.",
    },
  ]);

  const addBotReply = (response: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: response }]);
      setIsTyping(false);
    }, 800);
  };

  const handleQuickReply = (reply: string) => {
    const response = botResponses[reply]?.[locale] ?? defaultResponse[locale];
    setMessages((prev) => [...prev, { from: "user", text: reply }]);
    addBotReply(response);
  };

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages((prev) => [...prev, { from: "user", text }]);
    const matched = botResponses[text]?.[locale];
    addBotReply(matched ?? defaultResponse[locale]);
  };

  const replies = quickReplies[locale];
  const usedReplies = messages.filter((m) => m.from === "user").map((m) => m.text);
  const availableReplies = replies.filter((r) => !usedReplies.includes(r));

  return (
    <>
      {/* Chat bubble button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label="Chat"
        className={`fixed right-6 bottom-20 z-30 flex h-10 w-10 items-center justify-center border bg-white/80 backdrop-blur-sm transition-all duration-300 hover:border-black ${
          open ? "border-black" : "border-gray-200"
        }`}
      >
        {open ? (
          <svg className="h-4 w-4 text-black" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="h-4 w-4 text-black" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12c0 4.97-4.03 9-9 9a9.07 9.07 0 01-3.83-.85L3 21l.85-5.17A9.07 9.07 0 013 12c0-4.97 4.03-9 9-9s9 4.03 9 9z" />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed right-6 bottom-32 z-30 flex w-80 flex-col border border-gray-200 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-gray-100 px-4 py-3">
            <p className="text-sm font-medium text-black">Arik&apos;s Bot</p>
            <p className="text-xs text-gray-400">
              {locale === "en" ? "Ask me anything" : "Tanya apa saja"}
            </p>
          </div>

          {/* Messages */}
          <div className="flex max-h-72 flex-col gap-3 overflow-y-auto px-4 py-4">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`max-w-[85%] px-3 py-2 text-sm leading-relaxed ${
                  msg.from === "bot"
                    ? "self-start bg-gray-50 text-gray-700"
                    : "self-end bg-black text-white"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="flex gap-1 self-start px-3 py-2">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:0ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:150ms]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-400 [animation-delay:300ms]" />
              </div>
            )}
          </div>

          {/* Quick replies */}
          {availableReplies.length > 0 && !isTyping && (
            <div className="flex flex-wrap gap-2 border-t border-gray-100 px-4 py-3">
              {availableReplies.map((reply) => (
                <button
                  key={reply}
                  onClick={() => handleQuickReply(reply)}
                  className="border border-gray-200 px-3 py-1.5 text-xs text-gray-600 transition-colors hover:border-black hover:text-black"
                >
                  {reply}
                </button>
              ))}
            </div>
          )}

          {/* Input field */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex border-t border-gray-100"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={locale === "en" ? "Type a message..." : "Ketik pesan..."}
              className="flex-1 px-4 py-3 text-sm outline-none placeholder:text-gray-300"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={isTyping || !input.trim()}
              className="px-4 text-gray-400 transition-colors hover:text-black disabled:text-gray-200"
              aria-label="Send"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
