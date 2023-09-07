import { HiOutlineReceiptRefund } from "react-icons/hi2";

import Heading from "../ui/Heading";
import HeaderWrapper from "../ui/HeaderWrapper";
import SearchForm from "../ui/SearchForm";
import Button from "../ui/Button";

import OrderItemRow from "../features/Orders/OrderItemRow";
import NavOrders from "../features/Orders/NavOrders";
import ListOrders from "../features/Orders/ListOrders";
import HeaderListOrders from "../features/Orders/HeaderListOrders";
// import AddingPart from "../components/OrderPage/AddingPart";
import { useOrders } from "../Contexts/OrdersProvider";
import { getOrders } from "../services/apiOrder";
import { useQuery } from "@tanstack/react-query";
const newOrder = {
  id: "",
  checked: false,
  order_products: [],
};

function OrdersPage() {
  const { orders, hasTick, loading, adding, dispatch } = useOrders();
  console.log("1");
  const { data, error } = useQuery({
    queryKey: ["order_products"],
    queryFn: getOrders,
  });
  return (
    <>
      <HeaderWrapper>
        <Heading>Orders</Heading>
        <div className="flex gap-4">
          <SearchForm placeholder="Nhập ID đơn hàng" />

          <Button
            type={`${hasTick ? "primary" : "secondary"}`}
            disableBtn={!hasTick}
            icon={
              <HiOutlineReceiptRefund
                size={24}
                stroke={`${hasTick ? "#f0fdfa" : "#1f2937"}`}
              />
            }
          >
            Phân phối
          </Button>
        </div>
      </HeaderWrapper>
      <NavOrders />
      {loading ? (
        <p>Loading .....</p>
      ) : (
        <section className="mb-10 rounded-md bg-white p-4">
          <HeaderListOrders />
          <ListOrders adding={adding}>
            {orders.map((order) => (
              <OrderItemRow
                key={order.id}
                order={order}
                dispatchAll={dispatch}
              />
            ))}
            {/* <AddingPart /> */}
            <div className="col-start-2">
              <Button
                type="secondary"
                onClick={() =>
                  dispatch({
                    type: "addOrder",
                    payload: {
                      order: {
                        ...newOrder,
                        editMode: true,
                        order_products: [
                          {
                            id: "",
                            img: "",
                            name: "",
                            quantity: 1,
                            size: "",
                            form: "",
                            note: "",
                            status: "Chưa phân phối",
                          },
                        ],
                      },
                    },
                  })
                }
              >
                Thêm đơn hàng +
              </Button>
            </div>
          </ListOrders>
        </section>
      )}
    </>
  );
}

export default OrdersPage;
