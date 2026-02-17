package com.nzefler.task.service;

import com.nzefler.task.dto.*;
import com.nzefler.task.entity.Task;
import com.nzefler.task.mapper.TaskMapper;
import com.nzefler.task.repository.TaskRepository;
import org.springframework.stereotype.Service;
import java.time.Instant;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService{

    private final TaskRepository taskRepository;
    private final TaskMapper mapper;

    public TaskServiceImpl(TaskRepository taskRepository, TaskMapper mapper) {
        this.taskRepository = taskRepository;
        this.mapper = mapper;
    }

    @Override
    public List<TaskResponseDTO> findAllTasks() {
        return taskRepository.findAll().stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public TaskResponseDTO findTaskById(Long taskId) {
        return taskRepository.findById(taskId).map(mapper::toDTO).orElse(null);
    }

    @Override
    public TaskResponseDTO saveTask(NewTaskRequestDTO newTaskRequestDTO) {
        try {
            Task newTask = mapper.toEntity(newTaskRequestDTO);
            Task savedTask = taskRepository.save(newTask);
            return mapper.toDTO(savedTask);
        } catch (Exception e) {
            System.err.println("Error saving task: " + e.getMessage());
            return null;
        }
    }

    @Override
    public TaskResponseDTO updateTask(UpdateTaskRequestDTO updateTaskRequestDTO) {
        Task existingTask = taskRepository.findById(updateTaskRequestDTO.getTaskId()).orElseThrow(() -> new RuntimeException("Task does not exist"));
        existingTask.setStatus(updateTaskRequestDTO.getStatus());
        existingTask.setUpdatedAt(Instant.now());
        Task updatedTask = taskRepository.save(existingTask);
        return mapper.toDTO(updatedTask);
    }

    @Override
    public boolean deleteTask(Long taskId) {
        if (taskRepository.existsById(taskId)) {
            taskRepository.deleteById(taskId);
            return true;
        }
        return false;
    }

    @Override
    public List<TaskResponseDTO> findAllPreviousTasks(Long userId) {
        List<Task> tasks = taskRepository.findByUserId(userId);
        if (tasks == null || tasks.isEmpty()) {
            return List.of();
        }
        LocalDate today = LocalDate.now();
        List<Task> previousTasks = tasks.stream().filter(task -> task.getEndDate() != null && task.getEndDate().isBefore(today)).collect(Collectors.toList());
        return previousTasks.stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<TaskResponseDTO> findAllUpcomingTasks(Long userId) {
        List<Task> tasks = taskRepository.findByUserId(userId);
        if (tasks == null || tasks.isEmpty()) {
            return List.of();
        }
        LocalDate today = LocalDate.now();
        List<Task> upcomingTasks = tasks.stream().filter(task -> task.getEndDate() != null && task.getEndDate().isAfter(today)).collect(Collectors.toList());
        return upcomingTasks.stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<TaskResponseDTO> findAllCurrentTasks(Long userId) {
        List<Task> tasks = taskRepository.findByUserId(userId);
        if (tasks == null || tasks.isEmpty()) {
            return List.of();
        }
        LocalDate today = LocalDate.now();
        List<Task> currentTasks = tasks.stream().filter(task -> task.getEndDate() != null && task.getEndDate().isEqual(today)).collect(Collectors.toList());
        return currentTasks.stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public TaskAnalyticsDTO getTaskAnalytics(Long userId) {
        try{
            List<Task> usersTaskList = taskRepository.findByUserId(userId);
            if(usersTaskList == null || usersTaskList.isEmpty()){
                return new TaskAnalyticsDTO();
            }

            long completedCount = 0;
            long pendingCount = 0;
            long onTimeCount = 0;
            long overDueCount = 0;

            List<ScatterPoint> scatterPoints = new ArrayList<>();
            LocalDate today = LocalDate.now();

            for(Task task: usersTaskList){
                String status = task.getStatus();
                LocalDate dueDate = task.getEndDate();

                Instant createdInstant = task.getCreatedAt();
                Instant updatedInstant = task.getUpdatedAt();

                LocalDate createdDate = createdInstant != null ? createdInstant.atZone(java.time.ZoneId.systemDefault()).toLocalDate() : null;
                LocalDate updatedDate = updatedInstant != null ? updatedInstant.atZone(java.time.ZoneId.systemDefault()).toLocalDate() : null;

                if("COMPLETED".equalsIgnoreCase(status)){
                    completedCount++;

                    if(dueDate != null && updatedDate != null){
                        if(!updatedDate.isAfter(dueDate)){
                            onTimeCount++;
                        }else{
                            overDueCount++;
                        }
                    }

                    if(createdDate != null && updatedDate != null){
                        long actualDays = ChronoUnit.DAYS.between(createdDate, updatedDate);
                        ScatterPoint point = new ScatterPoint();
                        point.setTaskId(task.getTaskId());
                        point.setActualCompletionDays(actualDays);
                        scatterPoints.add(point);
                    }
                }else{
                    pendingCount++;
                    if(dueDate != null && today.isAfter(dueDate)){
                        overDueCount++;
                    }
                }
            }
            CompletionOverview completionOverview = new CompletionOverview();
            completionOverview.setCompleted(completedCount);
            completionOverview.setPending(pendingCount);

            OnTimeStats onTimeStats = new OnTimeStats();
            onTimeStats.setOnTime(onTimeCount);
            onTimeStats.setOverdue(overDueCount);

            TaskAnalyticsDTO analyticsDTO = new TaskAnalyticsDTO();
            analyticsDTO.setCompletionOverview(completionOverview);
            analyticsDTO.setOnTimeStats(onTimeStats);
            analyticsDTO.setScatterData(scatterPoints);
            return analyticsDTO;
        }catch (Exception e){
            throw new RuntimeException("Failed to calculate task analytics for userId: " + userId, e);
        }
    }
}
