"use client";
import { useChat } from "@ai-sdk/react";
import { useEffect, useRef } from "react";
import clsx from "clsx";

export default function ChatComponent() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/chat",
    onFinish: (msg) => console.log("🟢 onFinish callback:", msg),
  });

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="h-screen flex flex-col bg-neutral-100 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 px-4 py-6">
      {/* Header */}
      <header className="text-center text-xl font-semibold mb-4">
        🏛️ MiniArchi – Your Architecture Assistant
      </header>

      {/* Chat message area */}
      <div className="flex-1 overflow-y-auto space-y-3 rounded-lg p-4 bg-white dark:bg-neutral-800 shadow-inner border dark:border-neutral-700">
        {messages.map((m, i) => (
          <div
            key={i}
            className={clsx(
              "max-w-[75%] p-3 rounded-xl text-sm whitespace-pre-wrap shadow-sm",
              m.role === "user"
                ? "ml-auto bg-blue-600 text-white"
                : "mr-auto bg-neutral-200 dark:bg-neutral-700"
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
        className="mt-4 flex gap-2 items-end border-t pt-4 dark:border-neutral-700"
      >
        <textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Type your architectural idea or question…"
          rows={2}
          className="flex-1 resize-none rounded-md bg-white dark:bg-neutral-800 p-3 text-sm border border-neutral-300 dark:border-neutral-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={isLoading || !input.trim()}
          className={clsx(
            "px-4 py-2 rounded-md text-sm font-medium transition-colors",
            isLoading || !input.trim()
              ? "bg-blue-300 text-white cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 text-white"
          )}
        >
          {isLoading ? "..." : "Send"}
        </button>
      </form>
    </div>
  );
}
