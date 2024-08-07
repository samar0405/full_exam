
import Image from "next/image";
import logos from "../images/logo.svg";
import Phone from "../images/phone.svg";
import Mail from "../images/mail.svg";
import Instagram from "../images/instagram.svg";
import Facebook from "../images/facebook.svg";
import Telegram from "../images/telegram.svg";
import Line from "../images/Line.svg";

const Footer = () => {
  return (
    <footer>
      <div className="bg-[#FBD029] h-5"></div>
      <div className="bg-[#1F1D14] py-8">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 flex flex-wrap justify-between items-start gap-8">
         
          <div className="flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-3">
              <Image src={logos} alt="Logo" />
              <h1 className="text-[#fff] font-semibold text-[24px] text-center lg:text-left">
                Sport <br />
                Market
              </h1>
            </div>
          </div>

         
          <div className="flex flex-col items-center lg:items-start">
            <p className="text-[#fff] font-semibold mb-2 text-center lg:text-left">
              Контакты
            </p>
            <div className="flex flex-col items-center lg:items-start gap-2">
              <div className="flex items-center gap-2">
                <Image src={Phone} alt="Phone" />
                <p className="text-[#fff] text-[16px] opacity-[0.8]">
                  <span className="text-xs">+998 (90)</span> 565-85-85
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Image src={Mail} alt="Mail" />
                <p className="text-[#fff] text-[14px] opacity-[0.8]">
                  info@gmail.com
                </p>
              </div>
            </div>
          </div>

          
          <div className="flex flex-col items-center lg:items-start">
            <h3 className="text-[#fff] font-semibold mb-2 text-center lg:text-left">
              Адрес
            </h3>
            <p className="text-[#fff] text-[14px] opacity-[0.8] text-center lg:text-left">
              Tashkent Sh. Chilonzor 9 kvartal <br />
              12 uy
            </p>
          </div>

          
          <div className="flex flex-col items-center lg:items-start">
            <p className="text-[#fff] font-semibold mb-2 text-center lg:text-left">
              Подписаться
            </p>
            <input
              type="email"
              placeholder="support@figma.com"
              className="bg-[#fff] text-center lg:text-left py-2 px-4 rounded-[5px] w-full lg:w-auto mt-2"
            />
            <button className="bg-[#FBD029] py-2 px-[82px] rounded-[5px] w-full lg:w-auto mt-4">
              Отправить
            </button>
            <div className="flex items-center gap-4 pt-6">
              <Image src={Instagram} alt="Instagram" />
              <Image src={Facebook} alt="Facebook" />
              <Image src={Telegram} alt="Telegram" />
            </div>
          </div>
        </div>

        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 mt-8">
          <Image src={Line} alt="Line" className="w-full" />
          <div className="flex flex-col lg:flex-row justify-between items-center py-4 gap-4">
            <p className="text-[12px] text-[#FFFFFF] opacity-[0.6]">
              © 2022 All Rights Reserved
            </p>
            <div className="flex flex-wrap items-center gap-4 lg:gap-[40px] text-[12px] text-[#FFFFFF] opacity-[0.6]">
              <p>Privacy Policy</p>
              <p>Terms of Use</p>
              <p>Sales and Refunds</p>
              <p>Legal</p>
              <p>Site Map</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
