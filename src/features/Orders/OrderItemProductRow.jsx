/* eslint-disable react/prop-types */
import DropDownMenu from "../../ui/DropDownMenu";
import { useState } from "react";
import { HiOutlinePlus, HiOutlineChevronDown } from "react-icons/hi2";
import ModalSearchProduct from "./ModalSearchProduct";
import { v4 as uuidV4 } from "uuid";

function OrderItemProductRow({ product, editMode, dispatch }) {
  const [searchProductMode, setSearchProductMode] = useState(false);

  return (
    <>
      {searchProductMode && (
        <ModalSearchProduct
          dispatch={dispatch}
          onCloseModal={() => setSearchProductMode(false)}
          orderProductID={product.id}
        />
      )}
      <div></div>
      <div className="grid grid-cols-[4.5rem,1fr,2.5rem] items-center gap-x-3">
        {!product.img ? (
          <div
            onClick={() => {
              if (editMode) setSearchProductMode(!searchProductMode);
            }}
            className="col-start-1 col-end-4 flex cursor-pointer items-center gap-2"
          >
            <p>Chọn sản phẩm</p>
            <HiOutlinePlus />
          </div>
        ) : (
          <>
            <img
              src={product.img}
              alt="anhsp"
              className="h-16 w-full cursor-pointer rounded-md"
              onClick={() => {
                if (editMode) setSearchProductMode(!searchProductMode);
              }}
            />
            <p>{product.name}</p>
            <p className="flex px-1">
              x
              <input
                type="text"
                value={product.quantity}
                onChange={(e) => console.log(e.target.value)}
                className="w-full"
              />
            </p>
          </>
        )}
      </div>

      <DropDownMenu
        key={uuidV4()}
        disabled={!editMode}
        type="selection"
        name={product.size || "Chọn Size"}
        listOptions={["Size XS", "Size S", "Size M", "Size L", "Size Riêng"]}
        icon={editMode && <HiOutlineChevronDown size={16} />}
        onClick={(e) =>
          dispatch({
            type: "changeSize",
            payload: { id: product.id, size: e },
          })
        }
      />

      <DropDownMenu
        key={uuidV4()}
        disabled={!editMode}
        type="selection"
        name={product.form !== "" ? product.form : "Chọn Form"}
        listOptions={["Nhọn", "Tròn Nhọn", "Vuông", "Thang"]}
        icon={editMode && <HiOutlineChevronDown size={16} />}
        onClick={(e) =>
          dispatch({
            type: "changeForm",
            payload: { id: product.id, form: e },
          })
        }
      />

      <input
        className={`col-start-5 col-end-7 w-full rounded-md border px-2 py-1 ${
          editMode && "border-gray-700"
        }`}
        value={product.note}
        onChange={(e) => {
          if (editMode) {
            dispatch({
              type: "changeNote",
              payload: { id: product.id, note: e.target.value },
            });
          }
        }}
        placeholder="Ghi chú"
        disabled={!editMode}
      />
      <div
        className="cursor-pointer"
        onClick={() => {
          dispatch({ type: "deleteProduct", payload: product.id });
        }}
      >
        {editMode ? "Xóa" : ""}
      </div>
    </>
  );
}

export default OrderItemProductRow;
