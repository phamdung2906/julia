/* eslint-disable react/prop-types */
import ButtonAction from "../../ui/ButtonAction";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";
import CreateProductForm from "./CreateProductForm";

import { HiOutlinePencil, HiOutlineTrash } from "react-icons/hi2";
import { FormatVND } from "../../utils/FormatVND";

import { useState } from "react";
import useDeleteProduct from "./useDeleteProduct";

function ProductRow({ product }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const { isDeleting, deleteProduct } = useDeleteProduct();
  const { id: productID, name, revenue, price, status, image } = product;

  return (
    <>
      {isDeleting && (
        <Modal>
          <Spinner />
        </Modal>
      )}
      {showEditForm && (
        <CreateProductForm
          setShowModal={setShowEditForm}
          editProduct={product}
        />
      )}
      <div className=" flex items-center justify-center">
        <img src={image} alt="anh san pham" className=" h-20 w-20 rounded-md" />
      </div>
      <div>{name}</div>
      <div>{FormatVND.format(price)}</div>
      <div>{FormatVND.format(revenue)}</div>
      <div className="text-base">{status}</div>
      <div className="flex justify-end text-base">
        <div className="p-1">
          <ButtonAction
            onClick={() => setShowEditForm(true)}
            icon={<HiOutlinePencil />}
            name="Edit"
          />
          <ButtonAction
            onClick={() => deleteProduct({ id: productID, image })}
            icon={<HiOutlineTrash />}
            name="Remove"
          />
        </div>
      </div>
      <div className="col-span-6 h-px bg-teal-100"></div>
    </>
  );
}

export default ProductRow;
