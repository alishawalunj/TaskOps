package com.nzefler.task.service;

import com.nzefler.task.dto.NewTaskDTO;
import com.nzefler.task.dto.TaskRequestDTO;
import com.nzefler.task.dto.TaskResponseDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TaskService {
    List<TaskResponseDTO> findAllTasks();
    TaskResponseDTO findTaskById(Long taskId);
    TaskResponseDTO saveTask(NewTaskDTO newTaskDTO);
    TaskResponseDTO updateTask(TaskRequestDTO taskRequestDTO);
    boolean deleteTask(Long taskId);
    List<TaskResponseDTO> findAllPreviousTasks(Long userId);
    List<TaskResponseDTO> findAllUpcomingTasks(Long userId);
    List<TaskResponseDTO> findAllCurrentTasks(Long userId);
}
