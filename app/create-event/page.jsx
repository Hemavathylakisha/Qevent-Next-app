"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const CREATE_EVENT_API = "https://qevent-backend.labs.crio.do/events";

export default function CreateEventPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    location: "",
    artist: "",
    tags: "",
    date: "",
  });

  // 🔒 Protect route
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/events");
    }
  }, [status, router]);

  if (status === "loading") {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!session) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEventCreate = async (e) => {
    e.preventDefault();

    const payload = {
      id: Date.now(),
      name: formData.name,
      location: formData.location,
      artist: formData.artist,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      date: formData.date,
      image: Math.floor(Math.random() * 99) + 1,
    };

    try {
      const res = await fetch(CREATE_EVENT_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Event creation failed");
      }

      // ✅ Redirect to events page
      router.push("/events");
    } catch (error) {
      alert("Event creation failed");
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Create Event</h1>

      <form onSubmit={handleEventCreate} className="space-y-4">
        <input
          name="name"
          placeholder="Event Name"
          required
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="location"
          placeholder="Location"
          required
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="artist"
          placeholder="Artist Name"
          required
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="tags"
          placeholder="Tags (comma separated)"
          required
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          type="date"
          name="date"
          required
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-orange-400 to-teal-600 text-white px-6 py-2 rounded"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}
