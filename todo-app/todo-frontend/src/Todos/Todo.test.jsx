import { render, screen } from "@testing-library/react";
import Todo from "./Todo";
import { expect, describe, beforeEach, test } from "vitest";

describe("Todo test", () => {
  let todo;

  beforeEach(() => {
    todo = {
      id: "6a998bef06ffbb5e6fbc43e3",
      text: "prueba 1",
      done: false,
    };

    render(<Todo todo={todo} />);
  });

  test("probando Todo", () => {
    const element = screen.getByText("prueba 1");
    expect(element).toBeInTheDocument();
    const isFalse = screen.getByText("This todo is not done");
    expect(isFalse).toBeInTheDocument();
  });
});
