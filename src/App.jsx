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
      transform={`rotate(-30, ${x}, ${y + dy})`}
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
    
    <div class="bg-black">
      {loading ? (
        <p>Loading toner data...</p>
      ) : (
        <>
          <div class="relative"> 
            <img src="./public/bg1.jpg" class="relative "></img>
            <div class="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black to-transparent"></div>
          </div>
          <h1 class="text-3xl text-white font-[Roboto] text-center">Toner Levels</h1>
          <div class="flex justify-center items-center">
            <BarChart width={1000} height={800} data={toners} margin={{ bottom: 300, top: 30}}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" interval={0} angle={0} textAnchor="end" tick={<CustomXAxisTick />} />
            <YAxis width={100} allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="quantity" fill="gray"/>
            </BarChart>
          </div>

          <div>
            <h1 class="font-[Roboto] text-center p-5 text-4xl bg-black text-white">Edit Quantities</h1>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-3 gap-1 bg-black text-white m-5">
            {toners.map((toner) => (
              <div key={toner.id} class="font-bold font-[Roboto] m-3">
                <strong class="text-white">{toner.name}</strong>: {toner.quantity}{' '}
                <div>
                  <button class="bg-white text-black hover:bg-purple-900 rounded-md m-1 size-12 ring-2 ring-white" onClick={() => handleAdjust(toner, 1)}>+1</button>
                  <button class="bg-white text-black hover:bg-purple-900 rounded-md m-1 size-12 ring-2 ring-white" onClick={() => handleAdjust(toner, -1)}>-1</button>
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



