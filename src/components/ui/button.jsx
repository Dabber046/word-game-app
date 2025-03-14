export function Button({ children, onClick, variant = "primary", ...props }) {
  const styles =
    variant === "outline"
      ? "bg-white text-purple-600 border border-purple-500 hover:bg-purple-50"
      : "bg-purple-600 text-white hover:bg-purple-700";

  return (
    <button
      onClick={onClick}
      className={\`px-4 py-2 rounded-xl font-semibold transition \${styles}\`}
      {...props}
    >
      {children}
    </button>
  );
}
