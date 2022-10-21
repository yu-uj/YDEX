import { createStore } from 'redux';
import rootReducer from '../redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage/session';

const persistConfig = {
    key: 'root',
    storage
};

const enhancedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore() {
    const store = createStore(enhancedReducer);
    const persistor = persistStore(store);
    return { store, persistor };
};