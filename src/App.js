import React, { useState } from 'react';
import "./App.css";
import { LineChart, Line, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

function App() {
  const [data, setData] = useState([]);
  const [mean, setMean] = useState(0);
  const [standardDeviation, setStandardDeviation] = useState(0);

  const calculateStatistics = (values) => {
    const sum = values.reduce((accumulator, value) => accumulator + value, 0);
    const mean = sum / values.length;

    const squaredDifferences = values.map((value) => Math.pow(value - mean, 2));
    const variance = squaredDifferences.reduce((accumulator, value) => accumulator + value, 0) / values.length;
    const standardDeviation = Math.sqrt(variance);

    return { mean, standardDeviation };
  };

  const handleInputChange = (event, inputIndex) => {
    const value = event.target.value;
    const newData = [...data];

    const inputValues = value.split(',').map((val) => Number(val.trim()));
    newData[inputIndex] = inputValues.slice(0, 25).map((val, index) => ({ name: `Sample ${inputIndex + 1}`, value: val }));

    setData(newData);

    const allValues = newData.flat().map((entry) => entry.value);
    const { mean, standardDeviation } = calculateStatistics(allValues);
    setMean(mean);
    setStandardDeviation(standardDeviation);
  };

  return (
    <div className='main'>
      <div className='title'>
        <h1>Sample Average</h1>
      </div>

      <div className='container'>

        <div className='dates'><input type="date"></input></div>

        <div className='inputs'>
          <div className='sample'>
            {[...Array(5)].map((_, index) => (
              <input key={index} type="text" onChange={(event) => handleInputChange(event, index)} placeholder={`#`} />
            ))}
          </div>
        </div>
      </div>
      <div className='table'>
        <table>
          <tr>
            <th>Mean</th>
            <th>Standard Deviation</th>
          </tr>
          <tr>
            <td>{mean}</td>
            <td>{standardDeviation}</td>
          </tr>
        </table>
      </div>

      <div className='App'>
        <LineChart
          width={500}
          height={200}
          data={data.flat()}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line connectNulls type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
        </LineChart>
      </div>
    </div>
  );
}

export default App;
