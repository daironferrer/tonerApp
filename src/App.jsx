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
      fontSize={18}
      fontFamily='Roboto'
      fontWeight={'semibold'}
      transform={`rotate(-50, ${x}, ${y + dy})`}
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
          <h1 class="text-4xl text-white font-[Roboto] text-center pt-10 lg:pt-50">Toner Levels</h1>
          <div class="flex justify-center m-5">
            <BarChart width={1250} height={800} data={toners} margin={{ bottom: 250, top: 20, left: 20, right: 20}}>   
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" interval={0} angle={0} textAnchor="end" tick={<CustomXAxisTick />} />
            <YAxis width={100} allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="quantity" fill="gray"/>
            </BarChart>
          </div>

          <div>
            <h1 class="font-[Roboto] text-center m-10 text-4xl bg-[#171717] text-white lg:pt-25">Edit Quantities</h1>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-1 bg-[#171717] text-white">
            {toners.map((toner) => (
              <div class="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl m-5 bg-[#1d1b1b] p-6 shadow-lg outline outline-black/5">
                <div key={toner.id} class="font-bold font-[Roboto] m-3">
                <strong>{toner.name}</strong>: {toner.quantity}{' '}
                  <button class="bg-[#171717] text-white hover:bg-purple-900 rounded-md m-1 size-12 shadow-lg" onClick={() => handleAdjust(toner, 1)}>+1</button>
                  <button class="bg-[#171717] text-white hover:bg-purple-900 rounded-md m-1 size-12 shadow-lg" onClick={() => handleAdjust(toner, -1)}>-1</button>
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



