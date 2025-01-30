"use client";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
const ProductImages = ({ images }: { images: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <>
      <div className="">
        <Image
          src={images[currentImage]}
          alt="item image"
          width={800}
          height={800}
          className="min-h-[300px] object-cover object-center"
        />
        <div className="flex gap-2 overflow-x-auto max-w-full px-2">
          {images.map((image, index) => (
            <div>
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`relative w-[80px] rounded-md overflow-hidden border-2 ${
                  currentImage === index
                    ? "border-green-500"
                    : "border-transparent"
                }`}
              >
                <Image src={image} alt="item image" width={100} height={100} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProductImages;
