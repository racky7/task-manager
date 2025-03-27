import { UserButton } from "@/components/auth/user-button";
import Image from "next/image";
import Link from "next/link";

export default function StandaloneLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-neutral-100">
      <div className="mx-auto max-w-screen-2xl p-4">
        <nav className="flex h-[73px] items-center justify-between">
          <Link href={"/"}>
            <div className="text-2xl">Task Manager</div>
          </Link>
          <UserButton />
        </nav>
        <div className="flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </main>
  );
}
