import isEmpty from "is-empty";

export default function yupToFormError(validationError) {
  if (isEmpty(validationError) || !validationError.inner) {
    return {};
  }

  // biome-ignore lint/style/useConst: <explanation>
  const errors = validationError.inner.reduce((accessor, error) => {
    accessor[error.path] = error.message;
    return accessor;
  }, {});
  return errors;
}
