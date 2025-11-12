package com.nzefler.task.service;

import com.nzefler.task.dto.NewTaskDTO;
import com.nzefler.task.dto.TaskRequestDTO;
import com.nzefler.task.dto.TaskResponseDTO;
import com.nzefler.task.entity.Task;
import com.nzefler.task.mapper.TaskMapper;
import com.nzefler.task.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
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
    public TaskResponseDTO saveTask(NewTaskDTO newTaskDTO) {
        try {
            Task newTask = mapper.toEntity(newTaskDTO);
            Task savedTask = taskRepository.save(newTask);
            return mapper.toDTO(savedTask);
        } catch (Exception e) {
            System.err.println("Error saving task: " + e.getMessage());
            return null;
        }
    }


    @Override
    public TaskResponseDTO updateTask(TaskRequestDTO taskRequestDTO) {
        Task existingTask = taskRepository.findById(taskRequestDTO.getTaskId()).orElseThrow(() -> new RuntimeException("Task does not exist"));
        existingTask.setName(taskRequestDTO.getName());
        existingTask.setDescription(taskRequestDTO.getDescription());
        existingTask.setStatus(taskRequestDTO.getStatus());
        existingTask.setDuration(taskRequestDTO.getDuration());
        existingTask.setDate(taskRequestDTO.getDate());
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
    public List<TaskResponseDTO> findAllPreviousTasks(Long userId) {
        List<Task> tasks = taskRepository.findByUserId(userId);
        if (tasks == null || tasks.isEmpty()) {
            return List.of();
        }
        LocalDate today = LocalDate.now();
        List<Task> previousTasks = tasks.stream().filter(task -> task.getDate() != null && task.getDate().isBefore(today)).collect(Collectors.toList());
        return previousTasks.stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<TaskResponseDTO> findAllUpcomingTasks(Long userId) {
        List<Task> tasks = taskRepository.findByUserId(userId);
        if (tasks == null || tasks.isEmpty()) {
            return List.of();
        }
        LocalDate today = LocalDate.now();
        List<Task> upcomingTasks = tasks.stream().filter(task -> task.getDate() != null && task.getDate().isAfter(today)).collect(Collectors.toList());
        return upcomingTasks.stream().map(mapper::toDTO).collect(Collectors.toList());
    }

    @Override
    public List<TaskResponseDTO> findAllCurrentTasks(Long userId) {
        List<Task> tasks = taskRepository.findByUserId(userId);
        if (tasks == null || tasks.isEmpty()) {
            return List.of();
        }
        LocalDate today = LocalDate.now();
        List<Task> currentTasks = tasks.stream().filter(task -> task.getDate() != null && task.getDate().isEqual(today)).collect(Collectors.toList());
        return currentTasks.stream().map(mapper::toDTO).collect(Collectors.toList());
    }
}
