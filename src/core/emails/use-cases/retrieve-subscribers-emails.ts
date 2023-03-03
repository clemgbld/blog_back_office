import { createAsyncThunk } from "@reduxjs/toolkit"
import  { RootState } from '../../..'
import { Email } from "../entities/email"

type SubscriptionService = {
    getAllEmails:()=> Promise<Email[]>
}


export const retrieveSubscribersEmails = createAsyncThunk<
Email[],void,{
state:RootState,
extra:{services:{subscriptionService:SubscriptionService}}
}>("emails/retrieveSubscribersEmails",async(_,{extra:{
    services:{subscriptionService}
}})=>{
return subscriptionService.getAllEmails();
})
