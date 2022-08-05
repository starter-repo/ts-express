import { IsDefined, IsString, MinLength } from 'class-validator'

export class SignupDto {
  @IsDefined()
  @IsString()
  @MinLength(4)
  readonly username?: string

  @IsDefined()
  @IsString()
  @MinLength(8)
  readonly password?: string
}
