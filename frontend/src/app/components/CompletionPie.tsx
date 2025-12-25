'use client';
import { Pie } from 'react-chartjs-2';

type Props = {
  completed: number;
  pending: number;
};

export default function CompletionPie({ completed, pending }: Props) {
  const data = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: ['#22c55e', '#facc15'],
      },
    ],
  };


  return (
    <div className="w-full flex-1 relative">
      <Pie
        data={data}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' },
          },
        }}
      />
    </div>
  );
}