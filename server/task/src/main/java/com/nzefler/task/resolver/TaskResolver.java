package com.nzefler.task.resolver;

import com.nzefler.task.dto.NewTaskRequestDTO;
import com.nzefler.task.dto.TaskAnalyticsDTO;
import com.nzefler.task.dto.UpdateTaskRequestDTO;
import com.nzefler.task.dto.TaskResponseDTO;
import com.nzefler.task.service.TaskService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

import java.util.List;

@Controller
public class TaskResolver {
    private final TaskService taskService;

    public TaskResolver(TaskService taskService) {
        this.taskService = taskService;
    }

    @PreAuthorize("isAuthenticated()")
    @QueryMapping
    public List<TaskResponseDTO> getAllTasks(){
        return taskService.findAllTasks();
    }

    @PreAuthorize("isAuthenticated()")
    @QueryMapping
    public TaskResponseDTO getTaskById(@Argument Long taskId){
        return taskService.findTaskById(taskId);
    }

    @PreAuthorize("isAuthenticated()")
    @MutationMapping
    public TaskResponseDTO createTask(@Argument("task") NewTaskRequestDTO newTaskRequestDTO) {
        try {
            TaskResponseDTO savedTask = taskService.saveTask(newTaskRequestDTO);
            return savedTask;
        } catch (Exception e) {
            throw new RuntimeException("Failed to create task", e);
        }
    }

    @PreAuthorize("isAuthenticated()")
    @MutationMapping
    public TaskResponseDTO updateTask(@Argument("task") UpdateTaskRequestDTO updateTaskRequestDTO){
        return taskService.updateTask(updateTaskRequestDTO);
    }

    @PreAuthorize("isAuthenticated()")
    @MutationMapping
    public boolean deleteTask(@Argument Long taskId){
        return taskService.deleteTask(taskId);
    }

    @PreAuthorize("isAuthenticated()")
    @QueryMapping
    public List<TaskResponseDTO> getAllPreviousTasks(@Argument Long userId){
        return taskService.findAllPreviousTasks(userId);
    }

    @PreAuthorize("isAuthenticated()")
    @QueryMapping
    public List<TaskResponseDTO> getAllUpcomingTasks(@Argument Long userId){
        return taskService.findAllUpcomingTasks(userId);
    }

    @PreAuthorize("isAuthenticated()")
    @QueryMapping
    public List<TaskResponseDTO> getAllCurrentTasks(@Argument Long userId){
        return taskService.findAllCurrentTasks(userId);
    }

    @PreAuthorize("isAuthenticated()")
    @QueryMapping
    public TaskAnalyticsDTO getTaskAnalytics(@Argument Long userId){
        return taskService.getTaskAnalytics(userId);
    }
}
