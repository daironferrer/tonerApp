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
      style={{ fontSize: 12 }}
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
    
    <div style={{
      padding: '80px 500px',
      fontFamily: 'Futura, sans-serif',
      maxWidth: 2000,
      margin: '0 auto',
      textAlign: 'center'
    }}>

      {loading ? (
        <p>Loading toner data...</p>
      ) : (
        <>
          <div>
            {toners.map((toner) => (
              <div key={toner.id} style={{ marginBottom: 22, marginLeft: 20}}>
                <strong>{toner.name}</strong>: {toner.quantity}{' '}
                <button onClick={() => handleAdjust(toner, 1)}>+1</button>
                <button onClick={() => handleAdjust(toner, -1)}>-1</button>
              </div>
            ))}
          </div>

          <h2 style={{ marginTop: '40px' }}>Inventory Chart</h2>
          <div style={{ overflowX: 'auto', paddingBottom: 40, paddingTop: 40 }}>
            <BarChart width={1000} height={900} data={toners} margin={{ left: 50, right: 30, bottom: 250, top: 50}}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval={0} angle={-45} textanchor='end' tick={<CustomXAxisTick/>}/>
              <YAxis width={50} allowDecimals={false} />
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



