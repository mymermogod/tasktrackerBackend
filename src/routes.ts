import { Router } from "express";
import  TaskController  from "./controllers/TaskController";

const router = Router();

router.post("/task", TaskController.createTask);
router.get("/tasks", TaskController.findAllTasks);
router.get("/task/:id", TaskController.findTask);
router.put("/task/:id", TaskController.updateTask);
router.delete("/task/:id", TaskController.deleteTask);

export { router };