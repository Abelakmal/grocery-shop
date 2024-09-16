import { Footer, FooterCopyright, FooterIcon } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

const FooterComp = () => {
  return (
    <Footer className="bg-orange-50  h-full">
      <div className="container mx-auto max-w-7xl px-5 md:py-20 py-40">
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="#" by="GroceryShop™" year={2024} />
          <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
            <FooterIcon href="#" icon={BsFacebook} />
            <FooterIcon href="#" icon={BsInstagram} />
            <FooterIcon href="#" icon={BsTwitter} />
            <FooterIcon href="#" icon={BsGithub} />
            <FooterIcon href="#" icon={BsDribbble} />
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterComp;
