"use client";

import { Fragment, useRef } from "react";
import { Toaster } from "react-hot-toast";

const AddBlog = () => {
  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLInputElement | null>(null);

  return (
    <Fragment>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            Add new Blog
          </p>
          <form action="">
            <input type="text" placeholder="Enter Title" className="rounded-md px-4 w-full py-2 my-2" />
            <textarea 
              name=""
              placeholder="Enter descriptión."
              id="" 
              className=" rounded-md px-4 py-2 w-full my-2"
            >

            </textarea>
            <button className="font-semibold px-4 py-1 shadow-xl bg-slate-200 roun m-auto hover:bg-slate-100">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  )
}

export default AddBlog