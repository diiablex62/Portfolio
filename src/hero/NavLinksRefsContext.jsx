import React, { createContext, useContext } from 'react';

export const NavLinksRefsContext = createContext(null);

export function NavLinksRefsProvider({ navLinksRef, children }) {
  return (
    <NavLinksRefsContext.Provider value={navLinksRef}>
      {children}
    </NavLinksRefsContext.Provider>
  );
}

export function useNavLinksRefs() {
  return useContext(NavLinksRefsContext);
}
