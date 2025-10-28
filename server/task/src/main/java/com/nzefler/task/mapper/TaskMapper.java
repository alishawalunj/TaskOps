package com.nzefler.task.mapper;

import com.nzefler.task.dto.NewTaskDTO;
import com.nzefler.task.dto.TaskRequestDTO;
import com.nzefler.task.dto.TaskResponseDTO;
import com.nzefler.task.entity.Task;
import org.springframework.stereotype.Component;

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
        dto.setDate(task.getDate());
        dto.setDuration(task.getDuration());
        dto.setCreatedAt(task.getCreatedAt());
        dto.setUpdatedAt(task.getUpdatedAt());
        return dto;
    }

    public Task toEntity(TaskRequestDTO dto){
        if(dto == null) return null;
        Task t = new Task();
        t.setTaskId(dto.getTaskId());
        t.setUserId(dto.getUserId());
        t.setName(dto.getName());
        t.setStatus(dto.getStatus());
        t.setDescription(dto.getDescription());
        t.setDate(dto.getDate());
        t.setDuration(dto.getDuration());
        t.setCreatedAt(dto.getCreatedAt());
        t.setUpdatedAt(dto.getUpdatedAt());
        return t;
    }

    public Task toEntity(NewTaskDTO newTaskDTO){
        if(newTaskDTO == null) return null;
        Task t = new Task();
       t.setUserId(newTaskDTO.getUserId());
        t.setName(newTaskDTO.getName());
        t.setStatus(newTaskDTO.getStatus());
        t.setDescription(newTaskDTO.getDescription());
        t.setDate(newTaskDTO.getDate());
        t.setDuration(newTaskDTO.getDuration());
        t.setCreatedAt(newTaskDTO.getCreatedAt());
        t.setUpdatedAt(newTaskDTO.getUpdatedAt());
        return t;
    }
}
