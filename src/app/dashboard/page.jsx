"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWR from "swr";
import Image from "next/image";

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/posts?username=${session?.user?.name}`,
    fetcher,
  );

  console.log(data);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/dashboard/login");
    }
  }, [router, status]);

  if (status === "loading") return <p>Loading...</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const title = e.target[0].value;
    const desc = e.target[1].value;
    const img = e.target[2].value;
    const content = e.target[3].value;

    try {
      await fetch("/api/posts", {
        method: "POST",
        body: JSON.stringify({
          title,
          desc,
          img,
          content,
          username: session.user.name,
        }),
      });
      mutate();
      e.target.reset()
    } catch (error) {}
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });
      mutate()
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex w-full">
      <div className=" flex flex-col gap-20 w-1/2 mt-20">
        {isLoading
          ? "Loading..."
          : data?.map((post) => (
              <div
                className="flex w-full justify-between items-center pr-15"
                key={post._id}
              >
                <div>
                  <Image width={125} height={125} alt="" src={post.img} />
                </div>
                <h2>{post.title}</h2>
                <span
                  className="font-extrabold text-3xl cursor-pointer text-red-500"
                  onClick={() => {handleDelete(post._id)}}
                >
                  X
                </span>
              </div>
            ))}
      </div>
      <form
        className="flex gap-5 justify-center flex-col w-1/2"
        onSubmit={handleSubmit}
      >
        <h2 className="font-extrabold text-3xl">Add new post</h2>
        <input
          className="border font-bold rounded-sm p-2 border-[#cccbcb]"
          type="text"
          placeholder="Title"
          name="title"
        />
        <input
          className="border rounded-sm font-bold p-2 border-[#cccbcb]"
          type="text"
          placeholder="Description"
          name="desc"
        />
        <input
          className="border font-bold rounded-sm p-2 border-[#cccbcb]"
          type="text"
          placeholder="Image URL"
          name="image"
        />
        <textarea
          className="border rounded-sm p-2 font-bold border-[#cccbcb]"
          name="content"
          placeholder="Content"
          cols={30}
          rows={10}
        ></textarea>
        <button
          className="p-1.5 text-white font-bold text-xl cursor-pointer rounded-md border-0 bg-[#53c38b] w-25 text-center"
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
