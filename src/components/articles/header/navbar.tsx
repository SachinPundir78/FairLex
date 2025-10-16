"use client";
import React, { useState, Suspense } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import SearchInput from "./search-input";
import ToggleMode from "./toggle-mode";
import Image from "next/image";
import { Search, Menu, X } from "lucide-react";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { searchAction } from "@/src/actions/search";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-0 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-2">
            {/* Logo */}
            <div className="relative h-10 w-10 md:h-12 md:w-12">
              <Image
                src="/courthouse.png" // 👈 place courthouse.png in /public
                alt="FairLex Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            <Link href="/" className="flex items-center space-x-2">
              <span className="font-bold text-3xl">
                <span className="bg-gradient-to-r from-amber-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                  Fair
                </span>
                <span className="text-foreground">Lex</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href={"/articles"}
              className="text-md font-semibold text-foreground transition-colors hover:text-foreground"
            >
              Articles
            </Link>
            <Link
              href={"/categories"}
              className="text-md font-semibold text-foreground transition-colors hover:text-foreground"
            >
              Categories
            </Link>
            <Link
              href={"/dashboard"}
              className="text-md font-semibold text-foreground transition-colors hover:text-foreground"
            >
              Dashboard
            </Link>
            <Link
              href={"/contact"}
              className="text-md font-semibold text-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </div>

          {/* Right Section - Search & Actions */}
          <div className="flex items-center gap-2">
            {/* Right Section */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <Suspense
                  fallback={<div className="w-48 h-10 bg-muted rounded-md" />}
                >
                  <SearchInput />
                </Suspense>
              </div>
              {/* <SearchInput /> */}
              <ToggleMode />

              {/* User Action */}
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
              <SignedOut>
                <div className="hidden md:flex items-center gap-2">
                  <SignInButton>
                    <Button variant="outline">Login</Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button>Sign up</Button>
                  </SignUpButton>
                </div>
              </SignedOut>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t">
            {/* Search Bar (Mobile) */}
            <div className="px-4">
              <form action={searchAction} className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  name="search"
                  placeholder="Search articles..."
                  className="pl-10 w-full focus-visible:ring-1"
                />
                <button type="submit" className="hidden"></button>
              </form>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-2 px-4">
              <Link
                href="/articles"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Articles
              </Link>
              <Link
                href="/categories"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Categories
              </Link>

              <Link
                href="/dashboard"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>

              <Link
                href="/contact"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
            </div>

            {/* Mobile Auth Buttons */}
            <SignedOut>
              <div className="px-4 flex flex-col gap-2">
                <SignInButton>
                  <Button variant="outline" className="w-full">
                    Login
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="w-full">Sign up</Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
