import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

async function getData(id) {
  const res = await fetch(`http://localhost:3000/api/posts/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export async function generateMetadata({ params}) {
    const { id } = await params;
  const post = await getData(id)
  return {
    title: post.title,
    description: post.desc,
  }
}

const BlogPost = async ({ params }) => {
  const { id } = await params;
  const data = await getData(id);
  return (
    <div className="">
      <div>
        <h1 className=""> {data.title}</h1>
        <p className="">{data.desc}</p>
      </div>
      <div>{data.username}</div>
      <div className="">
        <Image src={data.img} alt="" width={400} priority height={250} className="" />
      </div>
      <div className="">{data.content}</div>
    </div>
  );
};

export default BlogPost;
