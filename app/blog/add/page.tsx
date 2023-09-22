"use client";

import { Fragment, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

const postBlog = async ({title, description}:{title:string; description:string}) => {
  const response = fetch("http://localhost:3000/api/blog", {
    method: "POST", 
    body:JSON.stringify({title, description}),
    //@ts-ignore
    "content-Type": "aplication/json",
  });
  return (await response).json();
}

const AddBlog = () => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const habdleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log(titleRef.current?.value);
    // console.log(descriptionRef.current?.value);
    if (titleRef.current && descriptionRef.current) {
      toast.loading("Sending Blog", {id: "1"});
      await postBlog({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value
      });
      toast.success("Successfully", {id: "1"});
    }
  }

  return (
    <Fragment>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            Add new Blog
          </p>
          <form onSubmit={habdleSubmit}>
            <input 
              ref={titleRef}
              type="text" 
              placeholder="Enter Title" 
              className="rounded-md px-4 w-full py-2 my-2" 
            />
            <textarea
              ref={descriptionRef} 
              name=""
              placeholder="Enter descriptión."
              id="" 
              className=" rounded-md px-4 py-2 w-full my-2"
            >

            </textarea>
            <button type='submit' className="font-semibold px-4 py-1 shadow-xl bg-slate-200 roun m-auto hover:bg-slate-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default AddBlog