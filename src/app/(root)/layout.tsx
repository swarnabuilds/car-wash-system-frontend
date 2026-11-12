import React from "react";
import { Navbar } from "@/components/shared/Navbar";
import TopHeader from "@/components/shared/TopHeader";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header>
        <TopHeader />
        <Navbar />
      </header>
      
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}