"use client";
import React, { useState, Suspense } from "react";
import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import SearchInput from "./search-input";
import ToggleMode from "./toggle-mode";
import Image from "next/image";
import { Search, Menu, X, ChevronDown } from "lucide-react";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { SignedIn, UserButton, useUser } from "@clerk/nextjs"; // ✅ added useUser
import { searchAction } from "@/src/actions/search";
import { categories } from "@/src/config/categories";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const { user } = useUser(); // ✅ get signed-in user
  const isAdmin = user?.publicMetadata?.role === "admin"; // ✅ check if user is admin

  return (
    <nav className="fixed top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-0 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-2">
            {/* Logo */}
            <div className="relative h-10 w-10 md:h-12 md:w-12">
              <Image
                src="/courthouse.png"
                alt="FairLex Logo"
                fill
                className="object-contain"
                priority
              />
            </div>

            <Link href="/" className="flex flex-col -space-y-1">
              <span className="font-bold text-3xl leading-none mt-1">
                <span className="bg-gradient-to-r from-amber-500 via-orange-400 to-amber-400 bg-clip-text text-transparent">
                  Fair
                </span>
                <span className="text-foreground">Lex</span>
              </span>
              <span className="hidden md:block text-[10px] text-muted-foreground/80 font-medium tracking-wider font-sans mt-1">
                Where Legal Thought Becomes Legal Insight
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href={"/about"}
              className="text-md font-semibold text-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              href={"/articles"}
              className="text-md font-semibold text-foreground transition-colors hover:text-foreground"
            >
              Blog
            </Link>

            {/* Categories Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsCategoriesOpen(true)}
              onMouseLeave={() => setIsCategoriesOpen(false)}
            >
              <Link
                href="/categories"
                className="flex items-center gap-1 text-md font-semibold text-foreground transition-colors hover:text-foreground"
              >
                Categories
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isCategoriesOpen ? "rotate-180" : ""
                  }`}
                />
              </Link>

              {/* Dropdown Menu */}
              {isCategoriesOpen && (
                <div className="absolute top-full left-0 pt-2 w-72">
                  <div className="bg-background border rounded-lg shadow-lg p-2 grid grid-cols-1 gap-1">
                    {categories.slice(0, 5).map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <Link
                          key={category.slug}
                          href={`/categories/${category.slug}`}
                          className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-accent transition-colors group"
                        >
                          <div
                            className={`flex-shrink-0 p-2 rounded-md bg-gradient-to-br ${category.gradient} bg-opacity-10`}
                          >
                            <IconComponent
                              className={`h-4 w-4 ${category.color}`}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground group-hover:text-foreground">
                              {category.name}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {category.description}
                            </p>
                          </div>
                        </Link>
                      );
                    })}

                    {/* View All Link */}
                    <Link
                      href="/categories"
                      className="flex items-center justify-center px-3 py-2.5 rounded-md hover:bg-accent transition-colors text-sm font-medium text-primary mt-1 border-t"
                    >
                      View All Categories →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* ✅ Admin-only Dashboard link */}
            {isAdmin && (
              <Link
                href={"/dashboard"}
                className="text-md font-semibold text-foreground transition-colors hover:text-foreground"
              >
                Dashboard
              </Link>
            )}

            <Link
              href={"/contact"}
              className="text-md font-semibold text-foreground transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </div>

          {/* Right Section - Search & Actions */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-4">
              <div className="hidden sm:block">
                <Suspense
                  fallback={<div className="w-48 h-10 bg-muted rounded-md" />}
                >
                  <SearchInput />
                </Suspense>
              </div>
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
              </form>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-2 px-4">
              <Link
                href="/about"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Blog
              </Link>

              {/* Mobile Categories - Expandable */}
              <div>
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="w-full flex items-center justify-between px-3 py-2 text-base font-medium text-foreground"
                >
                  Categories
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isCategoriesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isCategoriesOpen && (
                  <div className="mt-2 space-y-1 pl-4">
                    {categories.map((category) => {
                      const IconComponent = category.icon;
                      return (
                        <Link
                          key={category.slug}
                          href={`/categories/${category.slug}`}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <IconComponent
                            className={`h-4 w-4 ${category.color}`}
                          />
                          {category.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* ✅ Admin-only Dashboard link (Mobile) */}
              {isAdmin && (
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Dashboard
                </Link>
              )}

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
