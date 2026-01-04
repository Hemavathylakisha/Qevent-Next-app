import { notFound } from "next/navigation";
import Image from "next/image";

const EVENT_API = "https://qevent-backend.labs.crio.do/events";

async function getEvent(eventId) {
  const res = await fetch(
    `${EVENT_API}?id=${eventId}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return null;
  }

  const data = await res.json();

  // API returns an array
  return data.length > 0 ? data[0] : null;
}

export default async function EventDetailsPage({ params }) {
  const { eventId } = params; // ✅ defined here

  const event = await getEvent(eventId);

  if (!event) {
    notFound(); // ✅ correct Next.js way
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Image */}
      <div className="w-full h-[400px] relative mb-10">
        <Image
          src={event.image}
          alt={event.name}
          fill
          className="object-cover rounded-xl"
          priority
        />
      </div>

      {/* Event Info */}
      <h1 className="text-4xl font-bold mb-4">{event.name}</h1>

      <p className="text-gray-600 mb-6">
        {new Date(event.date).toDateString()} | {event.time}
      </p>

      <p className="text-xl mb-6">{event.location}</p>

      {/* Tags */}
      <div className="flex gap-3 mb-6 flex-wrap">
        {event.tags.map((tag) => (
          <span
            key={tag}
            className="bg-gray-200 px-3 py-1 rounded-full text-sm"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Artist & Price */}
      <div className="flex justify-between items-center text-2xl font-semibold mb-8">
        <span>{event.artist}</span>
        <span>
          {event.price > 0
            ? `$ ${event.price.toLocaleString()}`
            : "FREE"}
        </span>
      </div>

      {/* Description */}
      <p className="text-lg text-gray-700">
        {event.description}
      </p>
    </div>
  );
}
