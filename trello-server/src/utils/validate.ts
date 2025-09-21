import { BadRequestError } from "@/core/ApiError";
import { ValidationError, validate } from "class-validator";

export async function validateInput<T extends object>(
  dto: T,
): Promise<void> {
  const errors: ValidationError[] = await validate(dto);

  if (errors.length > 0) {
    const messageError = errors
      .map((error) => {
        return error.constraints
          ? Object.values(error.constraints).join(', ')
          : '';
      })
      .join(', ')
    
    throw new BadRequestError(
      `Validation Failed: ${messageError}`
    );
  }
}