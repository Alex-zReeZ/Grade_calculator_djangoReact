import { useEffect, useState } from "react";
// @ts-ignore
import { getToken } from "../lib/context.ts";
import Chart from "react-apexcharts";

function PolarAreaChart() {
  const [averages, setAverages] = useState([]);
  const token = getToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/branches/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch branch average: ${response.statusText}`,
          );
        }

        const data = await response.json();
        const transformedData = data.map((branch) => ({
          name: branch.name,
          average: branch.average,
        }));
        setAverages(transformedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  const options = {
    series: averages.map((branch) => branch.average),
    chart: {
      type: "polarArea",
      height: 1600,
      width: 1600,
    },
    yaxis: {
      max: 6,
      tickAmout: 12,
    },
    labels: averages.map((branch) => branch.name),
    stroke: {
      colors: ["rgba(0,0,0,0)"],
    },
    fill: {
      opacity: 0.8,
    },
  };

  return (
    <div className="w-full">
      {averages.length > 0 ? (
        // @ts-ignore
        <Chart options={options} series={options.series} type="polarArea" />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PolarAreaChart;
