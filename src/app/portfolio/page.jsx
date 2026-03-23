import React from "react";
import Image from "next/image";
import Link from "next/link";

const Portolio = () => {
  return (
    <div>
      <h2 className=" px-20 font-bold text-2xl my-3"> Choose a gallery</h2>
      <section className="grid grid-cols-3 gap-20 px-20 w-[1366px]">
        <section className="w-full">
          <Link
            className=" block relative bg-[url('/illustration.png')] bg-cover bg-center w-full h-[60vh]"
            href="/portfolio/illustration"
          >
            <div className="absolute bottom-6 left-[25%] font-bold text-3xl text-white">Illustration</div>
          </Link>
        </section>
        <section className="w-full">
          <Link
            className=" block relative bg-[url('/websites.jpg')] grayscale bg-cover bg-center w-full h-[60vh]"
            href="/portfolio/website"
          >
            <div className="absolute bottom-6 left-[25%] font-bold text-3xl text-white"> Websites</div>
          </Link>
        </section>
        <section className="w-full">
          <Link
            className=" block relative bg-[url('/apps.jpg')] bg-cover grayscale bg-center w-full h-[60vh]"
            href="/portfolio/application"
          >
            <div className="absolute bottom-6 left-[25%] font-bold text-3xl bg-black/40 rounded-md text-white">Applications</div>
          </Link>
        </section>
      </section>
    </div>
  );
};

export default Portolio;
