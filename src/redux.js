
const stateHistory = {
    past: [],
    futrue: [],
    present: undefined,
    hasRecord(type) {
      return this[type].length > 0;
    },
    hasPresent() {
      return this.present !== undefined;
    },
    setPresent(state) {
      this.present = state;
    },
    movePresentToPast() {
      this.past.push(this.present);
    },
    push(currentState) {
      if (this.hasPresent()) {
        this.past.push(this.present);
      }
      this.setPresent(currentState);
    },
    getIndex() {
      return this.past.length;
    },
    undo() {
      if (this.hasRecord('past')) {
        this.gotoState(this.getIndex() - 1);
      }
    },
    redo() {
      if (this.hasRecord('futrue')) {
        this.gotoState(this.getIndex() + 1);
      }
    },
    gotoState(i) {
      const index = i * 1;
      const allState = [...this.past, this.present, ...this.futrue];
      this.present = allState[index];
      this.past = allState.slice(0, index);
      this.futrue = allState.slice(index + 1, allState.length);
    }
};

const Undoreducer = reducer => (state = stateHistory.present, action) => {
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


const {
    createStore,
    combineReducers,
    bindActionCreators
} = Redux;

const todoList = [], couter = 0

const todoReducer = function (state = todoList, action) {
    switch (action.type) {
        case 'add':
            return [...state, action.todo]
        case 'delete':
            return state.filter(todo => todo.id !== action.id)
        default:
            return state
    }
},
couterReducer = function (state = couter, action) {
    switch (action.type) {
        case 'add':
            return ++state
        case 'decrease':
            return --state
        default:
            return state
    }
};


const reducer = Undoreducer(todoReducer)

let store = createStore(reducer)


function subscribe1Fn() {
    // 输出state
    console.log(store.getState().map(item => item.content))
}


store.subscribe(subscribe1Fn)

let actionCreaters = {
    add: function (todo) { //添加
        return {
            type: 'add',
            todo
        }
    }, delete: function (id) {
        return {
            type: 'delete',
            id
        }
    },
    UNDO: () => ({
        type: 'UNDO'
    }),
    REDO: () => ({
        type: 'REDO'
    })
}

let boundActions = bindActionCreators(actionCreaters, store.dispatch)

boundActions.add({
    id: 12,
    content: '睡觉觉'
})

boundActions.add({
    id: 13,
    content: '睡觉觉1'
})