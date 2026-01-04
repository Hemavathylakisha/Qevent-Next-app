"use client";
import { useRouter } from "next/navigation";

const Tag = ({ text }) => {
  const router = useRouter();

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        router.push(`/events?tag=${encodeURIComponent(text)}`);
      }}
      className="bg-gray-200 px-3 py-1 rounded-full text-sm hover:bg-gray-300"
    >
      #{text}
    </button>
  );
};

export default Tag;
