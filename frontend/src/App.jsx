import ProductCard from "./components/ProductCard";


function App() {
  return (
    <>
      <ProductCard product={{
    id: 1,
    name: "Engagement Ring 1",
    popularityScore: 0.85,
    weight: 2.1,
    images: {
      yellow: "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG085-100P-Y.jpg?v=1696588368",
      rose: "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG085-100P-R.jpg?v=1696588406",
      white: "https://cdn.shopify.com/s/files/1/0484/1429/4167/files/EG085-100P-W.jpg?v=1696588402"
    }
  }} />
    </>
  );
}

export default App;
