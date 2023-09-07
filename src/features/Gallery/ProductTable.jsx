import ProductRow from "./ProductRow";
import Spinner from "../../ui/Spinner";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../services/apiProduct";

function ProductTable() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <>
      {error && <p className="col-span-7">{error.message}</p>}
      {isLoading && (
        <div className="col-span-7 flex items-center justify-center p-4">
          <Spinner />
          <span>Loading...</span>
        </div>
      )}
      {!isLoading &&
        !error &&
        products.map((product) => (
          <ProductRow key={product.id} product={product} />
        ))}
    </>
  );
}

export default ProductTable;
