import ArtistCard from "@/components/ArtistCard";

const ARTISTS_API = "https://qevent-backend.labs.crio.do/artists";

async function getArtists() {
  const res = await fetch(ARTISTS_API, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch artists");
  }

  return res.json();
}

export default async function ArtistsPage() {
  const artists = await getArtists();

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Artists</h1>

      {/* Artists Grid */}
      <div className="flex flex-wrap justify-center">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artistData={artist} />
        ))}
      </div>
    </div>
  );
}
