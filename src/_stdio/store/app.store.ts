import createStore from 'redux-zero';
import { connect } from 'redux-zero/devtools';
import { applyMiddleware } from 'redux-zero/middleware';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface StoreModel {}

const initialState = {};

let middlewares: any = [];
if (process.env.NODE_ENV === 'development') {
  middlewares = connect ? applyMiddleware(connect(initialState)) : [];
}
const store = createStore<StoreModel>(initialState as any, middlewares);

export default store;
