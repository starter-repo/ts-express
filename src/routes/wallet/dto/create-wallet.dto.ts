import { IsDefined, IsString, MinLength } from 'class-validator'

export class CreateWalletDto {
  @IsDefined()
  @IsString()
  @MinLength(4)
  readonly walletName?: string
}
