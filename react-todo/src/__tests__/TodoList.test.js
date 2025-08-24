
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../components/TodoList";

test("renders initial todos", () => {
  render(<TodoList />);
  expect(screen.getByText("Learn React")).toBeInTheDocument();
  expect(screen.getByText("Build Todo App")).toBeInTheDocument();
});


test("can add a new todo", () => {
  render(<TodoList />);
  const input = screen.getByTestId("todo-input");
  const button = screen.getByTestId("add-btn");

  fireEvent.change(input, { target: { value: "New Todo" } }); // user types
  fireEvent.click(button); // user clicks Add

  expect(screen.getByText("New Todo")).toBeInTheDocument();
});


test("can toggle todo completion", () => {
  render(<TodoList />);
  const todo = screen.getByText("Learn React");

  fireEvent.click(todo); // user clicks the todo
  expect(todo).toHaveClass("line-through"); // CSS class applied
});


test("can delete a todo", () => {
  render(<TodoList />);
  const todo = screen.getByText("Learn React");
  const deleteBtn = todo.querySelector("[data-testid='delete-btn']");

  fireEvent.click(deleteBtn);

  expect(screen.queryByText("Learn React")).not.toBeInTheDocument();
});


