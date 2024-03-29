import { createSlice } from '@reduxjs/toolkit';

export const ProffesionalAuth = createSlice({
  name: 'Proffessional', // Change the name to 'proffessional'
  initialState: {
    Token:null,
    userName: null,
    email:null,
    image:null,
    proData:null,
    id : null
  },
  reducers: {
    ProfessionalLogin(state, action) {
      state.Token = action.payload.token;
    },
    ProfessionalLogout(state, action) {
      state.Token = '';
    },
    ProfessionalName(state, action) {
      state.userName = action.payload.userName;
    },
    ProfessionalEmail(state, action) {
      state.email = action.payload.email;
    },
    ProfessionalImage(state, action) {
      state.image = action.payload.image;
    },
    ProfessionalData(state,action){
      state.proData = action.payload.proData
  },
    ProfessionalID(state,action){
      state.id = action.payload.id
  }
  },
});

export const { ProfessionalLogin, ProfessionalLogout, ProfessionalName,ProfessionalEmail,ProfessionalImage,ProfessionalData } = ProffesionalAuth.actions;
export const proffesionalReducer = ProffesionalAuth.reducer; // Change the name to 'proffesionalReducer'
