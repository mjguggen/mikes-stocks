import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'
import ExpoFileSystemStorage from "redux-persist-expo-filesystem"

// import createSecureStore from "redux-persist-expo-securestore";
// const storage = createSecureStore();

const persistConfig = {
  key: 'root',
  storage: ExpoFileSystemStorage,
  blacklist: ['init']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(
      persistedReducer,
      applyMiddleware(thunk)
    )
  let persistor = persistStore(store)
  
  return { store, persistor }
}