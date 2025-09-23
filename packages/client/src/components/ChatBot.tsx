import { useForm } from 'react-hook-form';
import { Button } from "./ui/button";
import { useEffect, useRef, useState } from 'react';
import { FaArrowUp } from "react-icons/fa";
import axios from 'axios';
import ReactMarkdown from 'react-markdown'

type FormData = {
  prompt: string;
};

type ChatResponse = {
  message: string
}

type Message = {
  content: string;
  role: 'user' | 'bot';
}

const ChatBot = () => {
 const [messages, setMessages] = useState<Message[]>([])
 const [isBotTyping, setIsBotTyping] = useState(false)
 const formRef = useRef<HTMLFormElement | null>(null)
  const conversationId = useRef(crypto.randomUUID())
  const { register, handleSubmit, reset, formState } = useForm<FormData>({
    mode: "onChange"
  });

  useEffect(() => {
    formRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages])

  const onSubmit = async ({prompt}: FormData) => {

    setMessages((prev) => [...prev,  {content: prompt, role: 'user'}]);
    setIsBotTyping(true)

    reset();
    const {data} = await axios.post<ChatResponse>('/api/chat', {
      prompt,
      conversationId: conversationId.current
    })

    setMessages(prev => [...prev, {content: data.message, role: 'bot'}])
    setIsBotTyping(false)
    console.log(data)
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return (
   <div>
    <div className='flex flex-col gap-3 mb-10 m-4'>
      {messages.map((message, index) => <p className={`px-3 py-1 rounded-xl ${
        message.role === 'user' ?
         'bg-blue-600 text-white self-end' : 'bg-gray-100 text-black self-start' 
      }`} key={index}>
        <ReactMarkdown>
        {message.content}
        </ReactMarkdown>     
        </p>)}
        {isBotTyping && (
        <div className='flex self-start gap-1 px-3 py-3 bg-gray-200 rounded-xl'>
          <div className='w-2 h-2 rounded-full bg-gray-800 animate-pulse'></div>
          <div className='w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.2s]'></div>
          <div className='w-2 h-2 rounded-full bg-gray-800 animate-pulse [animation-delay:0.4s]'></div>
        </div>
        )}
    </div>
     <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={onKeyDown}
      ref={formRef}
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
   </div>
  );
};

export default ChatBot;
