import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import { supabase } from './supabaseClient';


const CustomXAxisTick = (props) => {
  const { x, y, payload } = props;
  const dy = 20;
  return (
    <text
      x={x}
      y={y + dy}
      textAnchor="end"
      fill="#666"
      transform={`rotate(-45, ${x}, ${y + dy})`}
    >
      {payload.value}
    </text>
  );
};

function App() {
  const [toners, setToners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch toners from Supabase
  useEffect(() => {
    const fetchToners = async () => {
      const { data, error } = await supabase
        .from('toners')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error('Error fetching toners:', error.message);
      } else {
        setToners(data);
      }
      setLoading(false);
    };

    fetchToners();
  }, []);

  const handleAdjust = async (toner, delta) => {
  

  // Wrapped toner quantity Number to force JS to treat it as a number and not a concatenation  
  const updatedQuantity = Math.max(0, Number(toner.quantity) + delta);

    const { error } = await supabase
      .from('toners')
      .update({ quantity: updatedQuantity })
      .eq('id', toner.id);

    if (error) {
      alert('Failed to update');
      console.error(error.message);
      return;
    }

    // Refresh toner list
    const { data } = await supabase
      .from('toners')
      .select('*')
      .order('id', { ascending: true });

    setToners(data);
  };

  return (
    
    <div>
      {loading ? (
        <p>Loading toner data...</p>
      ) : (
        <>
          <div>
            {toners.map((toner) => (
              <div key={toner.id} class="font-bold font-[Roboto] mt-4 grid grid-cols-5 gap-1 pointer-coarse:mt-6 pointer-coarse:grid-cols-3 pointer-coarse:gap-4">
                <strong>{toner.name}</strong>: {toner.quantity}{' '}
                <button class="rounded-lg px-5 py-1 bg-gray-950 text-white hover:bg-purple-500" onClick={() => handleAdjust(toner, 1)}>+1</button>
                <button class="rounded-lg px-5 py-1 bg-gray-950 text-white hover:bg-purple-500" onClick={() => handleAdjust(toner, -1)}>-1</button>
              </div>
            ))}
          </div>

          <h2 class="flex font-bold font-[Roboto] items-center">Inventory Chart</h2>
          <div class="md:flex display: flex text-center sm:text-left">
            <BarChart width={600} height={800} data={toners} margin={{bottom: 250}}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval={0} angle={0} textanchor='end' tick={<CustomXAxisTick/>}/>
              <YAxis width={100} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="quantity" fill="#200430"/>
            </BarChart>
          </div>
        </>
      )}
    </div>
  );
}

export default App;



