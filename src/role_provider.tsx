import React, { useState } from 'react';

interface RoleContextValue {
  role: string | null;
  setRole: (role: string) => void;
}

const RoleContext = React.createContext<RoleContextValue>({
  role: null,
  setRole: () => {},
});

const RoleProvider = ({ children }: React.PropsWithChildren<{}>) => {
  const [role, setRole] = useState<string | null>(null);

  const value = { role, setRole };

  return (
    <RoleContext.Provider value={value}>{children}</RoleContext.Provider>
  );
};

export default RoleProvider;
export { RoleContext };
