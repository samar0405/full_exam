"use client";
import Like from "@/service/like";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import shoes5 from "../../images/shoes5.jpg";
import liner from "../../images/liner.svg";
import Korzinka from "../../images/korzinka.svg";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Index = () => {
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await Like.get();
      console.log("API Response:", response);

      setData(
        Array.isArray(response.data.products) ? response.data.products : []
      );
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const [likedItems, setLikedItems] = useState(
    JSON.parse(Cookies.get("likedItems") || "[]")
  );

  const handleLike = async (id, event) => {
    event.preventDefault();
    try {
      const response = await like.postLike(id);
      console.log("Like Response:", response);
      if (response.data === true) {
        const updatedLikedItems = [...likedItems, id];
        toast.success("Product added to wishlist");
        setLikedItems(updatedLikedItems);
        Cookies.set("likedItems", JSON.stringify(updatedLikedItems), {
          expires: 7,
        }); // Expires in 7 days
      } else {
        const updatedLikedItems = likedItems.filter((itemId) => itemId !== id);
        toast.error("Product removed from wishlist");
        setLikedItems(updatedLikedItems);
        Cookies.set("likedItems", JSON.stringify(updatedLikedItems), {
          expires: 7,
        }); // Expires in 7 days
      }
    } catch (error) {
      console.error("Error liking product:", error);
      toast.error("Error liking product");
    }
  };

  useEffect(() => {
    getData();
    if (typeof window !== "undefined") {
      const storedLikedItems = JSON.parse(Cookies.get("likedItems") || "[]");
      setLikedItems(storedLikedItems);
    }
  }, []);

  return (
    <div className="w-full bg-[#f2f2f2]">
      <div className="container">
        <div className="flex justify-center items-center gap-6 flex-wrap sm:px-12 sm:justify-between sm:gap-6 lg:px-0 mt-72 pb-32">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((product) => (
              <Link
                key={product.product_id}
                href={`/products/${product.product_id}`}
                className="w-[266px] h-[416px] rounded-[5px] bg-[#fff] flex flex-col justify-between"
              >
                <div className="flex items-center justify-end pt-4 pr-4">
                  <IconButton
                    onClick={(e) => handleLike(product.product_id, e)}
                    color={
                      likedItems.includes(product.product_id)
                        ? "error"
                        : "default"
                    }
                  >
                    <FavoriteIcon />
                  </IconButton>
                </div>

                <div className="flex justify-center items-center h-[200px]">
                  <Image
                    width={200}
                    height={200}
                    src={
                      Array.isArray(product.image_url) && product.image_url[0]
                        ? product.image_url[0]
                        : shoes5
                    }
                    alt={product.product_name}
                    className="object-contain h-[200px] w-full"
                  />
                </div>

                <div className="p-4 flex-grow">
                  <h1 className="text-[20px] font-normal leading-normal">
                    {product?.product_name}
                  </h1>
                  <h2 className="text-[#FF1313] text-[20px] font-bold leading-normal pt-3 pb-3">
                    {product.cost} sum
                  </h2>
                </div>

                <button className="bg-[#FBD029] text-[#111] flex py-[15px] gap-2 justify-center items-center rounded-b-[5px] w-full">
                  <Image src={Korzinka} alt="Korzinka" />
                  Корзина
                </button>
              </Link>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
