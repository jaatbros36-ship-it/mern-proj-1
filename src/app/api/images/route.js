import cloudinary from "@/utils/cloudinary";
import { NextResponse } from "next/server";
import { fileTypeFromBuffer } from "file-type";
import crypto from "crypto";
import streamifier from "streamifier";

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const image = formData.get("image");

    if (!image) {
      return NextResponse.json(
        { message: "Please upload image" },
        { status: 400 },
      );
    }

    // check for file size
    const buffer = Buffer.from(await image.arrayBuffer());

    if (buffer.length > 5 * 1024 * 1024) {
      return NextResponse.json(
        { message: "File is too large" },
        { status: 400 },
      );
    }

    // checking image type
    const type = await fileTypeFromBuffer(buffer);

    const allowedTypes = ["image/png", "image/jpeg", "image/webp"];

    if (!type || !allowedTypes.includes(type.mime)) {
      return NextResponse.json(
        { message: "Invalid File Type!" },
        { status: 400 },
      );
    }

    // extension check
    const allowedExtension = ["png", "jpg", "jpeg", "webp"];

    if (!allowedExtension.includes(type.ext)) {
      return NextResponse.json(
        { message: "Invalid file extension" },
        { status: 400 },
      );
    }

    // generating rendom name

    const filename = crypto.randomUUID();

    // base64 upload function
    // const base64 = `data:${type.mime};base64,${buffer.toString("base64")}`;

    // const uploadRes = await cloudinary.uploader.upload(base64, {
    //   folder: "myapp",
    //   public_id: filename,
    //   transformation: [
    //     {width:1000, height: 1000, crop: "limit", flags: "strip_profile"},
    //     {quality: "auto",
    //     fetch_format: "auto"}
    //   ]
    // });

    // stream upload
    const uploadRes = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "myapp",
          pulbic_id: filename,
          transformation: [{ flags: "strip_profile" }],
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        },
      );

      streamifier.createReadStream(buffer).pipe(stream)
    });

    return NextResponse.json({
      img_url: uploadRes.secure_url,
      img_id: uploadRes.public_id,
    });
  } catch (error) {
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
};

export const DELETE = async (req) => {
  try {
    const { public_id } = await req.json();

    await cloudinary.uploader.destroy(public_id);

    return NextResponse.json({
      message: "Image deleted successfully",
    });
  } catch (error) {
    return NextResponse.json({ message: "Delete failed" }, { status: 500 });
  }
};
