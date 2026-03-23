import Post from "@/models/Post";
import connect from "@/utils/db";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const url = new URL(req.url);

  const username = url.searchParams.get("username");

  try {
    await connect();

    let posts;

    if (username) {
      posts = await Post.find({ username });
    } else {
      posts = await Post.find();
    }
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    return new NextResponse("Databae error", { status: 500 });
  }
};

export const POST = async (req) => {
  const { title, desc, username, img, content } = await req.json();

  const newPost = new Post({
    title,
    desc,
    img,
    content,
    username,
  });

  try {
    await connect();

    await newPost.save();

    return new NextResponse("Post has been created", { status: 201 });
  } catch (error) {
    return new NextResponse("Databae error", { status: 500 });
  }
};
