"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import EventCard from "@/components/EventCard";

const EVENTS_API = "https://qevent-backend.labs.crio.do/events";

export default function EventsPage() {
  const searchParams = useSearchParams();
  const artist = searchParams.get("artist");
  const tag = searchParams.get("tag");

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(EVENTS_API);
        const data = await res.json();

        // ✅ FIXED
        let filteredEvents = Array.isArray(data) ? data : [];

        if (artist) {
          filteredEvents = filteredEvents.filter(
            (event) =>
              event.artist &&
              event.artist.toLowerCase().trim() ===
                decodeURIComponent(artist).toLowerCase().trim()
          );
        }

        if (tag) {
          filteredEvents = filteredEvents.filter(
            (event) =>
              Array.isArray(event.tags) &&
              event.tags.some(
                (t) => t.toLowerCase() === tag.toLowerCase()
              )
          );
        }

        setEvents(filteredEvents);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, [artist, tag]);

  if (loading) {
    return <p className="text-center mt-10 text-xl">Loading events...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">
        {artist && `Events by ${decodeURIComponent(artist)}`}
        {tag && `Events for #${tag}`}
        {!artist && !tag && "All Events"}
      </h1>

      <div className="flex flex-wrap justify-center">
        {events.length > 0 ? (
          events.map((event) => (
            <EventCard key={event._id} eventData={event} />
          ))
        ) : (
          <p className="text-gray-500 text-xl">No events found</p>
        )}
      </div>
    </div>
  );
}
