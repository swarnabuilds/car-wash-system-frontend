"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { 
  User, 
  LogOut, 
  LayoutDashboard, 
  ChevronDown 
} from "lucide-react";
import { authClient } from "@/lib/auth-client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function TopHeader() {
  const router = useRouter();

  // Better Auth Session Hook
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  // Sign Out Handler
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully!");
          router.push("/signin");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Failed to sign out.");
        },
      },
    });
  };

  return (
    <div className="w-full bg-[#10235B] text-white py-2.5 px-4 sm:px-8 border-b border-white/10">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Left Side: Logo / Icon */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-[#152a6b] border border-white/20 flex items-center justify-center shadow-inner overflow-hidden">
              <img 
                src="/logo.png" 
                alt="Logo" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // লোগো ইমেজ না পেলে ফলব্যাক হিসেবে কার ইমোজি বা ডিফল্ট দেখাবে
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </Link>
        </div>

        {/* Right Side: Call, WhatsApp & Profile / Login */}
        <div className="flex items-center gap-6 sm:gap-8">
          
          {/* Call Us Text */}
          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-200">
            <span>Call us now:</span>
            <a href="tel:+8801706785160" className="font-semibold text-white hover:text-[#FFC107] transition-colors">
              +880170678-5160
            </a>
          </div>

          {/* WhatsApp Icon */}
          <a 
            href="https://wa.me/8801706785160" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-gray-300 hover:text-[#25D366] transition-colors p-1"
            title="Chat on WhatsApp"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448c-.63-.348-1.332-.572-2.05-.66l-5.155 1.348zm12.189-21.493c-5.597 0-10.153 4.556-10.155 10.155-.001 1.791.472 3.535 1.371 5.064l-.946 3.454 3.541-.927c1.474.804 3.149 1.228 4.845 1.229 5.597 0 10.153-4.556 10.155-10.155 0-5.599-4.557-10.156-10.171-10.156zm5.586 14.393c-.23.648-1.328 1.242-1.832 1.314-.462.066-1.043.118-2.996-.693-1.096-.453-1.815-1.127-2.614-2.316-.799-1.189-1.432-2.73-1.432-4.148 0-1.418.73-2.115 1.008-2.403.278-.288.606-.36.808-.36.202 0 .404.003.582.012.187.01.438-.072.684.512.253.605.86 2.096.936 2.248.076.152.127.33.025.532-.102.202-.153.33-.304.507-.152.177-.318.395-.454.53-.152.153-.31.32-.134.624.177.304.785 1.298 1.687 2.102 1.161 1.034 2.138 1.353 2.442 1.505.304.152.481.127.659-.076.177-.203.759-.885.962-1.189.202-.304.405-.253.684-.152.278.101 1.771.835 2.075.986.304.152.507.228.582.355.076.127.076.735-.154 1.383z"/>
            </svg>
          </a>

          {/* User Profile / Login Section */}
          <div>
            {isPending ? (
              <div className="text-gray-400 text-xs animate-pulse">Loading...</div>
            ) : user ? (
              /* User Logged In: Name/Avatar with Dropdown */
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-full transition-colors cursor-pointer outline-none">
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || "User"}
                      className="w-6 h-6 rounded-full object-cover border border-[#FFC107]"
                    />
                  ) : (
                    <div className="w-6 h-6 rounded-full bg-[#FFC107] text-[#10235B] font-bold flex items-center justify-center text-xs">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                  )}
                  <span className="font-medium text-white max-w-[100px] truncate text-xs sm:text-sm">
                    {user.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-gray-300" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-48 bg-white text-gray-800 shadow-xl rounded-xl p-1.5 border border-gray-100">
                  <div className="px-3 py-2 border-b border-gray-100 mb-1">
                    <p className="text-xs font-semibold text-gray-900 truncate">{user.name}</p>
                    <p className="text-[11px] text-gray-500 truncate">{user.email}</p>
                  </div>

                  <DropdownMenuItem 
                    onClick={() => router.push("/dashboard")}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg cursor-pointer hover:bg-gray-100 text-gray-700"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#10235B]" />
                    <span>Dashboard</span>
                  </DropdownMenuItem>

                  <DropdownMenuItem 
                    onClick={() => router.push("/profile")}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg cursor-pointer hover:bg-gray-100 text-gray-700"
                  >
                    <User className="w-4 h-4 text-[#10235B]" />
                    <span>My Profile</span>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-1 border-t border-gray-100" />

                  <DropdownMenuItem 
                    onClick={handleSignOut}
                    className="flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-lg cursor-pointer hover:bg-red-50 text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* User Not Logged In: Profile Icon linking to Sign In */
              <Link
                href="/signin"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                title="Login"
              >
                <User className="w-5 h-5 text-gray-200" />
              </Link>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}