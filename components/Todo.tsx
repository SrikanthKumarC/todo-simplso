"use client";

import { Text, TextField } from "@radix-ui/themes";
import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import DialogBox from "./Dialog";
import { PencilSimple } from "@phosphor-icons/react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface HandleRemove {
  (e: any): void;
}

type TodoProps = {
  todo: Todo;
  handleRemove: any;
  handleComplete: any;
  handleEdit: any;
};

const Todo = ({
  todo,
  handleRemove,
  handleComplete,
  handleEdit,
}: TodoProps) => {
  const [editedTodo, setEditedTodo] = React.useState(todo.text);
  const [open, setOpen] = React.useState(false);
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="flex hover:bg-blue-100 rounded-lg p-4 px-4 items-center gap-2 justify-between mt-2 "
    >
      <div
        id={`${todo.id}`}
        className="flex gap-2 items-center h-full justify-center"
        onClick={handleComplete}
      >
        <input
          name={`${todo.id}`}
          checked={todo.completed}
          readOnly
          type="checkbox"
        />
        <Text
          htmlFor={`${todo.id}`}
          id={todo.id + ""}
          className={`text-xl ${todo.completed ? "line-through" : ""}`}
        >
          {todo.text}
        </Text>
      </div>
      <div className="flex gap-2 items-center">
        <button
          onClick={(e) => handleRemove(e)}
          id={`${todo.id}`}
          data-no-dnd="true"
          title="Remove"
          className="bg-blue-400 hover:bg-blue-800 text-white px-2  py-1 rounded-md"
        >
          Remove
        </button>
        <DialogBox>
          <DialogBox.Trigger>
            <PencilSimple className=" hover:bg-blue-300 text-4xl rounded-lg px-2" />
          </DialogBox.Trigger>
          <DialogBox.Content>
            <div>
              <TextField.Root id="todoID" className="w-full">
                <TextField.Input
                  className="block shrink-0 w-full "
                  size={"3"}
                    value={editedTodo}
                    onChange={(e) => {
                      e.stopPropagation();
                      setEditedTodo(e.target.value);
                    }}
                  placeholder="Buy Potatoes"
                />
              </TextField.Root>
              <button
                type="submit"
                onClick={(e) => handleEdit(e, editedTodo)}
                id={`${todo.id}`}
                data-no-dnd="true"
                title="Remove"
                className="bg-blue-400 mt-4 hover:bg-blue-800 text-white px-2  py-1 rounded-md"
              >
                Save
              </button>
            </div>
          </DialogBox.Content>
        </DialogBox>
      </div>
    </div>
  );
};

export default Todo;
