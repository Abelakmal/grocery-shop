import Delivered from './Components/Delivered';
import Carousel from './Components/Hero';
import Category from './Components/Category';
import ProductList from './Components/ProductList';
import NavbarComp from '@/components/NavbarComp';
import FooterComp from '@/components/FooterComp';
import MobileNavBar from '@/components/MobileNavBar';

const Home = () => {
  return (
    <main>
      <NavbarComp />
      <Delivered />
      <Carousel />
      <Category />
      <ProductList />
      <FooterComp />
      <MobileNavBar />
    </main>
  );
};

export default Home;
