// import { createSlice } from '@reduxjs/toolkit';
// import { UserModel } from '../../models/UserModel';

// const initialState: UserModel = {
//   id: -1,
//   username: '',
//   fullname: '',
//   email: '',
//   password: '',
//   createdTime: new Date(),
//   xp: 0,
//   status: false,
// };

// const userSlice = createSlice({
//   name: 'user',
//   initialState: {
//     data: initialState,
//   },
//   reducers: {
//     addUser: (state, action) => {
//       state.data = action.payload;
//     },
//   },
// });

// export const userReducer = userSlice.reducer;
// export const { addUser } = userSlice.actions;
// export const userSelector = (state: any) => state.userReducer?.data;
