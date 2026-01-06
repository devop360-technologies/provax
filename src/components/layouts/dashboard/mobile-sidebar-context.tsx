"use client";

import { createContext, useContext, useState, useCallback, useMemo, type PropsWithChildren } from "react";

interface MobileSidebarContextType {
  isOpen: boolean;
  toggle: () => void;
  close: () => void;
  open: () => void;
}

const MobileSidebarContext = createContext<MobileSidebarContextType | undefined>(undefined);

export function MobileSidebarProvider({ children }: PropsWithChildren) {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const close = useCallback(() => setIsOpen(false), []);
  const open = useCallback(() => setIsOpen(true), []);

  const value = useMemo(() => ({ isOpen, toggle, close, open }), [isOpen, toggle, close, open]);

  return (
    <MobileSidebarContext.Provider value={value}>
      {children}
    </MobileSidebarContext.Provider>
  );
}

export function useMobileSidebar() {
  const context = useContext(MobileSidebarContext);
  if (context === undefined) {
    throw new Error("useMobileSidebar must be used within a MobileSidebarProvider");
  }
  return context;
}
