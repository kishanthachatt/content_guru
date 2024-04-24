"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session && session.user) {
      router.push("/content");
    } else {
      router.push("/login");
    }
  }, [session, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      THIS IS HOMEPAGE
    </main>
  );
}
