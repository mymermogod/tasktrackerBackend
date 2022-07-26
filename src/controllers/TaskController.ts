import { Request, Response } from 'express';
import { prismaClient } from '../database/prismaClient';

export default {
  async createTask(request: Request, response: Response) {
    try {
      const { title, status } = request.body;

      const task = await prismaClient.task.create({
        data: {
          title,
          status,
        },
      });
      return response.json(task);
    } catch (error) {
      return response.json({ error });
    }
  },

  async findAllTasks(request: Request, response: Response) {
    try {
      const users = await prismaClient.task.findMany();
      return response.json(users);
    } catch (error) {
      return response.json({ error });
    }
  },

  async findTask(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const task = await prismaClient.task.findUnique({ where: { id } });

      if (!task)
        return response.json({ error: "Não possivel encotrar esse usuario" });
      return response.json(task);
    } catch (error) {
      return response.json({ error });
    }
  },

  async updateTask(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const { title, status } = request.body;

      let task = await prismaClient.task.findUnique({ where: { id: String(id) } });

      if (!task)
        return response.json({ error: "Não possivel encotrar esse usuario" });

      task = await prismaClient.task.update({
        where: { id },
        data: { title, status },
      });
      return response.json(task);
    } catch (error) {
      response.json({ error });
    }
  },

  async deleteTask(request: Request, response: Response) {
    try {
      const { id } = request.params;

      const task = await prismaClient.task.findUnique({ where: { id: String(id) } });

      if (!task)
        return response.json({ error: "Não possivel encotrar esse usuario" });

      await prismaClient.task.delete({ where: { id } });
      return response.json({message: "Usuario deletado"});
    } catch (error) {
      return response.json({ error });
    }
  },
};

