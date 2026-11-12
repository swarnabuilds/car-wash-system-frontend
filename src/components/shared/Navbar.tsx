"use client";

import Link from "next/link";
import { LayoutGrid, ArrowLeftRight, Info, Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";

const navItems = [
  { name: "Services", href: "/services", icon: LayoutGrid },
  { name: "Compare", href: "/compare", icon: ArrowLeftRight },
  { name: "About Us", href: "/about", icon: Info },
];

export function Navbar() {
  return (
    <nav className="w-full bg-white border-b border-gray-200 py-3 px-4 md:px-12 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Desktop Menu Links */}
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 text-gray-800 hover:text-[#10235B] font-medium text-[15px] transition-colors"
              >
                <Icon className="w-4 h-4 text-gray-600" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:bg-gray-100 focus:outline-none">
              <Menu className="w-6 h-6" />
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetTitle className="text-left text-[#10235B] mb-6">
                Menu
              </SheetTitle>
              <div className="flex flex-col gap-5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center gap-3 text-gray-800 hover:text-[#10235B] font-medium text-base"
                    >
                      <Icon className="w-5 h-5 text-gray-600" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Right: Book Now Button */}
        <div>
          <Link
            href="/book-now"
            className="inline-flex items-center justify-center bg-[#FFC107] hover:bg-[#eab000] text-white font-semibold px-8 py-3 rounded-lg text-[15px] transition-colors"
          >
            Book Now
          </Link>
        </div>
      </div>
    </nav>
  );
}