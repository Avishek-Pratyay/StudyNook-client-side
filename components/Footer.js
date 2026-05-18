export default function Footer() {
  return (
    <footer className="bg-[#0f172a] text-white mt-20">
      <div className="max-w-6xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-3 gap-8">

          <div>
            <h2 className="text-xl font-bold">StudyNook</h2>
            <p className="text-gray-400 mt-2 text-sm">
              Smart study room booking platform for students.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <ul className="text-gray-400 text-sm space-y-1">
              <li>Rooms</li>
              <li>Bookings</li>
              <li>Listings</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Contact</h3>
            <p className="text-gray-400 text-sm">
              support@studynook.com
            </p>
          </div>

        </div>

        <div className="border-t border-gray-700 mt-8 pt-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} StudyNook. All rights reserved.
        </div>

      </div>
    </footer>
  );
}