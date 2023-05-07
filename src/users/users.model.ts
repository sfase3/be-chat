import { Column, DataType, Model, Table } from 'sequelize-typescript';

export interface UserCreationAttrs {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  nickname: string;
  description: string;
  imageSrc: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  nickname: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  imageSrc: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  description: string;
}
