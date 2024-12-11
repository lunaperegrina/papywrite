'use client';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Link from "next/link";

function BackButton({
  className,
  children,
}: React.PropsWithChildren<{
  className?: string;
}>) {
  const router = useRouter();
  return (
    <Link href={"/"} className={className} onClick={() => router.back()}>
      <ChevronLeft className="w-15 h-15" />
    </Link>
  );
}

export default BackButton;