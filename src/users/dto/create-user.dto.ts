export class CreateUserDto {
  readonly email: string;

  readonly password: string;

  readonly firstName: string;

  readonly lastName: string;

  readonly nickname: string;

  readonly description: string;

  readonly imageSrc: string;
}
