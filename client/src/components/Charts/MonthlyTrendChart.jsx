import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const MonthlyTrendChart = ({ data, title, type = 'line', height = 400 }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold mb-4">{title}</h3>
        <div className="flex items-center justify-center" style={{ height }}>
          <p className="text-gray-500">No data available</p>
        </div>
      </div>
    );
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 shadow-lg rounded-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{label}</p>
          {payload.map((p, index) => (
            <p key={index} className="text-gray-600" style={{ color: p.color }}>
              {p.name}: ₹{p.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const ChartComponent = type === 'line' ? LineChart : BarChart;
  const DataComponent = type === 'line' ? Line : Bar;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={height}>
        <ChartComponent data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <DataComponent 
            type="monotone" 
            dataKey="income" 
            stroke="#10B981" 
            fill="#10B981" 
            name="Income"
            strokeWidth={2}
          />
          <DataComponent 
            type="monotone" 
            dataKey="expense" 
            stroke="#EF4444" 
            fill="#EF4444" 
            name="Expense"
            strokeWidth={2}
          />
        </ChartComponent>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyTrendChart;