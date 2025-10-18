package com.nzefler.task.mapper;

import com.nzefler.task.dto.TaskDTO;
import com.nzefler.task.entity.Task;
import org.springframework.stereotype.Component;

@Component
public class TaskMapper {

    public TaskDTO toDTO(Task task){
        if(task == null) return null;
        TaskDTO dto = new TaskDTO();
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

    public Task toEntity(TaskDTO dto){
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
}
