const useId = () => {
  let i = 0;
  return () => `${i++}`;
};

export default useId;
