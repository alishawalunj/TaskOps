package com.nzefler.task.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class OnTimeStats {
    private long onTime;
    private long overdue;

    public long getOnTime() {
        return onTime;
    }

    public void setOnTime(long onTime) {
        this.onTime = onTime;
    }

    public long getOverdue() {
        return overdue;
    }

    public void setOverdue(long overdue) {
        this.overdue = overdue;
    }
}
