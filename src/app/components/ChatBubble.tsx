export default function ChatBubble({ role, content }: { role: string, content: string }) {
  const isUser = role === "user";
  return (
    <div className={`my-2 flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div className={`p-3 rounded-xl max-w-xs whitespace-pre-wrap ${isUser ? "bg-blue-600 text-white" : "bg-gray-200 text-black"}`}>
        <p>{content}</p>
      </div>
    </div>
  );
}
