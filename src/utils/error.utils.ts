import { ZodError } from "zod";
import {
  AuthErrorResponse,
  InternalErrorResponse,
  MissingPostDataResponse,
} from "../types/global";
import { unwrapErrors } from "./fetch.utils";

export function handleErrorResponse<T>(
  resp:
    | AuthErrorResponse
    | MissingPostDataResponse
    | InternalErrorResponse
    | Record<string, any>
    | ZodError,
) {
  // Handle ZOD errors
  if (resp instanceof ZodError) {
    const error =
      resp.errors[0].message || `${resp.errors[0].path.join(".")} is invalid}`;
    return error;
    return;
  }

  if ("message" in resp) {
    if (typeof resp.message === "string") {
      return resp.message;
    } else if (resp.message.errorMessage) {
      return resp.message.errorMessage;
    }
    return;
  }
  if ("errorMessage" in resp && typeof resp.errorMessage === "string") {
    return resp.errorMessage;
  }
  if ("errorMessage" in resp && typeof resp.errorMessage === "object") {
    const error =
      unwrapErrors(resp.errorMessage)[0].description ||
      "Unknown Error Occurred: 1";
    return error;
  }
  return "Unknown Error Occurred: 2";
}

export function throwErrorResponse<T>(
  resp:
    | AuthErrorResponse
    | MissingPostDataResponse
    | InternalErrorResponse
    | Record<string, any>,
) {
  console.log("Throwing error response...");
  console.log(resp);
  if ("error" in resp && typeof resp.error === "object") {
    const error = unwrapErrors(resp.error)[0];
    console.log("Error", error);
    throw new Error(error.description || "Error", {
      cause: error.description || "",
    });
  }
  if ("message" in resp) {
    if (typeof resp.message === "string") {
      throw new Error(resp.message);
    } else if (resp.message.errorMessage) {
      throw new Error(resp.message.errorMessage);
    }
    return;
  }
  if ("errorMessage" in resp && typeof resp.errorMessage === "string") {
    throw new Error(resp.errorMessage);
  }
  throw new Error("Unknown Error Occurred: 2");
}

export function handleZodError<T>(zodError: ZodError) {
  const error =
    zodError.errors[0].message ||
    `${zodError.errors[0].path.join(".")} is invalid}`;

  return error;
}
