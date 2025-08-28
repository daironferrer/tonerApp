import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from 'recharts';
import { supabase } from './supabaseClient';
import Navbar from './navbar';


const CustomXAxisTick = (props) => {
  const { x, y, payload } = props;
  const dy = 20;
  return (
    <text
      x={x}
      y={y + dy}
      textAnchor="end"
      fill="white"
      fontSize={20}
      fontFamily='Roboto'
      fontWeight={'semibold'}
      transform={`rotate(-50, ${x}, ${y + dy})`}
    >
      {payload.value}
    </text>
  );
};

function Peripherals() {
  const [peripherals, setPeripherals] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch toners from Supabase
  useEffect(() => {
    const fetchPeripherals = async () => {
      const { data, error } = await supabase
        .from('peripherals')
        .select('*')
        .order('id', { ascending: true });

      if (error) {
        console.error('Error fetching toners:', error.message);
      } else {
        setPeripherals(data);
      }
      setLoading(false);
    };

    fetchPeripherals();
  }, []);

  const handleAdjust = async (peripheral, delta) => {
  

  // Wrapped toner quantity in Number to force JS to treat it as a number and not a concatenation  
  const updatedQuantity = Math.max(0, Number(peripheral.quantity) + delta);

    const { error } = await supabase
      .from('peripherals')
      .update({ quantity: updatedQuantity })
      .eq('id', peripheral.id);

    if (error) {
      alert('Failed to update');
      console.error(error.message);
      return;
    }

    // Refresh toner list
    const { data } = await supabase
      .from('peripherals')
      .select('*')
      .order('id', { ascending: true });

    setPeripherals(data);
  };

  return (
    
    
    // Wrapped Bar Chart in a div with hidden block to hide chart on mobile for clean UI  

    <div class="bg-[#171717]">
      <Navbar />
      {loading ? (
        <p>Loading toner data...</p>
      ) : (
        <>

        <div class="hidden lg:block">
          <h1 class="text-2xl text-white font-[Roboto] text-center pt-10 lg:pt-50 hidden lg:block">Current Levels</h1>
          <div class="lg:m-5 flex justify-center">
            <BarChart width={1050} height={800} data={peripherals} margin={{ bottom: 350, top: 20, left: 20, right: 20}}>   
            <XAxis dataKey="name" interval={0} angle={0} textAnchor="end" tick={<CustomXAxisTick />} />
            <YAxis width={100} allowDecimals={false} />
            <Bar dataKey="quantity" fill="white"/>
            </BarChart>
          </div>
          </div>

        {/* This section of code will be for adding a quick summary to the mobile version for a quick glance */}

          {/* <div class="block lg:hidden text-center font-[Roboto]">
            <h1 class="text-2xl">Quick Summary</h1>
          </div> */}
          
          <div class="bg-[#171717] text-white font-[Roboto] mt-25">
          <h1 class="text-center text-2xl lg:pt-25">Edit Quantities</h1>
          <div class="grid grid-cols-1 lg:grid-cols-4 gap-1">
            {peripherals.map((peripheral) => (
              <div class="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl m-5 bg-[#1d1b1b] p-6 shadow-lg outline outline-black/5">
                <div key={peripheral.id} class="font-bold m-3 grid grid-cols-2 size-50">
                <strong>{peripheral.name}</strong> {peripheral.quantity}{' '}
                  <button class="bg-[#171717] text-white hover:bg-purple-900 rounded-md m-1 size-15 shadow-lg" onClick={() => handleAdjust(peripheral, 1)}>+1</button>
                  <button class="bg-[#171717] text-white hover:bg-purple-900 rounded-md m-1 size-15 shadow-lg" onClick={() => handleAdjust(peripheral, -1)}>-1</button>
                </div>             
              </div>
            ))}
          </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Peripherals;