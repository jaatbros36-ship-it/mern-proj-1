import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="my-3 flex justify-between w-[1366px] mx-auto">
      <div>
        &copy; 2026 Lamamia. All rights reserved.
      </div>
      <div className="flex gap-2.5">
      <Image src="/1.png" className="cursor-pointer opacity-70" width={25} height={25} alt="" /> 
      <Image src="/2.png" className="cursor-pointer opacity-70" width={25} height={25} alt="" /> 
      <Image src="/3.png" className="cursor-pointer opacity-70" width={25} height={25} alt="" /> 
      <Image src="/4.png" className="cursor-pointer opacity-70" width={25} height={25} alt="" /> 
      </div>
    </div>
  );
};

export default Footer;
