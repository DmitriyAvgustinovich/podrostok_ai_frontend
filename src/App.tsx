import React from "react";
import { tg } from "constants/tg-api";
import { PsychologicalTest } from "components/PsychologicalTest/PsychologicalTest";

export const App = () => {
  React.useEffect(() => {
    tg.ready();
  }, []);

  return <PsychologicalTest />;
};
