import {authActions, AuthByUserNameSchema} from "@/features/AuthByUserName";
import {userActions} from "@/entities/User";
import {AppDispatch, StateSchema} from "@/app/providers/StoreProvider";

export const loginByUserName = () => (dispatch: AppDispatch , getState: ()=> StateSchema) => {
    const {username, password} = getState().login as AuthByUserNameSchema;

    if (!username || !password) {
        dispatch(authActions.setError("Заполните все поля"));
        return;
    }

    dispatch(userActions.setAuthData(username));
    dispatch(authActions.clearForm());

}