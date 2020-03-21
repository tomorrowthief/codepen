import stateHisotory from './stateHisotory'
export default reducer => (state = stateHistory.present, action) => {
  switch (action.type) {
    case 'UNDO':
      stateHistory.undo();
      break;
    case 'REDO':
      stateHistory.redo();
      break;
    case 'GOTO':
      stateHistory.gotoState(action.stateIndex);
      break;

    default:
      const newState = reducer(state, action); // 精髓的地方，函数式编程
      stateHistory.push(newState);
  }
  return stateHistory.present;
};