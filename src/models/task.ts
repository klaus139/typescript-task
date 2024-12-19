// src/models/Task.ts
import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class Task extends Model {
  public id!: number;
  public title!: string;
  public description!: string | null;
  public dueDate!: Date | null;
  public status!: 'pending' | 'in-progress' | 'completed';
  public userId!: number; // Foreign key to User
}

Task.init(
  {
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'in-progress', 'completed'),
      defaultValue: 'pending',
    },
  },
  {
    sequelize,
    tableName: 'tasks',
  }
);

export default Task;
