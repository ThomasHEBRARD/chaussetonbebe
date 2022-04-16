const arrayReplace = (arr, newItem, predicate) => {
  const res = [...arr];
  const toReplaceIdx = res.findIndex(predicate);
  if (toReplaceIdx > -1) {
    res.splice(toReplaceIdx, 1, newItem);
  }

  return res;
};

export default arrayReplace;
