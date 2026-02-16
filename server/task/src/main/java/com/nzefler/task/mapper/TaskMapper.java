package com.nzefler.task.mapper;

import com.nzefler.task.dto.NewTaskRequestDTO;
import com.nzefler.task.dto.TaskResponseDTO;
import com.nzefler.task.entity.Task;
import org.springframework.stereotype.Component;

import java.time.Instant;

@Component
public class TaskMapper {

    public TaskResponseDTO toDTO(Task task){
        if(task == null) return null;
        TaskResponseDTO dto = new TaskResponseDTO();
        dto.setTaskId(task.getTaskId());
        dto.setUserId(task.getUserId());
        dto.setName(task.getName());
        dto.setStatus(task.getStatus());
        dto.setDescription(task.getDescription());
        dto.setEndDate(task.getEndDate());
        return dto;
    }

    public Task toEntity(NewTaskRequestDTO newTaskRequestDTO){
        if(newTaskRequestDTO == null) return null;
        Task t = new Task();
        t.setUserId(newTaskRequestDTO.getUserId());
        t.setName(newTaskRequestDTO.getName());
        t.setStatus(newTaskRequestDTO.getStatus());
        t.setDescription(newTaskRequestDTO.getDescription());
        t.setEndDate(newTaskRequestDTO.getEndDate());
        t.setCreatedAt(Instant.now());
        t.setUpdatedAt(Instant.now());
        return t;
    }
}
