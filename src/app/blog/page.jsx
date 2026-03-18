import React from "react";
import Link from "next/link";
import Image from "next/image";


async function getData() {
  const res = await fetch("http://localhost:3000/api/posts", {
    cache: "no-store",
  });
  
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  
  return res.json();
}

export const metadata = {
  title: "Blog",
  description: "This is Blog page",
};

const Blog = async () => {
  const data = await getData();
  return (
    <div className="">
      {data.map((item) => (
        <Link href={`/blog/${item._id}`} className="" key={item._id}>
          <div className="">
            <Image
              src={item.img}
              alt=""
              width={400}
              height={250}
              className=""
            />
          </div>
          <div className="">
            <h1 className=""> {item.title}</h1>
            <p className="">{item.desc}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Blog;
