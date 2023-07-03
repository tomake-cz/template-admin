export const useCurrentPageInputs = () => {
  const id = useHyphenPath();
  const inputs = document.querySelectorAll('input');
  const filtered = [...inputs].filter((input) => input?.id.startsWith(id));
  const notes = document.querySelector('#notes') as HTMLTextAreaElement;
  return [...filtered, notes];
};

const compareWithStoredValue = (
  val: InputValue,
  input: ReturnType<typeof useCurrentPageInputs>[0],
) => {
  const { getStoredInputs } = useInputStore();
  return val !== getStoredInputs().get(useStripIdPrefix(input.id));
};

export const useCurrentPageChangedInputs = () => {
  const inputs = useCurrentPageInputs();

  if (!inputs) {
    return [];
  }

  const changedInputs = [...inputs].filter((input) => {
    if (input.type === 'checkbox' && 'checked' in input) {
      return compareWithStoredValue(input.checked, input);
    }
    return compareWithStoredValue(input.value, input);
  });

  return changedInputs;
};
