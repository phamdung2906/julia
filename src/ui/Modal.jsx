/* eslint-disable react/prop-types */
function Modal({ children, onCloseModal }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-10">
      <div
        onClick={onCloseModal}
        className="absolute bottom-0 left-0 right-0 top-0 z-20 bg-gray-400 opacity-20"
      ></div>
      <div className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-10">
        {children}
      </div>
    </div>
  );
}

export default Modal;
