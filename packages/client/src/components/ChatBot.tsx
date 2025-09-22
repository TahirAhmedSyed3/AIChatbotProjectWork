import { useForm } from 'react-hook-form';
import { Button } from "./ui/button";
import { FaArrowUp } from "react-icons/fa";

type FormData = {
  prompt: string;
};

const ChatBot = () => {
  const { register, handleSubmit, reset, formState } = useForm<FormData>({
    mode: "onChange"
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    reset();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={onKeyDown}
      className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl m-4"
    >
      <textarea
        {...register('prompt', { required: true, validate: (data) => data.trim().length > 0 })}
        className="w-full border-0 focus:outline-0 resize-none"
        placeholder="ask anything"
        maxLength={1000}
      />
      <Button
        type="submit"
        disabled={!formState.isValid}
        className="rounded-full w-9 h-9 flex items-center justify-center"
      >
        <FaArrowUp />
      </Button>
    </form>
  );
};

export default ChatBot;
