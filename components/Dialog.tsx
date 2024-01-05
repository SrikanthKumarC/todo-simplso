"use client";

import { Dialog } from "@radix-ui/themes";

type DialogBoxProps = {
  children: React.ReactNode;
};
const DialogBox = ({  children ,...props}: DialogBoxProps) => {
  return <Dialog.Root>{children}</Dialog.Root>;
};

const DialogBoxTrigger = ({ children }: DialogBoxProps) => {
  return <Dialog.Trigger>{children}</Dialog.Trigger>;
};

const DialogBoxClose = () => {
  return <Dialog.Close>X</Dialog.Close>;
};

const DialogBoxContent = ({ children }: DialogBoxProps) => {
  return (
    <Dialog.Content id="todo_content">
      <Dialog.Title>Edit Todo</Dialog.Title>
      <Dialog.Description>{children}</Dialog.Description>
     
    </Dialog.Content>
  );
};

DialogBox.Trigger = DialogBoxTrigger;
DialogBox.Content = DialogBoxContent;
DialogBox.Close = DialogBoxClose;

export default DialogBox;
