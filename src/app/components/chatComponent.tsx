"use client";
import { useChat } from "@ai-sdk/react";
import { useEffect, useRef } from "react";
import clsx from "clsx";
import Link from "next/link";

export default function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: "/api/chat",
      onFinish: (msg) => console.log("🟢 onFinish callback:", msg),
    });

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className=" h-screen flex flex-col bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 px-4 py-6">
      {/* Header */}
      <header className="text-center text-xl font-semibold mb-4">
        <Link
          href="/"
          className="text-2xl hover:underline text-[#2a48cc] dark:text-[#9DB4C6] transition-colors duration-200"
        >
          🏛️ MiniArchi
        </Link>
        <span className="ml-2 text-md">~ Your Architecture Assistant</span>
      </header>

      {/* Chat message area */}
      <div className=" shadow-xl flex-1 overflow-y-auto space-y-3 rounded-xl p-4 bg-gray-100 dark:bg-neutral-800/60 border dark:border-neutral-700 backdrop-blur-sm">
        {messages.map((m, i) => (
          <div
            key={i}
            className={clsx(
              "shadow-xl max-w-[75%] p-3 rounded-2xl text-sm whitespace-pre-wrap",
              "transition-transform duration-300 ease-in-out",
              m.role === "user"
                ? " ml-auto bg-blue-600 text-white shadow-lg rounded-br-sm"
                : "mr-auto bg-neutral-200 dark:bg-neutral-700 text-black dark:text-white shadow-lg rounded-bl-sm"
            )}
          >
            {m.content}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Chat input area */}
      <form
        onSubmit={handleSubmit}
        className="shadow-lg mt-4 flex gap-2 items-stretch border-t pt-4 dark:border-neutral-700"
      >
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Type your architectural idea or question…"
          rows={2}
          className="shadow-mg py-2 flex-1 resize-none text-lg font-medium rounded-lg p-5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className={clsx(
            "shadow-md h-full w-[90] min-h-[48px] px-4 py-2 rounded-md text-lg font-medium transition-colors",
            isLoading || !input.trim()
              ? "bg-blue-300 text-white cursor-not-allowed shadow-md"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-md"
          )}
        >
          {isLoading && (
            <div className="flex items-center justify-center gap-1">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce"></span>
            </div>
          )}
          ➥
        </button>
      </form>
    </div>
  );
}
