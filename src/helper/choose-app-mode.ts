export const chooseAppMode = ({
  currentMode,
  expectedMode,
  matchingValue,
  nonMatchingValue,
}: {
  expectedMode: string;
  currentMode: string;
  matchingValue: any;
  nonMatchingValue: any;
}) => (expectedMode === currentMode ? matchingValue : nonMatchingValue);
