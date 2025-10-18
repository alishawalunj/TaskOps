package com.nzefler.task.service;

import com.nzefler.task.dto.TaskDTO;
import com.nzefler.task.entity.Task;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface TaskService {
    List<TaskDTO> findAllTasks();
    TaskDTO findTaskById(Long taskId);
    TaskDTO saveTask(Task task);
    TaskDTO updateTask(Task task);
    boolean deleteTask(Long taskId);
    List<TaskDTO> findAllPreviousTasks(Long userId);
    List<TaskDTO> findAllUpcomingTasks(Long userId);
    List<TaskDTO> findAllCurrentTasks(Long userId);
}
