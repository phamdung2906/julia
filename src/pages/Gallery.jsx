import HeaderWrapper from "../ui/HeaderWrapper";
import Heading from "../ui/Heading";
import Button from "../ui/Button";
import SearchForm from "../ui/SearchForm";

import TableHeader from "../features/Gallery/TableHeader";
import ProductTable from "../features/Gallery/ProductTable";
import CreateProductForm from "../features/Gallery/CreateProductForm";

import { HiOutlinePlus } from "react-icons/hi2";
import { useState } from "react";

function Gallery() {
  const [showModal, setShowModal] = useState(false);
  // useEffect(
  //   function () {
  //     const fetchQuery = async () => {
  //       try {
  //         setIsLoading(true);
  //         const res = await fetch(`${BASE_URL}/products`);
  //         const newData = await res.json();
  //         const filter = newData.filter((product) =>
  //           product.product_name.includes(query),
  //         );
  //         setProducts(filter);
  //       } catch (err) {
  //         console.log(err);
  //       } finally {
  //         setIsLoading(false);
  //       }
  //     };
  //     fetchQuery();
  //   },
  //   [query],
  // );
  return (
    <>
      {showModal && <CreateProductForm setShowModal={setShowModal} />}
      <HeaderWrapper>
        <Heading>Gallery</Heading>

        <SearchForm
          // query={query}
          // setQuery={setQuery}
          placeholder="Nhập tên sản phẩm"
        />
      </HeaderWrapper>

      <section className="rounded-md border border-b-0 bg-teal-50 ">
        <div className="grid grid-cols-[0.7fr,2.6fr,1fr,1fr,1fr,1fr] items-center gap-x-8 border-b px-4 text-lg ">
          <TableHeader />
          <ProductTable />
        </div>
      </section>
      <div className="my-4">
        <Button
          type="primary"
          icon={<HiOutlinePlus size={24} stroke="#f0fdfa" />}
          onClick={() => setShowModal(true)}
        >
          Add New
        </Button>
      </div>
    </>
  );
}

export default Gallery;
