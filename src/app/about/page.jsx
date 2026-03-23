import React from "react";
import Image from "next/image";
import Link from "next/link";

const About = () => {
  return (
    <div className="w-full">
      <div className="relative w-full h-87.5 overflow-hidden">
        <Image
          className="object-cover grayscale"
          src="https://images.pexels.com/photos/3194521/pexels-photo-3194521.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          fill={true}
          alt=""
        />
        <div className="bg-[#53c38b] absolute left-5 bottom-5 p-1">
          <h1 className="font-bold text-3xl ">Digital Storytellers</h1>
          <p className="font-bold text-xl">
            Handcrafting award winning digital experiences
          </p>
        </div>
      </div>
      <div className=" mt-5 flex gap-20 ">
        <div className=" w-full whitespace-pre-line">
          <h1 className="my-5 font-bold text-2xl">Who Are We?</h1>
          <p className="whitespace-pre-line">
            {`Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque
            adipisci ipsam, aspernatur vel, saepe ut libero quis officiis magni
            delectus omnis nihil voluptas.\n\n Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione enim nostrum non! Dolore, esse quae repellat quisquam eaque aspernatur sed, dolores officia nostrum quas alias totam quos? Adipisci soluta eligendi mollitia maiores quos, necessitatibus cupiditate? Esse soluta veritatis possimus sapiente architecto facere minus at maxime?\n\n Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae ea necessitatibus quas minus sint eum natus voluptas expedita, illum nemo excepturi tempore perferendis fugit, optio sapiente illo, voluptatem tempora obcaecati reiciendis doloribus reprehenderit aspernatur odio aperiam. Saepe, consectetur animi.`}
          </p>
        </div>

        <div className=" w-full whitespace-pre-line">
          <h1 className="my-5 font-bold text-2xl">What We Do?</h1>
          <p className="whitespace-pre-line">
            {`Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio dolorum esse repellendus, soluta facere fuga amet sequi, quam dicta, laboriosam aliquid dolorem rem placeat tenetur. Laudantium ex maxime vel saepe eos accusantium perspiciatis. Odio dignissimos dolores doloremque assumenda.\n\n - Creative Illustrations\n\n - Dynamic Websites\n\n - Fast and Handy Mobile Apps\n\n`}
          </p>
          <div className=" w-fit p-1.5 text-white cursor-pointer rounded-md border-0 bg-[#53c38b]">
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
