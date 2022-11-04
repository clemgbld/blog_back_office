import React from "react";
import { createClock } from "../../core/infastructure/create-clock";

export const ClockContext = React.createContext(createClock.create());
