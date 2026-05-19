export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0b1220] text-white px-6 py-16">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-cyan-400 mb-6">
          About StudyNook
        </h1>

        <p className="text-slate-300 leading-8 text-lg">
          StudyNook is a modern study room booking platform that helps
          students and professionals discover, reserve and manage quiet
          study spaces for focused work, group sessions and research.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-12">

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-xl font-semibold mb-3 text-cyan-400">
              Easy Booking
            </h2>
            <p className="text-slate-400">
              Reserve rooms instantly with a smooth booking experience.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-xl font-semibold mb-3 text-cyan-400">
              Smart Search
            </h2>
            <p className="text-slate-400">
              Search rooms based on your preferences and availability.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
            <h2 className="text-xl font-semibold mb-3 text-cyan-400">
              Flexible Hosting
            </h2>
            <p className="text-slate-400">
              Add your own study rooms and manage bookings easily.
            </p>
          </div>

        </div>
      </div>
    </main>
  );
}