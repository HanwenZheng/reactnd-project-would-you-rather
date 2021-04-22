export default (store) => (next) => (action) => {
  console.group(action.type);
  console.log("action:", action);
  const temp = next(action);
  console.log("new state:", store.getState());
  console.groupEnd();
  return temp;
};
