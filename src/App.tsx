import React from "react";
import { tg } from "constants/tg-api";

export const App = () => {
  React.useEffect(() => {
    tg.ready();
  }, []);

  return <>sdfsdfdsf</>;
};
