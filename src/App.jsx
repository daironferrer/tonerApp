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
      fill="white"
      fontSize={17}
      fontFamily='Roboto'
      fontWeight={'semibold'}
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
  

  // Wrapped toner quantity in Number to force JS to treat it as a number and not a concatenation  
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
    
    <div class="bg-[#171717]">
      {loading ? (
        <p>Loading toner data...</p>
      ) : (
        <>
          <h1 class="text-3xl text-white font-[Roboto] text-center p-15">Toner Levels</h1>
          <div class="w-full flex justify-center items-center lg:pr-20">
            <BarChart class="mx-auto" width={1000} height={800} data={toners} margin={{ bottom: 300, top: 20}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" interval={0} angle={0} textAnchor="end" tick={<CustomXAxisTick />} />
            <YAxis width={100} allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="quantity" fill="gray"/>
            </BarChart>
          </div>

          <div>
            <h1 class="font-[Roboto] text-center m-10 text-4xl bg-[#171717] text-white">Edit Quantities</h1>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-1 bg-[#171717] text-white">
            {toners.map((toner) => (
              <div key={toner.id} class="font-bold font-[Roboto] m-3">
                <strong class="text-white">{toner.name}</strong>: {toner.quantity}{' '}
                <div>
                  <button class="bg-white text-black hover:bg-purple-900 rounded-md m-1 size-12 ring-2" onClick={() => handleAdjust(toner, 1)}>+1</button>
                  <button class="bg-white text-black hover:bg-purple-900 rounded-md m-1 size-12 ring-2" onClick={() => handleAdjust(toner, -1)}>-1</button>
                </div>             
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;



