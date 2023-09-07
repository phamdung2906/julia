function Input({ type, register }) {
  return (
    <input
      type={type}
      className="w-full rounded-md border-[2px] border-teal-100 px-2 py-1"
      {...register}
    />
  );
}

export default Input;
