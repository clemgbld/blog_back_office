import { createAsyncThunk, createAction } from "@reduxjs/toolkit"
import  { RootState } from '../../..'
import { Email } from "../entities/email"


export const retrieveSubscribersEmails = createAction<Email[]>("emails/retrieveSubscribersEmails")
