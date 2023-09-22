"use client";

import { Fragment, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";

type UpdateBlogConfig = {
  title: string,
  description: string,
  id: string
}

const editBlog = async (data: UpdateBlogConfig) => {
  const response = fetch(`http://localhost:3000/api/blog/${data.id}`, {
    method: "PUT", 
    body:JSON.stringify({title:data.title, description:data.description}),
    //@ts-ignore
    "content-Type": "aplication/json",
  });
  return (await response).json();
}

const deleteBlog = async (id:string) => {
  const response = fetch(`http://localhost:3000/api/blog/${id}`, {
    method: "DELETE",
    //@ts-ignore
    "content-Type": "aplication/json",
  });
  return (await response).json();
}

const getBlogById = async (id: string) => {
  const response  = await fetch(`http://localhost:3000/api/blog/${id}`)
  const data = await response.json();
  return data.post;
}

const EditBlog = ({params}:{params:{id:string}}) => {

  console.log(params.id);  

  const titleRef = useRef<HTMLInputElement | null>(null);
  const descriptionRef = useRef<HTMLTextAreaElement | null>(null);

  const habdleSubmit = async (e: any) => {
    e.preventDefault();
    if (titleRef.current && descriptionRef.current) {
      toast.loading("Sending Blog", {id: "1"});
      await editBlog({
        title: titleRef.current?.value,
        description: descriptionRef.current?.value,
        id: params.id
      });
      toast.success("Successfully", {id: "1"});
    }
  }

  const habdleDelete = async () => {
    toast.loading("Deleting", {id:"2"});
    await deleteBlog(params.id);
    toast.success("Deleted", {id: "2"});
  }

  useEffect(() => {
    toast.loading("Loading Blog");
    getBlogById(params.id)
      .then((data) => {
        if (titleRef.current && descriptionRef.current) {
          titleRef.current.value = data.title;
          descriptionRef.current.value = data.description;
          toast.success("Success search", {id: "1"});
        }
      })
      .catch((error) => {
        console.log(error)
        toast.error("ERROR", {id: "1"});
      });
  }, [])

  return (
    <Fragment>
      <Toaster />
      <div className="w-full m-auto flex my-4">
        <div className="flex flex-col justify-center items-center m-auto">
          <p className="text-2xl text-slate-200 font-bold p-3">
            Edit the Blog
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
            <div className="flex justify-between">
              <button type='submit' className="font-semibold px-4 py-1 shadow-xl bg-slate-200 rounded-lg m-auto hover:bg-slate-100">
                Update
              </button>
              
            </div>
          </form>

          <button type='submit' className="font-semibold px-4 py-1 shadow-xl bg-red-400 rounded-lg m-auto my-2 hover:bg-red-500" onClick={() => habdleDelete}>
                DELETE
          </button>
        </div>
      </div>
    </Fragment>
  )
}

export default EditBlog