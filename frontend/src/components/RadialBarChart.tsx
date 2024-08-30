import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const RadialBarChart = () => {
  const calculateYearProgress = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    // @ts-ignore
    const diff = now - start;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    const yearProgress = (dayOfYear / 365) * 100;
    return yearProgress.toFixed(2);
  };

  const [progress, setProgress] = useState(calculateYearProgress());

  useEffect(() => {
    const interval = setInterval(
      () => {
        setProgress(calculateYearProgress());
      },
      24 * 60 * 60 * 1000,
    );

    return () => clearInterval(interval);
  }, []);

  const options = {
    chart: {
      type: "radialBar",
      offsetY: -20,
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          size: "70%",
        },
        dataLabels: {
          name: {
            fontSize: "16px",
            color: undefined,
            offsetY: 120,
          },
          value: {
            offsetY: 76,
            fontSize: "22px",
            color: undefined,
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },
    stroke: {
      dashArray: 4,
    },
    labels: ["Progression de l'année 2024"],
  };

  const series = [parseFloat(progress)];

  return (
    <div className="mt-10">
      {/* @ts-ignore */}
      <Chart options={options} series={series} type="radialBar" height={350} />
    </div>
  );
};

export default RadialBarChart;
