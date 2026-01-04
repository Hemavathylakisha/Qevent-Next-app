"use client";

import { useEffect, useState } from "react";
import Tag from "@/components/Tag";

const TAGS_API = "https://qevent-backend.labs.crio.do/tags";

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTags() {
      try {
        const res = await fetch(TAGS_API);
        const data = await res.json();
        setTags(data);
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchTags();
  }, []);

  if (loading) {
    return <p className="text-center mt-10 text-xl">Loading tags...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Tags</h1>

      {/* Tags Layout */}
      <div className="flex flex-wrap gap-4">
        {tags.map((tag) => (
          <Tag key={tag.id} text={tag.name} />
        ))}
      </div>
    </div>
  );
}
