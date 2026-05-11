"use client";

import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface Props {
  labels: string[];
  scores: (number | null)[];
}

export default function SkillRadar({ labels, scores }: Props) {
  const data = {
    labels,
    datasets: [
      {
        label: "Năng lực hiện tại",
        data: scores.map((s) => s ?? 0),
        backgroundColor: "rgba(15,118,110,0.2)",
        borderColor: "#0F766E",
        borderWidth: 2.5,
        pointBackgroundColor: "#0F766E",
        pointRadius: 4,
      },
      {
        label: "Mục tiêu khoa",
        data: [85, 80, 80, 90, 80, 85],
        backgroundColor: "rgba(245,158,11,0.1)",
        borderColor: "#F59E0B",
        borderDash: [5, 5],
        borderWidth: 2,
        pointBackgroundColor: "#F59E0B",
        pointRadius: 0,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: { stepSize: 20 },
        pointLabels: { font: { size: 11 } },
      },
    },
    plugins: { legend: { position: "bottom" as const } },
  };
  return <Radar data={data} options={options} />;
}
