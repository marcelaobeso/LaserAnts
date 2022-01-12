import { applyMiddleware, combineReducers, createStore } from "redux";
import { createBrowserHistory } from 'history';
import { connectRouter, routerMiddleware } from 'connected-react-router'
import * as storage from "./store";
import apiMiddleware from "./api-redux";



const history = createBrowserHistory();


const preloadedState = {
    producto: {},
    productos: []
};

const middlewares = applyMiddleware(
    apiMiddleware,
    routerMiddleware(history),
    storage.loggerMiddleware,
    storage.agregarOModificarProductoMiddleware,
    //storage.generadorCodigoProductoBuilder(100),
    //storage.storageMiddleware,

);

const reducer = combineReducers({
    router: connectRouter(history),
    producto: storage.producto,
    productos: storage.productos
})

const store = createStore(reducer, preloadedState, middlewares);
export {history};
export default store;