"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="bg-[#0b1220] border-t border-white/10 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10 text-white">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-cyan-400 mb-4">
            StudyNook
          </h2>

          <p className="text-slate-400 leading-relaxed text-sm">
            Discover and reserve modern study rooms for solo work,
            group sessions and focused learning experiences.
          </p>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Useful Links
          </h3>

          <ul className="space-y-3 text-slate-400">

            <li>
              <Link
                href="/"
                className="hover:text-cyan-400 transition cursor-pointer"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                href="/rooms"
                className="hover:text-cyan-400 transition cursor-pointer"
              >
                Rooms
              </Link>
            </li>

            <li>
              <Link
                href="/about"
                className="hover:text-cyan-400 transition cursor-pointer"
              >
                About
              </Link>
            </li>

          </ul>
        </div>

        {/* Contact + Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">
            Contact
          </h3>

          <p className="text-slate-400 text-sm mb-2">
            Email: support@studynook.com
          </p>

          <p className="text-slate-400 text-sm mb-6">
            Phone: +880 1700-123456
          </p>

          <div className="flex gap-4">

            <a
              href="https://facebook.com"
              target="_blank"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500 hover:scale-110 transition cursor-pointer"
            >
              <FaFacebookF />
            </a>

            <a
              href="https://x.com"
              target="_blank"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500 hover:scale-110 transition cursor-pointer"
            >
              <FaXTwitter />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500 hover:scale-110 transition cursor-pointer"
            >
              <FaLinkedinIn />
            </a>

            <a
              href="https://instagram.com"
              target="_blank"
              className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-cyan-500 hover:scale-110 transition cursor-pointer"
            >
              <FaInstagram />
            </a>

          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-sm text-slate-500">
        © 2026 StudyNook. All rights reserved.
      </div>
    </footer>
  );
}