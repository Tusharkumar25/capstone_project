import clsx from "clsx";

function Input({
  label,
  type = "text",
  placeholder,
  error,
  className = "",
  ...props
}) {
  return (
    <div className="w-full">
      <label className="mb-2 block text-sm font-medium text-gray-300">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        className={clsx(
          "w-full rounded-xl border bg-gray-900 px-4 py-3 text-white outline-none transition-all duration-300",
          error
            ? "border-red-500 focus:ring-2 focus:ring-red-500/20"
            : "border-gray-700 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20",
          className
        )}
        {...props}
      />

      {error && (
        <p className="mt-2 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

export default Input;