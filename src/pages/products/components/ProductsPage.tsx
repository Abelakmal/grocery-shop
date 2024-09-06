import { useState } from "react";
import { SidebarProducts } from "./SidebarProducts";
import { ListProducts } from "./ListProducts";
import { ICategory } from "../../../types/category.type";

const ProductsPage = () => {
  const [filterCategory, setFilterCategory] = useState<ICategory[]>([]);
  const [showSide, setShowSide] = useState<boolean>(false);
  return (
    <div className="flex bg-[url('/background.png')] bg-no-repeat bg-cover ">
      <SidebarProducts
        setFilterCategory={setFilterCategory}
        showSide={showSide}
        setShowSide={setShowSide}
      />
      <ListProducts filterCategory={filterCategory} setShowSide={setShowSide} />
    </div>
  );
};

export default ProductsPage;
