package com.nzefler.task.service;

import com.nzefler.task.dto.NewTaskRequestDTO;
import com.nzefler.task.dto.TaskAnalyticsDTO;
import com.nzefler.task.dto.UpdateTaskRequestDTO;
import com.nzefler.task.dto.TaskResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TaskService {
    List<TaskResponseDTO> findAllTasks();
    TaskResponseDTO findTaskById(Long taskId);
    TaskResponseDTO saveTask(NewTaskRequestDTO newTaskRequestDTO);
    TaskResponseDTO updateTask(UpdateTaskRequestDTO updateTaskRequestDTO);
    boolean deleteTask(Long taskId);
    List<TaskResponseDTO> findAllPreviousTasks(Long userId);
    List<TaskResponseDTO> findAllUpcomingTasks(Long userId);
    List<TaskResponseDTO> findAllCurrentTasks(Long userId);
    TaskAnalyticsDTO getTaskAnalytics(Long userId);
}
