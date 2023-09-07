/* eslint-disable react/prop-types */
import DropDownMenu from "../../ui/DropDownMenu";
import Button from "../../ui/Button";
import OrderItemProductRow from "./OrderItemProductRow";
import {
  HiOutlineEllipsisVertical,
  HiOutlineChevronDown,
  HiOutlinePlusCircle,
} from "react-icons/hi2";

import { useReducer } from "react";

import { v4 as uuidV4 } from "uuid";

const newProduct = {
  id: "",
  img: "",
  name: "",
  quantity: 1,
  size: "",
  form: "",
  note: "",
  status: "Chưa phân phối",
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "setEditMode":
      return { ...state, editMode: !state.editMode };
    case "cancelEdit":
      return { ...payload };
    case "setID":
      return { ...state, id: payload };
    case "changImage":
      return {
        ...state,
        order_products: state.order_products.map((pro) =>
          pro.id === payload.id
            ? { ...pro, img: payload.img, name: payload.name }
            : pro,
        ),
      };
    case "changeSize":
      return {
        ...state,
        order_products: state.order_products.map((pro) =>
          pro.id === payload.id ? { ...pro, size: payload.size } : pro,
        ),
      };
    case "changeForm":
      return {
        ...state,
        order_products: state.order_products.map((pro) =>
          pro.id === payload.id ? { ...pro, form: payload.form } : pro,
        ),
      };
    case "changeNote":
      return {
        ...state,
        order_products: state.order_products.map((pro) =>
          pro.id === payload.id ? { ...pro, note: payload.note } : pro,
        ),
      };
    case "deleteProduct":
      return {
        ...state,
        order_products: state.order_products.filter(
          (pro) => pro.id !== payload,
        ),
      };
    case "addNewProduct":
      return {
        ...state,
        order_products: [
          ...state.order_products,
          { ...newProduct, id: payload.id },
        ],
      };
    default:
      throw new Error("Unknow action");
  }
}

function OrderItemRow({ order, dispatchAll }) {
  const [state, dispatch] = useReducer(reducer, {
    ...order,
  });

  function handleAction(e) {
    if (e === "Chỉnh sửa") dispatch({ type: "setEditMode" });
  }
  console.log(state.order_products.length);
  function handleSaveAction() {
    if (state.id === "") return alert("Vui lòng nhập ID");
    const hasError = state.order_products.reduce((error, cur) => {
      if (cur.img === "") return (error = true);
      if (cur.name === "") return (error = true);
      if (cur.size === "") return (error = true);
      if (cur.form === "") return (error = true);
      return error;
    }, false);
    if (hasError) return alert("Vui lòng nhập đủ thông tin sản phẩm");
    dispatchAll({ type: "saveEdit", payload: state });
    dispatch({ type: "setEditMode" });
  }

  return (
    <>
      <div>
        <input
          checked={state.checked}
          onChange={() => dispatch({ type: "setTick", payload: state.id })}
          type="checkbox"
        />
      </div>
      <p className="col-start-2 col-end-6">
        <input
          type="text"
          disabled={!state.editMode}
          className={
            state.editMode
              ? "rounded-md border border-gray-600 px-2 py-1"
              : "bg-inherit"
          }
          placeholder={"Nhập ID đơn hàng"}
          value={state.id}
          onChange={(e) => dispatch({ type: "setID", payload: e.target.value })}
        />
      </p>
      <DropDownMenu
        disabled={!state.editMode}
        type="selection"
        name="Chưa phân phối"
        listOptions={["Chưa phân phối", "Đã phân phối", "Đã hoàn thành"]}
        icon={state.editMode && <HiOutlineChevronDown size={20} />}
        onClick={(e) =>
          dispatch({
            type: "addNewOrderStatus",
            payload: e,
          })
        }
      />
      <div className="cursor-pointer">
        <DropDownMenu
          listOptions={["Phân phối", "Chỉnh sửa", "Xóa"]}
          icon={<HiOutlineEllipsisVertical size={20} />}
          onClick={handleAction}
        />
      </div>

      {state.order_products.map((product) => (
        <OrderItemProductRow
          product={product}
          key={product.id}
          editMode={state.editMode}
          dispatch={dispatch}
        />
      ))}

      {state.editMode && (
        <>
          <div></div>
          <div className="col-start-2 col-end-3 flex py-2">
            <span className="cursor-pointer">
              <HiOutlinePlusCircle
                size={30}
                onClick={() =>
                  dispatch({ type: "addNewProduct", payload: { id: uuidV4() } })
                }
              />
            </span>
          </div>
          <div className="col-end-8"></div>
        </>
      )}

      {state.editMode && (
        <>
          <div></div>
          <div className="col-start-2 col-end-8">
            <Button type="primary" onClick={handleSaveAction}>
              Save
            </Button>
            <Button
              onClick={() =>
                dispatch({
                  type: "cancelEdit",
                  payload: { ...order, editMode: false },
                })
              }
            >
              Cancel
            </Button>
          </div>
        </>
      )}

      <div className="col-start-1 col-end-8 h-2"></div>
    </>
  );
}

export default OrderItemRow;
