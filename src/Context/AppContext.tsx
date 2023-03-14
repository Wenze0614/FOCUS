import React from "react";
import AppBasicContextProvider from "./AppBasicContext";
import TaskContextProvider from "./TaskContext";

export default function AppContextProvider(props: React.PropsWithChildren<{}>) {
  return (
    <AppBasicContextProvider>
      <TaskContextProvider>{props.children}</TaskContextProvider>
    </AppBasicContextProvider>
  );
}
