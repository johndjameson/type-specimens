function Hidden({ as: Tag, className, ...moreProps }) {
  return <Tag className={`ts-u-visually-hidden ${className}`} {...moreProps} />;
}

Hidden.defaultProps = {
  as: 'span',
  className: '',
};

export default Hidden;
