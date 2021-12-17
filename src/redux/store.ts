import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AnyAction, applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';

import { forgotReducer } from '../assets/Components/auth/forgot-password/forgot-reducer';
import { newPasswordReducer } from '../assets/Components/auth/creat-new-pass/new-password-reducer';
import auth from './authReducer';
import { registerReducer } from './register-reducer';
import { errorReducer } from './errorReducer';


const rootReducer = combineReducers( {
	auth,
	registerReducer,
	forgotReducer,
	newPasswordReducer,
	errorReducer,
} );

export type AppStoreType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppStoreType> = useSelector;

export const store = createStore( rootReducer, applyMiddleware( thunk ) );

//@ts-ignore
window.store = store;

// type AllActionsType = AuthReducerActionTypes
export type RootState = ReturnType<typeof rootReducer>

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>