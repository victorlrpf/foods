import Image from "next/image";
import CategoryList from "./_components/category-list";
import Header from "./_components/header";
import Search from "./_components/search";

const Home = () => {
  return <>
  <Header />

  <div className="px-5 pt-6">
    <Search />
  </div>
  <div className="px-5 pt-6">
    <CategoryList />
  </div>

  <div>
    <Image 
    src="/Banner-promo01.png" 
    alt="até 30% de desconto em pizzas" 
    width={0} 
    height={0}
    className="w-full h-auto"
    sizes="100vw"
    quality={100}
    />
  </div>

  </>;

};

export default Home;
