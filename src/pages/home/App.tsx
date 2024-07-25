import Carousel from "./components/Hero";
import Category from "./components/Category";
import ProductList from "./components/ProductList";

export const App = () => {
  return (
    <section className="bg-[url('/background.png')] bg-repeat bg-cover">
      <Carousel />
      <Category />
      <ProductList />
    </section>
  );
};
