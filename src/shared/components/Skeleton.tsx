interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  rounded?: boolean;
  count?: number;
}

function Skeleton({
  width = "100%",
  height = 20,
  rounded = false,
  count = 1,
}: SkeletonProps) {
  return (
    <div className="skeleton-group" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className={`skeleton ${rounded ? "skeleton-rounded" : ""}`}
          style={{
            width,
            height,
          }}
        />
      ))}
    </div>
  );
}

export default Skeleton;
