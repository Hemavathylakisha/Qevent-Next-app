"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import EventCard from "@/components/EventCard";

const EVENTS_API = "https://qevent-backend.labs.crio.do/events";

export default function EventsClient() {
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

        let filteredEvents = data.events ?? [];

        if (artist) {
          filteredEvents = filteredEvents.filter(
            (event) =>
              event.artist &&
              event.artist.toLowerCase() ===
                decodeURIComponent(artist).toLowerCase()
          );
        }

        if (tag) {
          filteredEvents = filteredEvents.filter(
            (event) =>
              Array.isArray(event.tags) &&
              event.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
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
    return <p className="text-center mt-10">Loading events...</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">
        {artist && `Events by ${artist}`}
        {tag && `Events for #${tag}`}
        {!artist && !tag && "All Events"}
      </h1>

      <div className="flex flex-wrap justify-center">
        {events.length ? (
          events.map(event => (
            <EventCard key={event._id} eventData={event} />
          ))
        ) : (
          <p className="text-gray-500 text-xl">No events found</p>
        )}
      </div>
    </div>
  );
}
