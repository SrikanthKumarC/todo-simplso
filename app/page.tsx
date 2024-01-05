"use client";

import { TextField, Text } from "@radix-ui/themes";
import React from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  MouseSensor,
  useSensor,
  useSensors,
  TouchSensor,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TodoItem from "@/components/Todo";
import NoSSRWrapper from "@/components/NoSSRWrapper";
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}
import { useSessionStorage } from "usehooks-ts";

export default function Home() {
  const [todos, setTodos] = useSessionStorage("todo-app", [] as Todo[]);

  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10, // Enable sort function when dragging 10px   💡 here!!!
    },
  });
  const touchSensor = useSensor(TouchSensor, {
    // Press delay of 250ms, with tolerance of 5px of movement
    activationConstraint: {
      delay: 250,
      tolerance: 5,
    },
  });

  const handleComplete = (e: React.ChangeEvent<HTMLInputElement>) => {
    const todoIdToComplete = parseInt(e.currentTarget.id);
    const newTodos = todos.map((todo) => {
      if (todo.id === todoIdToComplete) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const keyboardSensor = useSensor(KeyboardSensor);
  const sensors = useSensors(mouseSensor, keyboardSensor, touchSensor);

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setTodos((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
  // const reverseTodos = todos.sort((a, b) => (b.id > a.id ? 1 : -1));
  console.log(todos);
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!e.target[0].value) return;
    const newTodo = {
      id: new Date().getTime(),
      text: e.target[0].value,
      completed: false,
    };
    setTodos([...todos, newTodo]);
    e.target[0].value = "";
  };
  const handleRemove = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Remove button clicked", e.currentTarget.id);
    const todoIdToRemove = parseInt(e.currentTarget.id, 10);
    const newTodos = todos.filter((todo) => todo.id !== todoIdToRemove);
    setTodos(newTodos);
  };

  const handleEdit = (
    e: React.MouseEvent<HTMLButtonElement>,
    editedText: string
  ) => {
    e.preventDefault();
    e.stopPropagation();
    if (!editedText || editedText == "") return;
    const todoIdToEdit = parseInt(e.currentTarget.id, 10);
    const newTodos = todos.map((todo) => {
      if (todo.id === todoIdToEdit) {
        return { ...todo, text: editedText };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <NoSSRWrapper>
    <main className="mx-auto p-4 " suppressHydrationWarning>
      <Text className="text-center w-full block text-3xl">Todo</Text>
      {todos.length > 0 && (
        <span className="text-center w-full block text-red-600 font-bold">
          Drag to re-order
        </span>
      )}
      <form
        className="flex px-4 sm:px-0 items-center max-w-xl mt-4 gap-2 mx-auto"
        onSubmit={handleSubmit}
      >
        <TextField.Root className="w-full">
          <TextField.Input
            className="block shrink-0 w-full "
            size={"3"}
            placeholder="Buy Potatoes"
          />
        </TextField.Root>
        <button className="bg-blue-500 hover:bg-blue-800 duration-100 text-white px-6 flex pb-1 rounded-md text-3xl">
          <span className="">+</span>
        </button>
      </form>
      <div className="max-w-[calc(36rem+2rem)] mx-auto">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={todos} strategy={verticalListSortingStrategy}>
            {todos.map((todo) => (
              <div key={todo.id}>
                <TodoItem
                  todo={todo}
                  handleEdit={handleEdit}
                  handleRemove={handleRemove}
                  handleComplete={handleComplete}
                />
              </div>
            ))}
          </SortableContext>
        </DndContext>
      </div>
    </main>
    </NoSSRWrapper>
  );
}
