"use client";

import { useEffect, useState, useRef } from "react";
import { product, getBasket, Comment } from "../../../service/index.js";
import Image from "next/image";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import "../../globals.css";
import Korzinka from "../../../images/korzinka.svg";
import client from "../../../images/client.svg";

import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ProductPage = () => {
  const params = useParams();
  const { id } = params;
  const [productData, setProductData] = useState(null);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const swiperRef = useRef(null);
  const [comments, setComments] = useState([]);
  const CommentSchema = Yup.object().shape({
    message: Yup.string().required("Message is required"),
  });

  const getComments = async (productId, page = 1, limit = 100) => {
    try {
      const response = await Comment.get(productId, page, limit);
      console.log(response);
      setComments(response?.data?.Comment || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (id) {
      getComments(id);
    }
  }, [id]);

  const handleAddBasket = async (productId) => {
    if (!productId) {
      toast.error("Invalid product ID");
      return;
    }

    try {
      const productToAdd = { productId, quantity: 1 };
      const response = await getBasket.post({
        productId,
        product: productToAdd,
      });
      console.log("Basket Response:", response);

      if (response.data === true) {
        console.log("Product added to basket successfully.");
        toast.success("Product added to basket successfully");
      } else {
        console.error("Failed to add product to basket:", response);
        toast.error("Failed to add product to basket");
      }
    } catch (error) {
      if (error.message === "EOF") {
        console.error(
          "Server returned an empty response. Please try again later."
        );
        toast.error("Error adding product to basket");
      } else {
        console.error("Error adding product to basket:", error);
        toast.error("Error adding product to basket");
      }
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await product.single(id);
        if (response.status === 200 || response.status === 201) {
          setProductData(response.data);
        } else {
          throw new Error("Failed to fetch product");
        }
      } catch (error) {
        setError(error);
        console.error(error);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleThumbnailClick = (index) => {
    setCurrentSlide(index);
    if (swiperRef.current) {
      swiperRef.current.swiper.slideTo(index);
    }
  };

  return (
    <div className="bg-[#f2f2f2] w-full">
      <div className="container mx-auto max-w-[1220px] px-8 mt-96 sm:mt-32 sm:pt-32 ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col items-center">
            <div className="relative w-full h-[500px] sm:h-[400px] pt-72 sm:pt-0">
              {productData?.image_url && (
                <Swiper
                  modules={[Navigation, Pagination]}
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={50}
                  slidesPerView={1}
                  onSlideChange={(swiper) => setCurrentSlide(swiper.realIndex)}
                  loop={true}
                  initialSlide={currentSlide}
                  ref={swiperRef}
                >
                  {productData.image_url.map((url, index) => (
                    <SwiperSlide key={index}>
                      <Image
                        className="w-full h-full object-cover"
                        width={500}
                        height={500}
                        src={url}
                        alt={productData.product_name}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </div>
            <div className="flex justify-center mt-4 flex-wrap">
              {productData?.image_url?.map((url, index) => (
                <Image
                  key={index}
                  className={`w-20 h-20 object-cover mx-1 cursor-pointer ${
                    currentSlide === index ? "border-2 border-yellow-500" : ""
                  }`}
                  width={40}
                  height={40}
                  src={url}
                  alt={productData.product_name}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-between space-y-4 bg-white p-6 rounded shadow h-auto">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                {productData?.product_name}
              </h1>
              <p className="text-lg mb-2">{productData?.description}</p>
              <div className="text-lg mb-2">
                <strong>In the set:</strong> {productData?.count} pcs
              </div>
              <div className="text-lg mb-2">
                <strong>Country of production:</strong> {productData?.made_in}
              </div>
              <div className="text-lg mb-2">
                <strong>Cost:</strong> {productData?.cost} UZS
              </div>
              <div className="text-lg mb-2">
                <strong>Color:</strong> {productData?.color}
              </div>
              <div className="text-lg mb-2">
                <strong>Size:</strong> {productData?.size}
              </div>
              <div className="text-lg mb-2">
                <strong>Minimum age:</strong> {productData?.age_min}
              </div>
              <div className="text-lg mb-2">
                <strong>Maximum age:</strong> {productData?.age_max}
              </div>
              <div className="text-lg mb-2">
                <strong>Discount:</strong> {productData?.discount}
              </div>
              <div className="text-lg mb-2">
                <strong>for:</strong> {productData?.for_gender}
              </div>
            </div>
            <div className="flex space-x-4 mt-4">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleAddBasket(productData?.product_id);
                }}
                className="bg-yellow-400 text-gray-800 flex py-4 gap-2 justify-center items-center rounded-b-md w-full"
              >
                <Image src={Korzinka} alt="Korzinka" />
                Корзина
              </button>
              <button className="bg-gray-300 text-black px-4 py-2 rounded">
                Compare
              </button>
            </div>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 ">
          <div className="bg-[#fff] p-6 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Description</h2>
            <div className="p-4 rounded">
              <p className="text-lg">{productData?.description}</p>
              <div className="text-lg mt-2">
                <strong>Weight:</strong> {productData?.weight} kg
              </div>
              <div className="text-lg mt-2">
                <strong>Color:</strong> {productData?.color}
              </div>
            </div>
          </div>
          <div className="bg-[#fff] p-6 mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Comments</h2>
            {comments.map((comment) => (
              <div key={comment.comment_id}>
                <div className="flex items-center pb-4">
                  <Image src={client} alt="client" />
                  <h1>{comment.OwnerID}</h1>
                </div>
                <p className="text-sm">{comment.Message}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#fff] p-6 mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Add a Comment</h2>
          <Formik
            initialValues={{
              message: "",
            }}
            validationSchema={CommentSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              const commentData = {
                ...values,
                productID: id,
              };
              Comment.create(commentData)
                .then((response) => {
                  console.log("Comment created successfully:", response.data);
                  setSubmitting(false);
                  resetForm();
                  getComments(id);
                })
                .catch((error) => {
                  console.error("Error creating comment:", error);
                  setSubmitting(false);
                });
            }}
          >
            {({ isSubmitting }) => (
              <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <Field
                    type="text"
                    name="message"
                    id="message"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
                  <ErrorMessage
                    name="message"
                    component="div"
                    className="text-red-500 text-xs italic"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
