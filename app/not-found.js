import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0b1220] text-white px-6">

      <div className="text-center max-w-lg">

        <h1 className="text-7xl font-bold text-cyan-400">
          404
        </h1>

        <h2 className="text-2xl font-semibold mt-4">
          Page Not Found
        </h2>

        <p className="text-slate-400 mt-3">
          The page you are looking for doesn’t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-block mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 font-semibold hover:scale-105 transition"
        >
          Back To Home
        </Link>

      </div>
    </main>
  );
}