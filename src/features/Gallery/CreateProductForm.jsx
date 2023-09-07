/* eslint-disable react/prop-types */
import Label from "../../ui/Label";
import Input from "../../ui/Input";
import FileInput from "../../ui/FileInput";
import ErrorMessage from "../../ui/ErrorMessage";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import Spinner from "../../ui/Spinner";

import { useForm } from "react-hook-form";
import useCreateProduct from "./useCreateProduct";
import useUpdateProduct from "./useUpdateProduct";

function CreateProductForm({ setShowModal, editProduct = {} }) {
  const { id: editProductID, ...editValues } = editProduct;
  const isSessionEdit = Boolean(editProductID);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isSessionEdit ? editValues : {},
  });
  const { errors } = formState;
  const { isCreating, createProduct } = useCreateProduct({
    setShowModal,
    reset,
  });
  const { isUpdating, updateProduct } = useUpdateProduct({
    setShowModal,
    reset,
  });

  function onSubmit(data) {
    const image = typeof data.image === "string" ? data.image : data.image[0];

    if (isSessionEdit) {
      updateProduct({
        newProductData: { ...data, image },
        id: editProductID,
      });
    } else {
      createProduct({ ...data, image });
    }
  }
  const isWorking = isCreating || isUpdating;

  return (
    <Modal onCloseModal={() => setShowModal(false)}>
      {isWorking && (
        <Modal>
          <Spinner />
        </Modal>
      )}
      <form className=" max-w-5xl" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-[1fr,1.5fr,1.2fr] items-center gap-8 ">
          <Label name="Tên sản phẩm" />
          <div className="w-64">
            <Input
              type="text"
              register={{
                ...register("name", {
                  required: "Dòng này là bắt buộc",
                  minLength: {
                    value: 2,
                    message: "Tên sản phẩm tối thiểu 2 ký tự",
                  },
                }),
              }}
            />
          </div>
          <ErrorMessage>{errors?.name?.message}</ErrorMessage>
          <Label name="Giá sản phẩm" />
          <div className="w-64">
            <Input
              type="number"
              register={{
                ...register("price", {
                  required: "Dòng này là bắt buộc",
                  min: {
                    value: 1,
                    message: "Giá tiền phải lớn hơn 1",
                  },
                }),
              }}
            />
          </div>
          <ErrorMessage>{errors?.price?.message}</ErrorMessage>
          <Label name="Hoa hồng" />
          <div className="w-64">
            <Input
              type="number"
              register={{
                ...register("revenue", {
                  required: "Dòng này là bắt buộc",
                  min: { value: 0, message: "Hoa hồng là số dương < giá tiền" },
                  validate: (value) =>
                    value <= getValues().price ||
                    "Hoa hồng phải nhỏ hơn giá tiền",
                }),
              }}
            />
          </div>
          <ErrorMessage>{errors?.revenue?.message}</ErrorMessage>
          <div className="col-span-3 grid grid-cols-[1fr,1.5fr,1.2fr] gap-x-8 ">
            <Label name="Ảnh sản phẩm" />
            <FileInput
              register={{
                ...register("image", {
                  required: isSessionEdit ? false : "Dòng này là bắt buộc",
                }),
              }}
            />
            <ErrorMessage>{errors?.image?.message}</ErrorMessage>
          </div>
          <div className="col-span-2"></div>
          <div className="flex gap-2">
            <Button
              type="secondary"
              onClick={(e) => {
                e.preventDefault();
                setShowModal(false);
              }}
            >
              Hủy
            </Button>
            <Button type="primary" width="full">
              {isSessionEdit ? "Lưu" : "Tạo"}
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
}

export default CreateProductForm;
