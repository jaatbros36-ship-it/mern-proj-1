import React from "react";
import Image from "next/image";
import Link from "next/link";


const Home = () => {
  return (
    <>
      <div className="flex justify-between w-full items-center ">
        <div className=" w-1/2 ">
          <h1 className="text-[72px] leading-tight font-bold text-transparent bg-clip-text bg-linear-180 from-[#7e7d7d] to-[#3d8f66]">
            Better design for your digital products.
          </h1>
          <p className="my-10 text-xl">
            Turning your idea into Reality. We bring together the teams from the
            global tech industry
          </p>
          <div className=" w-fit p-1.5 text-white cursor-pointer rounded-md border-0 bg-[#53c38b]">
            <Link href="/portfolio"> See Our Works</Link>
          </div>
        </div>
        <div className="m-14 bounceanimation">
          <Image src="/hero.png" width={500} height={500} alt="main img" />
        </div>
      </div>
    </>
  );
};

export default Home;
