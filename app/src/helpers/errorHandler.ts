import { z } from "zod";

interface CustomError {
  message: string;
  status?: number;
}

export default function errorHandler(error: unknown) {
  let message = "An unexpected error occurred";
  let status = 500;

  if (error instanceof z.ZodError) {
    message = error.errors[0]?.message || "Validation error";
    status = 400;
  } else if (error instanceof Error) {
    message = error.message;
    status = (error as CustomError).status || 500;
  } else if (
    typeof error === "object" &&
    error !== null &&
    "message" in error
  ) {
    const customError = error as CustomError;
    message = customError.message || message;
    status = customError.status || status;
  }

  return Response.json({ message }, { status });
}
