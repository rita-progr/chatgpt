// import {createAsyncThunk} from "@reduxjs/toolkit";
// import {IUser} from "@/entities/User";
// import {ThunkConfig} from "@/app/providers/StoreProvider";
//
//
// interface LoginByUserNameProps{
//     username:string;
//     password:string;
// }
//
// export const loginByUsername = createAsyncThunk<IUser,LoginByUserNameProps, ThunkConfig>(
//     'login/loginByUsername',
//     async (authData, {dispatch, extra, rejectWithValue}) => {
//         try{
//
//
//         }catch(err){
//             return rejectWithValue('Произошла ошибка, пожалуйста, повторите позже');
//         }
//     }
// )