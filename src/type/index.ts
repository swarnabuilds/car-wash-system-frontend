import { LucideIcon } from "lucide-react";

// Define allowed user roles in the system based on database schema
export type UserRole = "admin" | "branchManager" | "user";

// Custom User Interface extending Better Auth session user
export interface CustomUser {
  id: string;
  name: string;
  email: string;
  image?: string | null;
  emailVerified: boolean;
  role?: UserRole; // Dynamic role from DB ("admin", "branchManager", "user")
  createdAt: Date;
  updatedAt: Date;
}

// Navigation Menu Item Structure
export interface MenuItem {
  title: string;
  href: string;
  icon: LucideIcon;
}