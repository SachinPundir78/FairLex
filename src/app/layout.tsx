import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/src/components/theme-provider";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "FairLex",
  description: "FairLex - Legal Blog WebApp",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased relative overflow-x-hidden`}
          suppressHydrationWarning
        >
          {/* 🌟 Global Light Mode Glow Background */}
          <div className="absolute inset-0 -z-10">
            {/* Light Mode Glow */}
            <div
              className="absolute inset-0 dark:hidden"
              style={{
                backgroundImage: `
                  radial-gradient(circle 600px at 0% 200px, #fef3c7, transparent),
                  radial-gradient(circle 600px at 100% 200px, #fef3c7, transparent)
                `,
              }}
            />
          </div>

          {/* 🌗 Theme Provider for Light/Dark Mode */}
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
