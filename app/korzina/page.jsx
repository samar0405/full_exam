"use client";
import { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  IconButton,
  Box,
  Paper,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import Image from "next/image";
import gantel from "../../images/gantel.svg";
import sumka from "../../images/sumka.svg";
import fudbolka from "../../images/fudbolka.svg";
import sport from "../../images/sport.svg";
import clik from "../../images/clik.svg";
import payme from "../../images/payme.svg";
import karta from "../../images/karta.svg";
import shot from "../../images/shot.svg";
import { getBasket } from "@/service/index";

const CartPage = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchBasket = async () => {
      try {
        const res = await getBasket.get();
        if (res.status === 200 && res?.data) {
          setData(res?.data);
        }
      } catch (error) {
        console.error("Error fetching basket data:", error.message);
      }
    };

    fetchBasket();
  }, []);

  const totalItems = data.reduce((total, item) => total + item.count, 0);
  const totalCost = data.reduce(
    (total, item) => total + item.cost * item.count,
    0
  );

  const handleQuantityChange = (id, increment) => {
    setData((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, count: Math.max(item.count + increment, 1) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setData((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="bg-secondary w-full pb-20 pt-48 lg:pt-20">
      <Container maxWidth="lg" className="pt-24 bg-secondary max-w-screen-lg">
        <Typography variant="h4" className="text-2xl font-bold mb-6">
          Ваша корзина
        </Typography>
        <Grid container spacing={8}>
          <Grid item xs={12} md={8}>
            <Paper className="p-4 mb-4 shadow-md rounded-md">
              {data.map((item) => (
                <Card
                  className="flex mb-4 bg-white shadow-md rounded-md"
                  key={item.id}
                >
                  <Image
                    src={item.image_url[0]}
                    alt={item.name}
                    width={100}
                    height={100}
                    className="object-cover rounded-l-md"
                  />
                  <CardContent className="flex-1 p-4">
                    <Typography variant="h6" className="text-xl font-semibold">
                      {item.product_name}
                    </Typography>
                    <Typography variant="subtitle1" className="text-gray-600">
                      {item.cost} uzs
                    </Typography>
                    <Box className="flex items-center mt-2">
                      <IconButton
                        onClick={() => handleQuantityChange(item.id, -1)}
                        disabled={item.count === 1}
                        className="bg-gray-200 hover:bg-gray-300"
                      >
                        <span className="text-xl">-</span>
                      </IconButton>
                      <Typography variant="body1" className="mx-2">
                        {item.count}
                      </Typography>
                      <IconButton
                        onClick={() => handleQuantityChange(item.id, 1)}
                        className="bg-gray-200 hover:bg-gray-300"
                      >
                        <span className="text-xl">+</span>
                      </IconButton>
                    </Box>
                  </CardContent>
                  <IconButton
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-2 text-red-500 hover:bg-red-100"
                  >
                    <DeleteIcon />
                  </IconButton>
                </Card>
              ))}
              <Button
                onClick={() => setData([])}
                className="mt-4 bg-red-500 text-white hover:bg-red-600"
              >
                Очистить все
              </Button>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className="p-4 shadow-md rounded-md">
              <Typography variant="h6" className="text-xl font-semibold">
                Итого
              </Typography>
              <Typography className="mt-2">
                Кол-во товаров: {totalItems}
              </Typography>
              <Typography>Сумма: {totalCost} uzs</Typography>
            </Paper>
            <Box component="form" className="mt-4 bg-[#fff] p-4">
              <Typography variant="h6" className="text-xl font-semibold">
                Ваши данные
              </Typography>
              <TextField
                fullWidth
                label="Имя /Фамилия"
                margin="normal"
                required
                className="border-gray-300"
              />
              <TextField
                fullWidth
                label="Ваш номер"
                margin="normal"
                required
                className="border-gray-300"
              />
              <TextField
                fullWidth
                label="Адрес доставки"
                margin="normal"
                required
                className="border-gray-300"
              />
              <Typography variant="h6" className="text-xl font-semibold mt-4">
                Тип оплаты
              </Typography>
              <Box className="flex flex-wrap gap-12 items-center py-4">
                <Image src={clik} alt="clik" className="w-24" />
                <Image src={payme} alt="payme" className="w-24" />
                <Image src={karta} alt="karta" className="w-24" />
                <Image src={shot} alt="shot" className="w-24" />
              </Box>
              <Button
                variant="contained"
                fullWidth
                className="bg-amber-400 mt-5"
              >
                Купить
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CartPage;
