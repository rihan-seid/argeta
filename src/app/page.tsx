
import { FeaturesPage } from "../../component/Features";
import Footer from "../../component/Footer";
import Hero from "../../component/Hero";
import ProductSections from "../../component/productCard";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturesPage />
      <ProductSections/>
      <Footer />
    </>
  );
}
