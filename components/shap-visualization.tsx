import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const ShapValuesChart = ({ originalValues }: { originalValues: number[] }) => {
  const getFeatureName = (index: any) => {
    return `Feature ${index + 1}`;
  };

  // Transform the raw data into a format Recharts can use
  const data = originalValues.map((value, index) => ({
    feature: getFeatureName(index),
    value: value,
    fill: value >= 0 ? "#2196F3" : "#F44336", // Pre-compute the fill color
  }));

  return (
    <div className="w-full max-w-4xl p-4">
      <h2 className="text-xl font-bold mb-4">SHAP Values Distribution</h2>
      <BarChart
        width={600}
        height={400}
        data={data}
        margin={{ top: 20, right: 30, left: 30, bottom: 60 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="feature"
          angle={-45}
          textAnchor="end"
          interval={0}
          height={60}
        />
        <YAxis
          label={{ value: "SHAP Value", angle: -90, position: "insideLeft" }}
        />
        <Tooltip />
        <Bar
          dataKey="value"
          fill="#2196F3" // Default fill
          fillOpacity={0.8}
          stroke="#000000"
          strokeWidth={1}
        />
      </BarChart>

      {/* Display mapping for reference */}
      <div className="mt-6 p-4 bg-gray-50 rounded">
        <h3 className="text-lg font-semibold mb-2">SHAP Values:</h3>
        <div className="grid grid-cols-2 gap-4">
          {originalValues.map((value, index) => (
            <div key={index} className="flex justify-between">
              <span className="font-medium">{getFeatureName(index)}:</span>
              <span style={{ color: value >= 0 ? "#2196F3" : "#F44336" }}>
                {value.toFixed(4)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShapValuesChart;
