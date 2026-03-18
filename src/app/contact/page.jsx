"use client";
import React from "react";
import Image from "next/image";
import { useState } from "react";

const Contact = () => {
  const [name, setName] = useState();

  return (
    <div className="w-full ">
      <h1 className="my-15 font-bold text-4xl text-center">
        Let&apos;s Keep in Touch
      </h1>
      <div className="flex justify-between items-center">
        <section className="bounceanimation w-1/2 ">
          <Image
            className="items-center text-center mx-auto"
            src="/contact.png"
            width={500}
            height={500}
            alt="Woman on call"
          />
        </section>
        <section className="w-1/2">
          <form
            className="flex flex-col gap-5 w-125 mx-auto justify-center "
            action=""
          >
            <input
              className="border rounded-sm p-2 border-[#cccbcb] "
              type="text"
              name="name"
              placeholder="Name"
            />
            <input
              className="border rounded-sm p-2 border-[#cccbcb] "
              type="text"
              name="email"
              placeholder="Email"
            />
            <textarea
              placeholder="Message"
              name="message"
              rows={7}
              className="border rounded-sm p-2 border-[#cccbcb] "
            >
              Message
            </textarea>
            <button className="p-1.5 text-white cursor-pointer rounded-md border-0 bg-[#53c38b] w-15 text-center">
              Send
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Contact;
