import React from "react";

interface VisuallyHiddenProps {
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
}

function VisuallyHidden({
  as: Tag = "span",
  className = "",
  ...moreProps
}: VisuallyHiddenProps) {
  return <Tag className={`ts-u-visually-hidden ${className}`} {...moreProps} />;
}

export default VisuallyHidden;
