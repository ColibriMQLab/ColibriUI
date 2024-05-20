const generateUniqID = (index: number) => {
  const rand = Math.pow(index + 1, 2) + 77;
  return `uniq-id-${Math.floor(rand)}`;
};

export default generateUniqID;
