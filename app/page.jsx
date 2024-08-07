"use client";
import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import dynamic from "next/dynamic";
import "swiper/css";
import "swiper/css/navigation";
import "./globals.css";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import Link from "next/link";

import Image from "next/image";
import shoes5 from "../images/shoes5.jpg";
import shoes4 from "../images/shoes4.jpg";
import shoes2 from "../images/shoes2.jpg";
import shoes3 from "../images/shoes3.jpg";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import cat1 from "../images/cat1.svg";
import cat2 from "../images/cat2.svg";
import cat3 from "../images/cat3.svg";
import cat4 from "../images/cat4.svg";
import cat5 from "../images/cat5.svg";
import cat6 from "../images/cat6.svg";
import left from "../images/left.svg";
import right from "../images/right.svg";
import Korzinka from "../images/korzinka.svg";
import calendar from "../images/calendar.svg";
import eye from "../images/eye.svg";
import electronic from "../images/elektronic.svg";
import truck from "../images/truck.svg";
import check from "../images/check.svg";
import checklist from "../images/checklist.svg";
import percentage from "../images/percentage.svg";
import Lllll from "../images/lllllll.svg";
import puma from "../images/puma.svg";
import reebuk from "../images/reebuk.svg";
import puma2 from "../images/puma2.svg";
import nike from "../images/nike.svg";
import { product, like, getBasket } from "../service/index.js";
import { IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

import "swiper/css";
import "swiper/css/pagination";

import "./cat.css";

export default function Home() {
  const categories = [
    {
      name: "Тренажеры",
      imgSrc: cat1,
      bgColor: "#D3E5F2",
      alt: "Training Equipment",
      with: "187px",
      height: "247px",
    },
    {
      name: "Мячи",
      imgSrc: cat2,
      bgColor: "#E2C6BE",
      alt: "Balls",
      with: "187px",
      height: "247px",
    },
    {
      name: "Спортивные обуви",
      imgSrc: cat3,
      bgColor: "#DADBE0",
      alt: "Sport Shoes",
      with: "187px",
      height: "247px",
    },
    {
      name: "Спортивные одежды",
      imgSrc: cat4,
      bgColor: "#E2EEC0",
      alt: "Sport Clothes",
      with: "187px",
      height: "247px",
    },
    {
      name: "Водный спорт",
      imgSrc: cat5,
      bgColor: "#C2BCE8",
      alt: "Water Sports",
      with: "187px",
      height: "247px",
    },
    {
      name: "Горный спорт",
      imgSrc: cat6,
      bgColor: "#ABA520",
      alt: "Mountain Sports",
      with: "187px",
      height: "247px",
    },
    {
      name: "Тренажеры",
      imgSrc: cat1,
      bgColor: "#D3E5F2",
      alt: "Training Equipment",
      with: "187px",
      height: "247px",
    },
    {
      name: "Мячи",
      imgSrc: cat2,
      bgColor: "#E2C6BE",
      alt: "Balls",
      with: "187px",
      height: "247px",
    },
    {
      name: "Спортивные обуви",
      imgSrc: cat3,
      bgColor: "#DADBE0",
      alt: "Sport Shoes",
      with: "187px",
      height: "247px",
    },
    {
      name: "Спортивные одежды",
      imgSrc: cat4,
      bgColor: "#E2EEC0",
      alt: "Sport Clothes",
      with: "187px",
      height: "247px",
    },
    {
      name: "Водный спорт",
      imgSrc: cat5,
      bgColor: "#C2BCE8",
      alt: "Water Sports",
      with: "187px",
      height: "247px",
    },
    {
      name: "Горный спорт",
      imgSrc: cat6,
      bgColor: "#ABA520",
      alt: "Mountain Sports",
      with: "187px",
      height: "247px",
    },
  ];
  const [data, setData] = useState([]);

  const getData = async () => {
    try {
      const response = await product.get();
      if (
        (response.status === 200 || response.status === 201) &&
        response?.data?.products
      ) {
        setData(response?.data?.products);
      }
    } catch (error) {
      console.log(error);
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
  const handleBasket = async (id) => {
    try {
      const product = { productId: id, quantity: 1 };
      const response = await getBasket.post(product);
      console.log("Basket Response:", response);

      if (response.data === true) {
        console.log("Product added to basket successfully.");
        toast.success("Product added to basket successfully");
      } else {
        console.error("Failed to add product to basket:", response);
        toast.error("Failed to add product to basket:");
      }
    } catch (error) {
      if (error.message === "EOF") {
        console.error(
          "Server returned an empty response. Please try again later."
        );
        toast.error("Error adding product to basket:");
      } else {
        console.error("Error adding product to basket:", error);
        toast.error("Error adding product to basket:");
      }
    }
  };

  return (
    <>
      <main className=" w-full mt-44">
        <div className=" bg-[#F2F2F2]">
          <div className="max-w-[1220px] mx-auto ">
            <div>
              <Swiper
                rewind={true}
                pagination={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                modules={[Navigation, Autoplay]}
                loop={true}
                className="mySwiper pt-20 pb-24 md:pt-24 md: sm:pt-32 lg:pt-8 "
                navigation={true}
              >
                <SwiperSlide>
                  <Image
                    src={shoes2}
                    alt="truck"
                    className="max-h-[600px] rounded-[12px]"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <Image
                    src={shoes3}
                    alt="truck"
                    className="max-h-[600px] rounded-[12px]"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <Image
                    src={shoes4}
                    alt="truck"
                    className="max-h-[600px] rounded-[12px]"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  {" "}
                  <Image
                    src={shoes5}
                    alt="truck"
                    className="max-h-[600px] rounded-[12px]"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
          <div className="bg-[#fff]">
            <div className="max-w-[1220px] mx-auto pb-[80px]">
              <h1 className="text-[#1F1D14] text-[32px] font-medium pt-[20px] pb-[32px] sm:text-center md:text-left pl-6 lg:pl-0">
                Катаолог
              </h1>
              <div className="flex items-center justify-between gap-4">
                <Swiper
                  spaceBetween={30}
                  slidesPerView={6}
                  autoplay={{ delay: 3000, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  modules={[Pagination, Autoplay]}
                  loop={true}
                  className="mySwiper pb-14"
                  speed={6000}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                      spaceBetween: 10,
                    },
                    580: {
                      slidesPerView: 2,
                      spaceBetween: 10,
                    },
                    720: {
                      slidesPerView: 3,
                      spaceBetween: 30,
                    },
                    1000: {
                      slidesPerView: 4,
                      spaceBetween: 40,
                    },
                    1220: {
                      slidesPerView: 5,
                      spaceBetween: 50,
                    },
                    1536: {
                      slidesPerView: 6,
                      spaceBetween: 30,
                    },
                  }}
                >
                  {categories.map((category, index) => (
                    <SwiperSlide key={index}>
                      <div
                        style={{ backgroundColor: category.bgColor }}
                        className="w-[187px] h-[247px] flex flex-col items-center justify-between rounded-[5px] shadow-lg"
                      >
                        <h1 className="pt-[25px] px-[20px] text-center text-lg font-semibold">
                          {category.name}
                        </h1>
                        <div className="flex-grow flex items-center justify-center">
                          <Image
                            src={category.imgSrc}
                            alt={category.alt}
                            width={100}
                            height={100}
                            objectFit="contain"
                            className="pb-[36px]"
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </div>
          <div className="max-w-[1220px] mx-auto">
            <div className="pb-[76px]">
              <div className="flex justify-between items-center pt-[68px] pb-[32px] sm:px-12 md:px-8 lg:px-0">
                <h1 className="text-[32px] font-medium">Продукты</h1>
                <div className="flex gap-8">
                  <button className="bg-[#fff] p-4 rounded-[50%]">
                    <Image src={left} alt="left" />
                  </button>
                  <button className="bg-[#fff] p-4 rounded-[50%]">
                    <Image src={right} alt="right" />
                  </button>
                </div>
              </div>
              <div className="flex justify-center items-center gap-6 flex-wrap sm:px-12 sm:justify-between sm:gap-6  lg:px-0">
                <div className="pt-8 flex px-6 lg:px-0 items-center gap-12 flex-wrap">
                  {data.map((product) => (
                    <Link
                      key={product.product_id}
                      href={`/products/${product.product_id}`}
                      className="w-64 h-[444px] rounded-md bg-white flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-end pt-4 pr-4">
                        <IconButton
                          onClick={(e) => {
                            e.preventDefault();
                            handleLike(product.product_id, e);
                          }}
                          color={
                            likedItems.includes(product.product_id)
                              ? "error"
                              : "default"
                          }
                        >
                          <FavoriteIcon />
                        </IconButton>
                      </div>

                      <div className="flex justify-center items-center h-52">
                        <Image
                          width={200}
                          height={200}
                          src={
                            Array.isArray(product.image_url) &&
                            product.image_url[0]
                              ? product.image_url[0]
                              : shoes5
                          }
                          alt={product.product_name}
                          className="object-contain h-full w-full"
                        />
                      </div>

                      <div className="p-4 flex-grow overflow-hidden">
                        <h1 className="text-xl font-normal leading-normal truncate">
                          {product?.product_name}
                        </h1>
                        <h2 className="text-red-600 text-xl font-bold leading-normal pt-3 pb-3">
                          {product.cost} sum
                        </h2>
                      </div>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handleBasket(product.product_id);
                        }}
                        className="bg-yellow-400 text-gray-800 flex py-4 gap-2 justify-center items-center rounded-b-md w-full"
                      >
                        <Image src={Korzinka} alt="Korzinka" />
                        Корзина
                      </button>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-[1220px] mx-auto pb-[80px]">
            <h1 className="pb-[32px] text-[32px] font-medium text-center sm:text-center md:text-left pl-6 lg:pl-0 ">
              Полезное
            </h1>
            <div className="flex flex-wrap justify-center gap-8 sm:px-12 md:px-8 lg:px-0 md:flex-nowrap ">
              <div className="bg-white rounded-[8px] max-w-[608px] w-full">
                <div className="p-[32px]">
                  <h1 className="text-[32px] font-medium">
                    Как правильно выбрать <br />
                    эллиптический тренажер?
                  </h1>
                  <p className="text-[16px] font-normal mt-2 mb-[68px]">
                    Эллиптические тренажёры популярны среди людей <br />
                    любого возраста и с разным уровнем физической <br />
                    подготовкb Эллиптические тренажёры популярны среди <br />
                    людей любого возраста и с разным уровнем физической <br />
                    подготовки...
                  </p>
                  <div className="flex gap-12">
                    <div className="flex items-center">
                      <Image src={calendar} alt="calendar" />
                      <p className="ml-2">27.01.2022</p>
                    </div>
                    <div className="flex items-center">
                      <Image src={eye} alt="eye" />
                      <p className="ml-2">250</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center w-full max-w-[608px]">
                <div className="bg-white flex items-center justify-center rounded-[8px] w-full h-full">
                  <Image src={electronic} alt="electronic" />
                </div>
                <button className="py-[15px] bg-white mt-7 rounded-[5px] w-full">
                  Посмотреть все
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-[1220px] mx-auto pb-[80px]">
            <h1 className="pb-[32px] text-[32px] font-medium sm:text-center md:text-left pl-6 lg:pl-0">
              Примущества
            </h1>
            <div className="flex lg:justify-between items-center flex-wrap gap-6 sm:px-12 md:px-8 lg:px-0 justify-center">
              <div className=" bg-[#fff]  rounded-[8px]">
                <Image
                  src={truck}
                  className="pl-[40px] pt-[64px] w-24"
                  alt="truck"
                />
                <p className="pl-[44px] pr-[80px] pt-[30px] pb-[64px]">
                  Доставка по всему <br />
                  Узбекистану
                </p>
              </div>
              <div className=" bg-[#fff]  rounded-[8px]">
                <Image
                  src={check}
                  className="pl-[40px] pt-[64px] w-24"
                  alt="check"
                />
                <p className="pl-[40px] pr-[70px] pt-[30px] pb-[64px]">
                  Доставка по всему <br />
                  Узбекистану
                </p>
              </div>
              <div className=" bg-[#fff]  rounded-[8px]">
                <Image
                  src={percentage}
                  className="pl-[40px] pt-[64px] w-24"
                  alt="percentage"
                />
                <p className="pl-[40px] pr-[70px] pt-[30px] pb-[64px]">
                  Доставка по всему <br />
                  Узбекистану
                </p>
              </div>
              <div className=" bg-[#fff] rounded-[8px]">
                <Image
                  src={checklist}
                  className="pl-[40px] pt-[64px] w-24"
                  alt="checklist"
                />
                <p className="pl-[40px] pr-[70px] pt-[30px] pb-[64px]">
                  Доставка по всему <br />
                  Узбекистану
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-[1220px] mx-auto pb-[80px]">
            <h1 className="pb-[32px] text-[32px] font-medium sm:text-center md:text-left pl-6 lg:pl-0">
              О нас
            </h1>
            <div className="max-w-[1280px] mx-auto pb-[80px] bg-[#1F1D14] flex justify-between rounded-[8px] sm:mx-12 md:px-8 lg:mx-0">
              <p className="text-[#fff] pt-[68px] pl-[80px] text-[20px] font-normal opacity-[0.8]">
                Интернет магазин спортивных товаров 7MARKETSPORT.UZ предлагает
                <br />
                широкий ассортимент продукции с доставкой по Ташкенту, области и
                другим <br />
                регионам Узбекистана. Ведется работа как с розничными
                покупателями, так и с <br />
                оптовыми клиентами. Разнообразие форм оплаты заметно упрощает
                процесс <br />
                приобретения товара. Действует гибкая система скидок.
                Разнообразие форм <br />
                оплаты заметно упрощает процесс приобретения товара. Действует
                гибкая <br />
                система скидок.
              </p>
              <Image src={Lllll} alt="lllll" className="pt-64 pr-[44px]" />
            </div>
          </div>
          <div className="max-w-[1220px] mx-auto pb-[80px] ">
            <div className="flex items-center justify-between gap-4 ">
              <Swiper
                spaceBetween={30}
                slidesPerView={6}
                autoplay={{ delay: 2000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                modules={[Pagination, Autoplay]}
                loop={true}
                className="mySwiper pb-14 bg-[#fff] sm:mx-12 md:px-8 lg:mx-0 pt-8 items-center"
                breakpoints={{
                  320: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                  },
                  580: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                  },
                  720: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                  },
                  1000: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                  1220: {
                    slidesPerView: 5,
                    spaceBetween: 50,
                  },
                  1536: {
                    slidesPerView: 6,
                    spaceBetween: 30,
                  },
                }}
              >
                {[
                  { src: puma, alt: "puma" },
                  { src: puma2, alt: "puma2" },
                  { src: reebuk, alt: "reebuk" },
                  { src: nike, alt: "nike" },
                  { src: nike, alt: "nike" },
                  { src: nike, alt: "nike" },
                  { src: reebuk, alt: "reebuk" },
                  { src: puma, alt: "puma" },
                ].map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex justify-center items-center h-full">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        className="w-40 h-40 object-contain"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
