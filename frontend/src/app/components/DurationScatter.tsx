'use client';
import { Scatter } from 'react-chartjs-2';

export default function DurationScatter({
  data,
}: {
  data: { plannedDuration: number; actualCompletionDays: number }[];
}) {
  return (
    <div className="w-full flex-1 relative">
      <Scatter
        data={{
          datasets: [
            {
              label: 'Task Duration',
              data: data.map(d => ({
                x: d.plannedDuration,
                y: d.actualCompletionDays,
              })),
              backgroundColor: '#22c55e',
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: { display: true, text: 'Planned Duration (days)' },
            },
            y: {
              title: { display: true, text: 'Actual Completion Time (days)' },
            },
          },
        }}
      />
    </div>
  );
}
