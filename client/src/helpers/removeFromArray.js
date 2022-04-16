const removeFromArray = (arr, predicate) => {
  const res = [...arr];
  const toRemoveIdx = res.findIndex(predicate);
  if (toRemoveIdx > -1) {
    res.splice(toRemoveIdx, 1);
  }

  return res;
};

export default removeFromArray;
