import { createStore } from "../../../store";
import { setTheme } from "../set-theme";

describe("set Editor UI theme", () => {
  it("should set the edithor theme to the desired theme", () => {
    const store = createStore({});

    store.dispatch(setTheme(false));

    expect(store.getState().ui.isEditorInLightMode).toBe(false);
  });
});
