import { createContext, useState } from "react";
import { AppBasicStates } from "../Components/Types";

const defaultStatus: AppBasicStates = {
  shortCuts: {
    key_e_pressed: false,
  },
};

interface AppBasicContextType {
  appBasicStates: AppBasicStates;
  setAppBasicStates: React.Dispatch<React.SetStateAction<AppBasicStates>>;
}

export const appBasicContext = createContext<AppBasicContextType>({
  appBasicStates: defaultStatus,
  setAppBasicStates: () => {},
});

export default function AppBasicContextProvider(
  props: React.PropsWithChildren<{}>
) {
  const [appBasicStates, setAppBasicStates] =
    useState<AppBasicStates>(defaultStatus);
  return (
    <appBasicContext.Provider
      value={{ appBasicStates, setAppBasicStates }}
      {...props}
    />
  );
}
