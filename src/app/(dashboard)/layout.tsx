"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { 
  LayoutDashboard, 
  CalendarCheck, 
  Wrench, 
  Users, 
  CreditCard, 
  User, 
  Home, 
  LogOut, 
  Sparkles,
  Bell,
  ShieldCheck,
  CalendarDays,
  Building2,
  CalendarClock
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { CustomUser, MenuItem, UserRole } from "@/type";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // 1. Fetching session and user details from Better Auth client
  const { data: session, isPending } = authClient.useSession();
  
  // Cast session user to CustomUser type to access the 'role' property safely
  const user = session?.user as CustomUser | undefined;

  // 2. Extract user role dynamically from the database session (default to "user" if not present)
  const userRole: UserRole = user?.role || "user"; 
  const isAdmin = userRole === "admin";
  const isBranchManager = userRole === "branchManager";

  // 3. Define Admin Navigation Menu Items
  const adminMenuItems: MenuItem[] = [
    { title: "Admin Overview", href: "/dashboard", icon: LayoutDashboard },
    { title: "Manage Bookings", href: "/dashboard/admin/bookings", icon: CalendarCheck },
    { title: "Upcoming Bookings", href: "/dashboard/admin/upcomming", icon: CalendarDays },
    { title: "Manage Services", href: "/dashboard/admin/services", icon: Wrench },
    { title: "All Users", href: "/dashboard/admin/users", icon: Users },
    { title: "Branches", href: "/dashboard/admin/branch", icon: Building2 },
    { title: "My Profile", href: "/dashboard/admin/profile", icon: User },
  ];

  // 4. Define Branch Manager Navigation Menu Items
  const branchManagerMenuItems: MenuItem[] = [
    { title: "Branch Overview", href: "/dashboard", icon: LayoutDashboard },
    { title: "Bookings", href: "/dashboard/branch/bookings", icon: CalendarCheck },
    { title: "Upcoming Bookings", href: "/dashboard/branch/upcoming-bookings", icon: CalendarClock },
    { title: "Services", href: "/dashboard/branch/services", icon: Wrench },
    { title: "My Profile", href: "/dashboard/profile", icon: User },
  ];

  // 5. Define Regular User / Customer Navigation Menu Items
  const userMenuItems: MenuItem[] = [
    { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { title: "My Bookings", href: "/dashboard/bookings", icon: CalendarCheck },
    { title: "Upcoming Bookings", href: "/dashboard/upcomming", icon: CalendarDays },
    { title: "Services", href: "/dashboard/services", icon: Wrench },
    { title: "Payments History", href: "/dashboard/payments", icon: CreditCard },
    { title: "My Profile", href: "/dashboard/profile", icon: User },
  ];

  // 6. Select menu items and badge text dynamically based on user role
  let menuItems: MenuItem[] = userMenuItems;
  let roleBadgeText = "Customer";
  let menuSectionTitle = "User Menu";

  if (isAdmin) {
    menuItems = adminMenuItems;
    roleBadgeText = "Administrator";
    menuSectionTitle = "Admin Controls";
  } else if (isBranchManager) {
    menuItems = branchManagerMenuItems;
    roleBadgeText = "Branch Manager";
    menuSectionTitle = "Branch Management";
  }

  // 7. Handle user sign out action
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
    <div className="min-h-screen flex bg-gray-50/50 text-gray-800">
      
      {/* Sidebar Section */}
      <aside className="w-64 bg-[#10235B] text-white flex flex-col border-r border-blue-900/40 hidden md:flex sticky top-0 h-screen shadow-sm">
        
        {/* Brand Header */}
        <div className="h-16 px-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/15">
              <Sparkles className="w-4 h-4 text-[#FFC107]" />
            </div>
            <span className="font-bold text-white text-base tracking-tight">
              AutoGlow Wash
            </span>
          </Link>
        </div>

        {/* User Profile Info Card with Dynamic Role Badge */}
        <div className="p-3.5 mx-3 my-4 bg-white/[0.06] rounded-2xl border border-white/10 flex items-center gap-3 shadow-inner">
          {isPending ? (
            <div className="text-xs text-gray-400 animate-pulse">Loading profile...</div>
          ) : user?.image ? (
            <img
              src={user.image}
              alt={user.name || "User"}
              className="w-10 h-10 rounded-full object-cover border-2 border-[#FFC107] shrink-0"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-[#FFC107] text-[#10235B] font-bold flex items-center justify-center text-sm shrink-0">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}
          <div className="overflow-hidden">
            <h4 className="text-xs font-semibold text-white truncate">
              {user?.name || "User Account"}
            </h4>
            <div className="flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3 h-3 text-[#FFC107]" />
              <span className="text-[10px] font-medium text-gray-300 uppercase tracking-wider truncate">
                {roleBadgeText}
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Menu (Role-based items with active link highlight) */}
        <div className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <p className="px-3 text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
            {menuSectionTitle}
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.title}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? "bg-white/15 text-white font-semibold border-l-4 border-[#FFC107] shadow-xs"
                    : "text-gray-300 hover:bg-white/10 hover:text-white"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-[#FFC107]" : "text-gray-400"}`} />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer: Home & Sign Out */}
        <div className="p-3 border-t border-white/10 space-y-2">
          <Link
            href="/"
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-gray-200 bg-white/5 hover:bg-white/10 transition-colors"
          >
            <Home className="w-4 h-4 text-[#FFC107]" />
            <span>Back to Home</span>
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium text-xs sm:text-sm text-red-500 hover:bg-red-500/10 hover:text-red-500 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>

      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-gray-100 px-6 flex items-center justify-between sticky top-0 z-10 shadow-xs">
          <div className="flex items-center gap-3">
            <h1 className="text-sm sm:text-base font-bold text-gray-800">
              Welcome back, <span className="text-[#10235B]">{user?.name || "Valued User"}</span> 👋
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            <Link
              href="/"
              className="hidden sm:inline-flex items-center gap-2 bg-[#10235B] text-white hover:bg-[#193380] text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm"
            >
              <Home className="w-3.5 h-3.5 text-[#FFC107]" />
              <span>Home Page</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-1 p-6 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

    </div>
  );
}