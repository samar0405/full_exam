"use client";

import Image from "next/image";
import Link from "next/link";
import Modal from "@mui/material/Modal";
import Cookies from "js-cookie";

import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../service/index.js";
import { ToastContainer, toast } from "react-toastify";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import "react-toastify/dist/ReactToastify.css";
import Logo from "../images/logo.svg";
import Phone from "../images/phone.svg";
import Mail from "../images/mail.svg";
import Ktg from "../images/ktg.svg";
import Search from "../images/search.svg";
import User from "../images/user.svg";
import Like from "../images/like.svg";
import Korzinka from "../images/korzinka.svg";
import Hamburger from "../images/burger.svg";
import Call from "../images/call.svg";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z]).{7,}$/,
      "Password must contain at least 7 characters, one uppercase and one lowercase letter"
    )
    .required("Password is required"),
});

const links = [
  { path: "/", title: "Oсновной" },
  { path: "/products", title: "Продукты" },
  { path: "/contact", title: "Контакты" },
  { path: "/payment", title: "Оплата и Доставка" },
  { path: "/news", title: "Новости" },
  { path: "/about", title: "О нас" },
];

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleModalOpen = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await auth.sign_in(values);
      if (response) {
        Cookies.set("access_token", response?.data?.access_token, {
          secure: true,
          sameSite: "Strict",
        });
        toast.success("Successfully signed in!");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to sign in. Please check your credentials.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <header className="fixed z-30 w-full">
        <div className="bg-[#1F1D14]">
          <div className="max-w-[1280px] mx-auto py-[12px] flex justify-between items-center px-4 lg:px-8">
            <div className="flex items-center gap-[36px]">
              <LogoSection />
              <NavLinks />
            </div>
            <ContactInfo />
            <button
              className="lg:hidden p-2"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Image src={Hamburger} alt="Menu" className="text-[#fff]" />
            </button>
          </div>
        </div>
        <SearchSection handleModalOpen={handleModalOpen} />
      </header>
      {sidebarOpen && <Overlay onClick={() => setSidebarOpen(false)} />}
      <MobileSidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <UserModal
        open={modalOpen}
        onClose={handleModalClose}
        handleClickShowPassword={handleClickShowPassword}
        showPassword={showPassword}
        handleSubmit={handleSubmit}
      />
      <ToastContainer />
    </>
  );
};

const LogoSection = () => (
  <div className="flex items-center gap-2">
    <Image src={Logo} alt="Logo" />
    <h1 className="text-[#fff] opacity-[0.9] font-semibold text-[24px]">
      Sport <br /> Market
    </h1>
  </div>
);

const NavLinks = () => (
  <div className="hidden lg:flex gap-[30px]">
    {links.map((item, index) => (
      <Link
        href={item.path}
        key={index}
        className="text-[#fff] opacity-[0.8] text-[14px] font-normal hover:text-[#FBD029]"
      >
        {item.title}
      </Link>
    ))}
  </div>
);

const ContactInfo = () => (
  <div className="hidden lg:flex items-center justify-center gap-[30px]">
    <div className="flex items-center">
      <Image src={Phone} alt="Phone" />
      <p className="text-[#fff] flex items-center gap-1 opacity-[0.8] text-[16px] hover:text-[#FBD029]">
        <span className="text-xs">+998 (90)</span> 565-85-85
      </p>
    </div>
    <div className="flex items-center">
      <Image src={Mail} alt="Mail" />
      <p className="text-[#fff] opacity-[0.8] text-[14px]">info@gmail.com</p>
    </div>
  </div>
);

const SearchSection = ({ handleModalOpen }) => (
  <div className="bg-[#fff]">
    <div className="max-w-[1280px] mx-auto flex gap-3 justify-between items-center flex-wrap px-4 lg:px-8 py-3">
      <div className="flex items-center gap-3 w-full lg:w-auto">
        <button className="bg-[#1F1D14] text-[#fff] flex py-[12px] px-[20px] lg:px-[40px] rounded-[5px] gap-2 hover:bg-[#FBD029]">
          <Image src={Ktg} alt="Katalog" /> Каталог
        </button>
        <div className="flex flex-grow bg-[#F2F2F2] rounded-[5px] items-center h-[53px]">
          <input
            type="text"
            placeholder="Поиск"
            className="outline-none bg-[#F2F2F2] pl-5 rounded-l-[5px] flex-grow w-full"
          />
          <button className="p-3 hover:text-[#FBD029]">
            <Image src={Search} alt="Search" />
          </button>
        </div>
      </div>
      <div className="flex gap-4 mt-4 lg:mt-0">
        <button onClick={handleModalOpen}>
          <IconButton src={User} alt="User" />
        </button>
        <Link href="/wishlist">
          <IconButton src={Like} alt="Like" />
        </Link>
        <Link href="/korzina">
          <button className="bg-[#F2F2F2] text-[#111] flex py-[12px] px-[20px] lg:px-[40px] rounded-[5px] gap-2 hover:bg-[#FBD029]">
            <Image src={Korzinka} alt="Korzinka" /> Корзина
          </button>
        </Link>
      </div>
    </div>
  </div>
);

const IconButton = ({ src, alt }) => (
  <div className="bg-[#F2F2F2] flex items-center justify-center p-[10px] lg:p-[13px] rounded-[5px]">
    <Image src={src} alt={alt} />
  </div>
);

const Overlay = ({ onClick }) => (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden"
    onClick={onClick}
  ></div>
);

const MobileSidebar = ({ sidebarOpen, setSidebarOpen }) => (
  <div
    className={`fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-50 transform transition-transform ${
      sidebarOpen ? "translate-x-0" : "translate-x-full"
    } lg:hidden`}
  >
    <div className="p-4">
      <button
        className="text-black mb-4"
        onClick={() => setSidebarOpen(false)}
        aria-label="Close sidebar"
      >
        Закрывать
      </button>
      <div className="flex flex-col gap-4">
        {links.map((item, index) => (
          <Link
            href={item.path}
            key={index}
            className="text-black text-[14px] font-normal"
          >
            {item.title}
          </Link>
        ))}
      </div>
      <div className="mt-8">
        <ContactInfoMobile />
      </div>
    </div>
  </div>
);

const ContactInfoMobile = () => (
  <>
    <div className="flex items-center mb-4">
      <Image src={Call} alt="Call" />
      <p className="text-black flex items-center gap-1 text-[16px]">
        +998 (90) 565-85-85
      </p>
    </div>
    <div className="flex items-center">
      <Image src={Mail} alt="Mail" />
      <p className="text-black text-[14px]">info@gmail.com</p>
    </div>
  </>
);

const UserModal = ({ open, onClose, handleSubmit }) => {
  const [showPassword, setShowPassword] = useState(true);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="w-full sm:w-[400px] bg-white rounded-md p-8 shadow-lg mx-auto mt-20 relative">
        <button className="absolute top-4 right-4 text-black" onClick={onClose}>
          ✖
        </button>
        <h2 className="text-center text-2xl font-bold mb-4">Вход в аккаунт</h2>
        <p className="text-center mb-6">
          Если Вы не зарегистрированы, нажмите кнопку{" "}
          <a href="#" className="text-yellow-500">
            Регистрация
          </a>
        </p>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              <Field name="email">
                {({ field, meta }) => (
                  <div>
                    <TextField
                      {...field}
                      type="email"
                      fullWidth
                      placeholder="Login"
                      variant="outlined"
                      error={meta.touched && Boolean(meta.error)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <span role="img" aria-label="login">
                              🔒
                            </span>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {meta.touched && meta.error && (
                      <FormHelperText error>{meta.error}</FormHelperText>
                    )}
                  </div>
                )}
              </Field>
              <Field name="password">
                {({ field, meta }) => (
                  <div>
                    <TextField
                      {...field}
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      placeholder="Password"
                      variant="outlined"
                      error={meta.touched && Boolean(meta.error)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <span role="img" aria-label="password">
                              🗝️
                            </span>
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={handleClickShowPassword}>
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {meta.touched && meta.error && (
                      <FormHelperText error>{meta.error}</FormHelperText>
                    )}
                  </div>
                )}
              </Field>
              <div className="flex justify-between text-sm">
                <a href="#" className="text-blue-600">
                  Забыли пароль?
                </a>
              </div>
              <Button
                variant="contained"
                fullWidth
                type="submit"
                disabled={isSubmitting}
                style={{ backgroundColor: "#FBD029", color: "#000" }}
              >
                Войти
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
};

export default Header;
