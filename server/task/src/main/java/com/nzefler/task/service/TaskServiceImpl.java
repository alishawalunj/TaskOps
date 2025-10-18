package com.nzefler.task.service;

import com.nzefler.task.dto.TaskDTO;
import com.nzefler.task.entity.Task;

import java.util.List;

public class TaskServiceImpl implements TaskService{
    @Override
    public List<TaskDTO> findAllTasks() {
        return List.of();
    }

    @Override
    public TaskDTO findTaskById(Long taskId) {
        return null;
    }

    @Override
    public TaskDTO saveTask(Task task) {
        return null;
    }

    @Override
    public TaskDTO updateTask(Task task) {
        return null;
    }

    @Override
    public boolean deleteTask(Long taskId) {
        return false;
    }

    @Override
    public List<TaskDTO> findAllPreviousTasks(Long userId) {
        return List.of();
    }

    @Override
    public List<TaskDTO> findAllUpcomingTasks(Long userId) {
        return List.of();
    }

    @Override
    public List<TaskDTO> findAllCurrentTasks(Long userId) {
        return List.of();
    }
}
