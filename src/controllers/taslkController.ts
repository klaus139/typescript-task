// src/controllers/taskController.ts
import { Request, Response } from 'express';
import Task from '../models/task';
import { JwtPayload } from 'jsonwebtoken';
// Create Task
export const createTask = async (req: JwtPayload, res: Response) => {
  const { title, description, dueDate, status } = req.body;

  if(!title || !description || !dueDate || !status){
    return res.status(400).json({
        message:"please fill all fields"
    })
  }

  try {
    const task = await Task.create({
      title,
      description,
      dueDate,
      status,
      userId: req.user.id as any,
    });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get User's Tasks
export const getUserTasks = async (req: JwtPayload, res: Response) => {
  try {
    const tasks = await Task.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin can Get All Tasks
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
