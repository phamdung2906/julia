/* eslint-disable react/prop-types */
import { useState } from "react";

import { FormatVND } from "../../utils/FormatVND";
import { HiOutlinePlusCircle } from "react-icons/hi2";

import SearchForm from "../../ui/SearchForm";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import useFetch from "../../hooks/useFetch";

function ModalSearchProduct({ onCloseModal, dispatch, orderProductID }) {
  const [isLoading, error, data] = useFetch("products");
  const [idProductChoosen, setIdProductChoosen] = useState();
  console.log(orderProductID);
  function handleAddProduct(idProductChoosen) {
    const indexExist = data.findIndex(
      (pro) => pro.product_id === idProductChoosen,
    );
    if (indexExist < 0) return;
    dispatch({
      type: "changImage",
      payload: {
        id: orderProductID,
        img: data[indexExist].img,
        name: data[indexExist].product_name,
      },
    });
    onCloseModal();
  }
  return (
    <Modal>
      <div className="min-h-[20rem]">
        <SearchForm placeholder="Nhập tên sản phẩm" />
        <ul className="mt-6 h-80 overflow-y-scroll">
          {isLoading && <p>Loading ...</p>}
          {error && <p>{error}</p>}
          {data.map((pro) => (
            <li
              key={pro.product_id}
              onClick={() => setIdProductChoosen(pro.product_id)}
              className={`${"grid cursor-pointer grid-cols-[1fr,auto,auto] items-center gap-4 rounded-md p-2 hover:bg-teal-100"} ${
                pro.product_id === idProductChoosen && "bg-teal-100"
              }`}
            >
              <span className="flex items-center gap-2">
                <img src={pro.img} alt="anh sp" className="w-14 rounded-md" />
                <p>Mã {pro.product_name}</p>
              </span>
              <p>{FormatVND.format(pro.product_price)}</p>
              <p>{FormatVND.format(pro.product_discount)}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex items-center justify-center">
          <Button
            width="full"
            type="primary"
            icon={<HiOutlinePlusCircle stroke="#f0fdfa" size={20} />}
            onClick={() => handleAddProduct(idProductChoosen)}
          >
            Thêm
          </Button>
        </div>
      </div>
    </Modal>
  );
}
export default ModalSearchProduct;
