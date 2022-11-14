const filterByMatchingValues = (
  expectedModeArr: string[],
  currentModeArr: string[]
): string[] =>
  expectedModeArr.filter((mode) => currentModeArr.indexOf(mode) !== -1);

const isMatchingValue = (
  expectedMode: string,
  currentMode: string
): boolean => {
  const currentModeArr = currentMode.split(" ");
  const filteredByMatchingValues = filterByMatchingValues(
    expectedMode.split(" "),
    currentModeArr
  );

  return currentModeArr.length > 1
    ? filteredByMatchingValues.length > 1
    : filteredByMatchingValues.length > 0;
};

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
}) =>
  isMatchingValue(expectedMode, currentMode) ? matchingValue : nonMatchingValue;
