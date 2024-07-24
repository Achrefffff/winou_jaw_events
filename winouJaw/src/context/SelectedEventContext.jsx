import React, { createContext, useState, useContext } from "react";

const SelectedEventContext = createContext();

export const SelectedEventProvider = ({ children }) => {
  const [selectedEventId, setSelectedEventId] = useState(null);

  return (
    <SelectedEventContext.Provider
      value={{ selectedEventId, setSelectedEventId }}
    >
      {children}
    </SelectedEventContext.Provider>
  );
};

export const useSelectedEventContext = () => useContext(SelectedEventContext);
