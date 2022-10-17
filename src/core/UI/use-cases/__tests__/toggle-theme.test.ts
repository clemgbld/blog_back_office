import { createStore } from "../../../store";
import toggleEditorTheme from "../toggle-theme";

describe("UI theme", () => {
  it("should be light mode initially", () => {
    const store = createStore({});

    expect(store.getState().ui.isEditorInLightMode).toBe(true);
  });

  it("should be able to switch between light and dark mode", () => {
    const store = createStore({});

    store.dispatch(toggleEditorTheme());

    expect(store.getState().ui.isEditorInLightMode).toBe(false);
  });
});
