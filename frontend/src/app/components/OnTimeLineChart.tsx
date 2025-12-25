'use client';
import { Line } from 'react-chartjs-2';

export default function OnTimeLineChart({
  onTime,
  overdue,
}: {
  onTime: number;
  overdue: number;
}) {
  return (
    <div className="w-full flex-1 relative">
      <Line
        data={{
          labels: ['On-Time', 'Overdue'],
          datasets: [
            {
              label: 'Tasks',
              data: [onTime, overdue],
              borderColor: '#22c55e',
              backgroundColor: '#22c55e',
              tension: 0.4,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
}
