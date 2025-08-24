/* eslint-env jest */
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

describe("TodoList Component", () => {
  test("renders initial todos", () => {
    render(<TodoList />);
    expect(screen.getByText("Learn React")).toBeInTheDocument();
    expect(screen.getByText("Build Todo App")).toBeInTheDocument();
  });

  test("can add a new todo", () => {
    render(<TodoList />);
    const input = screen.getByTestId("todo-input");
    const button = screen.getByTestId("add-btn");

    fireEvent.change(input, { target: { value: "New Todo" } });
    fireEvent.click(button);

    expect(screen.getByText("New Todo")).toBeInTheDocument();
  });

  test("can toggle todo completion", () => {
    render(<TodoList />);
    const todo = screen.getByText("Learn React");

    fireEvent.click(todo);
    expect(todo).toHaveClass("line-through");
  });

  test("can delete a todo", () => {
    render(<TodoList />);
    const todo = screen.getByText("Learn React");
    const deleteBtn = todo.querySelector("[data-testid='delete-btn']");

    fireEvent.click(deleteBtn);

    expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
  });
});

