package com.nzefler.task.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
public class ScatterPoint {
    private long taskId;
    private long plannedDuration;
    private long actualCompletionDays;

    public long getTaskId() {
        return taskId;
    }

    public void setTaskId(long taskId) {
        this.taskId = taskId;
    }

    public long getPlannedDuration() {
        return plannedDuration;
    }

    public void setPlannedDuration(long plannedDuration) {
        this.plannedDuration = plannedDuration;
    }

    public long getActualCompletionDays() {
        return actualCompletionDays;
    }

    public void setActualCompletionDays(long actualCompletionDays) {
        this.actualCompletionDays = actualCompletionDays;
    }
}
