import React from "react";
import { createClock } from "../../infrastructure/common/create-clock";

export const ClockContext = React.createContext(createClock.create());
