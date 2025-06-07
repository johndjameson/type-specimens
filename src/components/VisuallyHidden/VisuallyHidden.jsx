function VisuallyHidden({ as: Tag, className, ...moreProps }) {
  return <Tag className={`ts-u-visually-hidden ${className}`} {...moreProps} />;
}

VisuallyHidden.defaultProps = {
  as: 'span',
  className: '',
};

export default VisuallyHidden;
