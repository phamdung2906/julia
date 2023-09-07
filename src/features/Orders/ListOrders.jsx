/* eslint-disable react/prop-types */

export default function ListOrders({ children }) {
  return (
    <div>
      <div className="mb-4 grid grid-cols-[auto,3fr,1fr,1fr,2.5fr,1fr,1rem] items-center gap-x-4 gap-y-2">
        {children}
      </div>
    </div>
  );
}
