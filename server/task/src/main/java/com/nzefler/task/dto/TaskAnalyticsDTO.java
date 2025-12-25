package com.nzefler.task.dto;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
public class TaskAnalyticsDTO {
    private CompletionOverview completionOverview;
    private OnTimeStats onTimeStats;
    private List<ScatterPoint> scatterData;

    public CompletionOverview getCompletionOverview() {
        return completionOverview;
    }

    public void setCompletionOverview(CompletionOverview completionOverview) {
        this.completionOverview = completionOverview;
    }

    public OnTimeStats getOnTimeStats() {
        return onTimeStats;
    }

    public void setOnTimeStats(OnTimeStats onTimeStats) {
        this.onTimeStats = onTimeStats;
    }

    public List<ScatterPoint> getScatterData() {
        return scatterData;
    }

    public void setScatterData(List<ScatterPoint> scatterData) {
        this.scatterData = scatterData;
    }
}
