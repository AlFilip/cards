import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { forgotReducer } from '../assets/Components/auth/forgot-password/forgot-reducer';
import { newPasswordReducer } from '../assets/Components/auth/creat-new-pass/new-password-reducer';
import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import auth from './authReducer';
import { registerReducer } from './register-reducer';



const rootReducer = combineReducers( {
	auth,
	registerReducer,
	forgotReducer,
	newPasswordReducer,
});

export type AppStoreType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppStoreType> = useSelector;

export const store = createStore( rootReducer, applyMiddleware( thunk ) );

//@ts-ignore
window.store = store;

// type AllActionsType = AuthReducerActionTypes
export type RootState = ReturnType<typeof rootReducer>

 export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>