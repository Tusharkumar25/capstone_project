function Input({
  label,
  type = "text",
  placeholder,
}) {
  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-gray-700 bg-gray-900 px-4 py-3 text-white outline-none transition-all duration-300 focus:border-indigo-500"
      />
    </div>
  );
}

export default Input;