import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'
import { store, persistor } from './redux/store';
import { Outlet } from 'react-router-dom';
export default function App () {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Outlet/>
      </PersistGate>
    </Provider>
  )
}
