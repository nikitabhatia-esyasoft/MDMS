interface LoaderProps {
  size?: "sm" | "md" | "lg";
  message?: string;
  fullPage?: boolean;
}

function Loader({
  size = "md",
  message = "Loading...",
  fullPage = false,
}: LoaderProps) {
  return (
    <div
      className={`loader-container ${fullPage ? "loader-full-page" : ""}`}
      role="status"
    >
      <div className={`loader-spinner loader-${size}`} aria-hidden="true" />

      <span>{message}</span>
    </div>
  );
}

export default Loader;
