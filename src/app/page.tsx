import { Hero } from "@/components/Hero";
import { ProductCatalog } from "@/components/ProductCatalog";
import { FragrancePyramid } from "@/components/FragrancePyramid";
import { BrandEthos } from "@/components/BrandEthos";
import { ContactSection } from "@/components/ContactSection";
import { CANDLE_PRODUCTS } from "@/lib/products";

export default function Home() {
  return (
    <>
      <Hero />
      <ProductCatalog initialProducts={CANDLE_PRODUCTS} />
      <FragrancePyramid />
      <BrandEthos />
      <ContactSection />
    </>
  );
}
