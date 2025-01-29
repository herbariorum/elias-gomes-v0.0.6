'use client';

import { usePathname } from 'next/navigation';

export default function BodyClassWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const bodyClass = pathname.startsWith('/post') ? 'bg-white' : 'bg-black';

  return <body className={`min-h-screen ${bodyClass}`}>{children}</body>;
}