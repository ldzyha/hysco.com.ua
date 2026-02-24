'use client';

import { DialogProvider } from '@scootify/shared/components';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <DialogProvider>
      {children}
    </DialogProvider>
  );
}
