import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { createStore } from "../../../../core/store";
import Header from "../Header";

const setup = () =>
  render(
    <Provider store={createStore({})}>
      <Header>
        <div></div>
      </Header>
    </Provider>
  );

describe("Header", () => {
  it("should be in light mode initially", () => {
    setup();

    expect(screen.getByTestId("light-mode")).toBeInTheDocument();
  });

  it("should be able to switch to dark mode", () => {
    setup();

    const lightModeTriger = screen.getByTestId("light-mode");

    userEvent.click(lightModeTriger);

    expect(screen.queryByTestId("light-mode")).not.toBeInTheDocument();
    expect(screen.getByTestId("dark-mode")).toBeInTheDocument();
  });

  it("should be able to swith to light mode and then reswitch to dark mode", () => {
    setup();

    const lightModeTriger = screen.getByTestId("light-mode");

    userEvent.click(lightModeTriger);

    const darkModeTriger = screen.getByTestId("dark-mode");

    userEvent.click(darkModeTriger);

    expect(screen.queryByTestId("dark-mode")).not.toBeInTheDocument();
    expect(screen.getByTestId("light-mode")).toBeInTheDocument();
  });
});
