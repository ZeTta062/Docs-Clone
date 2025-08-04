import { ConvexClientProvider } from "@/components/convex-client-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import { Toaster } from "@/components/ui/sonner";

import "./globals.css";
import "@liveblocks/react-ui/styles.css";
import "@liveblocks/react-tiptap/styles.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Docs Clone",
  description: "Docs를 클론 코딩한 작업물입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className} >
        <NuqsAdapter>
          <ConvexClientProvider>
            <Toaster />
            {children}
          </ConvexClientProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
