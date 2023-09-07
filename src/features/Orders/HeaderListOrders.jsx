import { useOrders } from "../../Contexts/OrdersProvider";
function HeaderListOrders() {
  const { hasTick, dispatch } = useOrders();
  return (
    <div className="mb-6 grid grid-cols-[auto,3fr,1fr,1fr,2.5fr,1fr,1rem] gap-x-4 text-lg">
      <div>
        <input
          onChange={() => dispatch({ type: "tickAll" })}
          value={hasTick}
          type="checkbox"
        />
      </div>
      <div>ID Đơn hàng</div>
      <div>Size</div>
      <div>Form</div>
      <div className="pl-2">Ghi chú</div>
      <div>Trạng thái</div>
      <div></div>
    </div>
  );
}

export default HeaderListOrders;
