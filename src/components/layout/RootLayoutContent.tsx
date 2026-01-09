'use client';

export function RootLayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex-1">
      {children}
    </main>
  );
}
