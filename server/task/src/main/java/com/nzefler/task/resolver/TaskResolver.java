package com.nzefler.task.resolver;

import com.nzefler.task.dto.TaskDTO;
import com.nzefler.task.entity.Task;
import com.nzefler.task.service.TaskService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class TaskResolver {
    private final TaskService taskService;

    public TaskResolver(TaskService taskService) {
        this.taskService = taskService;
    }

    @QueryMapping
    public List<TaskDTO> getAllTasks(){
        return taskService.findAllTasks();
    }

    @QueryMapping
    public TaskDTO getTaskById(@Argument Long taskId){
        return taskService.findTaskById(taskId);
    }

    @MutationMapping
    public TaskDTO createTask(@Argument("task") Task task){
        return taskService.saveTask(task);
    }

    @MutationMapping
    public TaskDTO updateTask(@Argument("task") Task task){
        return taskService.updateTask(task);
    }

    @MutationMapping
    public boolean deleteTask(@Argument Long taskId){
        return taskService.deleteTask(taskId);
    }

    @QueryMapping
    public List<TaskDTO> getAllPreviousTasks(@Argument Long userId){
        return taskService.findAllPreviousTasks(userId);
    }

    @QueryMapping
    public List<TaskDTO> getAllUpcomingTasks(@Argument Long userId){
        return taskService.findAllUpcomingTasks(userId);
    }

    @QueryMapping
    public List<TaskDTO> getAllCurrentTasks(@Argument Long userId){
        return taskService.findAllCurrentTasks(userId);
    }
}
