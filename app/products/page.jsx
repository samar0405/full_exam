"use client";
import Right1 from "../../images/right1.svg";
import home from "../../images/home.svg";
import Image from "next/image";
import floor from "../../images/floor.svg";
import board from "../../images/board.svg";
import Korzinka from "../../images/korzinka.svg";
import list from "../../images/list.svg";
import liner from "../../images/liner.svg";
import right from "../../images/right.svg";
import left from "../../images/left.svg";
import shoes5 from "../../images/shoes5.jpg";
import React, { useState, useEffect } from "react";
import { product, like, getBasket } from "../../service/index.js";
import Link from "next/link";
import {
  Slider,
  TextField,
  Select,
  MenuItem,
  Button,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Products = () => {
  const [price, setPrice] = useState([3000, 40000]);
  const [article, setArticle] = useState("");
  const [category, setCategory] = useState("Все");
  const [newItem, setNewItem] = useState("Все");
  const [promotion, setPromotion] = useState("Все");
  const [data, setData] = useState([]);

  const handlePriceChange = (event, newValue) => {
    setPrice(newValue);
  };

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
      console.error("Error fetching products:", error);
    }
  };

  const handleAddBasket = async (id) => {
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
    <main className="w-full mt-44">
      <div className="bg-[#F2F2F2] pt-20">
        <div className="max-w-[1220px] mx-auto">
          <div className="flex flex-wrap items-center gap-2 md:gap-[10px] pt-[28px] pb-[20px]">
            <Image src={home} alt="home" />
            <p className="font-[400] text-[16px] text-[#111] opacity-[0.8]">
              Главная
            </p>
            <Image src={Right1} alt="Right1" />
            <p className="font-[400] text-[16px]">Продукты</p>
          </div>

          <div className="flex gap-12 lg:flex-nowrap sm:flex-wrap flex-wrap">
            <div className="w-full sm:w-full lg:w-72 pt-3">
              <div className="p-4 bg-white rounded-md shadow-md">
                <h3 className="text-lg font-bold mb-4">Фильтр</h3>

                <div className="mb-4">
                  <InputLabel>Цена</InputLabel>
                  <Slider
                    value={price}
                    onChange={handlePriceChange}
                    valueLabelDisplay="auto"
                    min={3000}
                    max={40000}
                    sx={{ color: "#fbc02d" }}
                  />
                  <div className="flex justify-between">
                    <span>{price[0]} uzs</span>
                    <span>{price[1]} uzs</span>
                  </div>
                </div>
                <div className="mb-4">
                  <TextField
                    label="Артикул"
                    variant="outlined"
                    fullWidth
                    value={article}
                    onChange={(e) => setArticle(e.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Выберите категорию</InputLabel>
                    <Select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      label="Выберите категорию"
                    >
                      <MenuItem value="Все">Все</MenuItem>
                      <MenuItem value="Категория 1">Категория 1</MenuItem>
                      <MenuItem value="Категория 2">Категория 2</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="mb-4">
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Новинка</InputLabel>
                    <Select
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      label="Новинка"
                    >
                      <MenuItem value="Все">Все</MenuItem>
                      <MenuItem value="Да">Да</MenuItem>
                      <MenuItem value="Нет">Нет</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="mb-4">
                  <FormControl fullWidth variant="outlined">
                    <InputLabel>Акция</InputLabel>
                    <Select
                      value={promotion}
                      onChange={(e) => setPromotion(e.target.value)}
                      label="Акция"
                    >
                      <MenuItem value="Все">Все</MenuItem>
                      <MenuItem value="Да">Да</MenuItem>
                      <MenuItem value="Нет">Нет</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ backgroundColor: "#fbc02d", color: "white" }}
                >
                  Показать результат
                </Button>
              </div>
            </div>

            <div className="w-full md:w-3/4">
              <div className="flex  items-center mb-4 px-6 lg:px-0 justify-between">
                <div className="flex gap-6">
                  <button className="flex items-center bg-white px-4 py-2 rounded-md ">
                    <p>Сортировать</p>
                    <Image src={floor} alt="Sort" />
                  </button>
                  <button className="flex items-center bg-white px-4 py-2 rounded-md">
                    <p>Все продукты</p>
                    <Image src={floor} alt="All Products" />
                  </button>
                </div>
                <div className="flex items-center gap-6">
                  <button className="flex items-center bg-white p-2 rounded-full">
                    <Image src={board} alt="Board View" />
                  </button>
                  <button className="flex items-center bg-white p-2 rounded-full">
                    <Image src={list} alt="List View" />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap gap-12 px-16 sm:px-12 md:px-8 lg:px-0">
                {data.map((product) => (
                  <Link
                    key={product.product_id}
                    href={`/products/${product.product_id}`}
                    className="w-64 h-[444px] rounded-md bg-white flex flex-col justify-between"
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
                        handleAddBasket(product.product_id);
                      }}
                      className="bg-yellow-400 text-gray-800 flex py-4 gap-2 justify-center items-center rounded-b-md w-full"
                    >
                      <Image src={Korzinka} alt="Korzinka" />
                      Корзина
                    </button>
                  </Link>
                ))}
              </div>
              <button className="w-full mt-14 bg-white py-4 rounded-md">
                Показать ещё
              </button>
            </div>
          </div>

          <div className="pb-20">
            <div className="flex flex-wrap justify-between items-center pt-16 pb-8">
              <h1 className="text-2xl font-medium">Реконмендуемые продукты</h1>
              <div className="flex gap-8 mt-4 md:mt-0">
                <button className="bg-white p-4 rounded-full">
                  <Image src={left} alt="left" />
                </button>
                <button className="bg-white p-4 rounded-full">
                  <Image src={right} alt="right" />
                </button>
              </div>
            </div>

            <div className="pt-8 flex px-16 sm:px-12 md:px-8 lg:px-0 items-center gap-12 flex-wrap ">
              {data.map((product) => (
                <Link
                  key={product.product_id}
                  href={`/products/${product.product_id}`}
                  className="w-64 h-[444px] rounded-md bg-white flex flex-col justify-between"
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

                  <div className="flex justify-center items-center h-52">
                    <Image
                      width={200}
                      height={200}
                      src={
                        Array.isArray(product.image_url) && product.image_url[0]
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
                      handleAddBasket(product.product_id);
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
    </main>
  );
};

export default Products;
