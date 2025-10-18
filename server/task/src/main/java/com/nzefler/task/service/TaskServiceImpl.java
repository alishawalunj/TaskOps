package com.nzefler.task.service;

import com.nzefler.task.dto.TaskDTO;
import com.nzefler.task.entity.Task;
import com.nzefler.task.mapper.TaskMapper;
import com.nzefler.task.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Objects;
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
    public List<TaskDTO> findAllTasks() {
        return taskRepository.findAll().stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public TaskDTO findTaskById(Long taskId) {
        return taskRepository.findById(taskId).map(mapper::toDTO).orElse(null);
    }

    @Override
    public TaskDTO saveTask(Task task) {
        return mapper.toDTO(taskRepository.save(task));
    }

    @Override
    public TaskDTO updateTask(Task task) {
        Task existingTask = taskRepository.findById(task.getTaskId()).orElseThrow(() -> new RuntimeException("Task does not exist"));
        existingTask.setName(task.getName());
        existingTask.setDescription(task.getDescription());
        existingTask.setStatus(task.getStatus());
        existingTask.setDuration(task.getDuration());
        existingTask.setDate(task.getDate());
        existingTask.setUpdatedAt(LocalDate.now());
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
    public List<TaskDTO> findAllPreviousTasks(Long userId) {
        List<Task> tasks = taskRepository.findByUserId(userId);
        if (tasks == null || tasks.isEmpty()) {
            return List.of();
        }
        LocalDate today = LocalDate.now();
        List<Task> previousTasks = tasks.stream().filter(task -> task.getDate() != null && task.getDate().isBefore(today)).collect(Collectors.toList());
        return previousTasks.stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<TaskDTO> findAllUpcomingTasks(Long userId) {
        List<Task> tasks = taskRepository.findByUserId(userId);
        if (tasks == null || tasks.isEmpty()) {
            return List.of();
        }
        LocalDate today = LocalDate.now();
        List<Task> upcomingTasks = tasks.stream().filter(task -> task.getDate() != null && task.getDate().isAfter(today)).collect(Collectors.toList());
        return upcomingTasks.stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<TaskDTO> findAllCurrentTasks(Long userId) {
        List<Task> tasks = taskRepository.findByUserId(userId);
        if (tasks == null || tasks.isEmpty()) {
            return List.of();
        }
        LocalDate today = LocalDate.now();
        List<Task> currentTasks = tasks.stream().filter(task -> task.getDate() != null && task.getDate().isEqual(today)).collect(Collectors.toList());
        return currentTasks.stream().map(mapper::toDTO).collect(Collectors.toList());
    }
}
