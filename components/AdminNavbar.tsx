"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

const NAV_ITEMS = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/bots", label: "Bots" },
  { href: "/admin/faqs", label: "FAQs" },
  { href: "/admin/seo", label: "Page SEO" },
];

export default function AdminNavbar() {
  const pathname = usePathname();

  if (pathname === "/admin/login") return null;

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-8">
        <Link href="/admin/dashboard" className="text-blue-600 font-bold text-xl tracking-tight hover:text-blue-700 transition">Omegle Online Admin</Link>
        <div className="hidden md:flex space-x-6 text-sm font-medium text-gray-600 mt-1">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === "/admin/dashboard"
              ? pathname === item.href
              : pathname?.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? "text-blue-600 border-b-2 border-blue-600 pb-5" : "hover:text-blue-600 transition pb-5"}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      <div className="text-sm font-medium text-gray-500">
        <LogoutButton />
      </div>
    </nav>
  );
}
