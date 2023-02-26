import { AsyncThunk, PayloadAction, SerializedError } from "@reduxjs/toolkit";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

export type PendingAction = ReturnType<GenericAsyncThunk["pending"]>;

export type FulfilledAction = ReturnType<GenericAsyncThunk["fulfilled"]>;

export type RejectedAction = PayloadAction<
  unknown,
  string,
  {
    arg: void;
    requestId: string;
    requestStatus: "rejected";
    aborted: boolean;
    condition: boolean;
  } & (
    | {
        rejectedWithValue: true;
      }
    | ({
        rejectedWithValue: false;
      } & {})
  ),
  SerializedError
>;

export type AsyncThunkStatus = "pending" | "fulfilled" | "rejected";
