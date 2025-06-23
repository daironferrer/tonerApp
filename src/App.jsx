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
  const dy = 20; // Adjust to move labels down
  return (
    <text
      x={x}
      y={y + dy} // shift label down by dy pixels
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
  const [adjustingToner, setAdjustingToner] = useState(null);
  const [adjustAmount, setAdjustAmount] = useState('');
  const [adjustType, setAdjustType] = useState('add');

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

  const openAdjustModal = (toner) => {
    setAdjustingToner(toner);
    setAdjustAmount('');
    setAdjustType('add');
  };

  const closeAdjustModal = () => {
    setAdjustingToner(null);
  };

  const handleAdjust = async () => {
    const amount = parseInt(adjustAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Enter a valid number');
      return;
    }

    const updatedQuantity =
      adjustType === 'add'
        ? adjustingToner.quantity + amount
        : Math.max(0, adjustingToner.quantity - amount);

    const { error } = await supabase
      .from('toners')
      .update({ quantity: updatedQuantity })
      .eq('id', adjustingToner.id);

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
    closeAdjustModal();
  };

  return (
    
    <div style={{
      padding: '60px 350px',
      fontFamily: 'Futura, sans-serif',
      maxWidth: 800,
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <h1>Toner Inventory Tracker</h1>

      {loading ? (
        <p>Loading toner data...</p>
      ) : (
        <>
          <ul style={{ marginBottom: '40px', listStyle: 'none', padding: 0 }}>
            {toners.map((toner) => (
              <li key={toner.id} style={{ marginBottom: 12 }}>
                <strong>{toner.name}</strong>: {toner.quantity}{' '}
                <button onClick={() => openAdjustModal(toner)}>Adjust</button>
              </li>
            ))}
          </ul>

          <h2 style={{ marginTop: '40px' }}>Inventory Chart</h2>
          <div style={{ overflowX: 'auto', paddingBottom: 40, paddingTop: 40 }}>
            <BarChart width={1000} height={700} data={toners} margin={{ left: 50, right: 30, bottom: 80, top: 50}}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" interval={0} angle={-45} textanchor='end' tick={<CustomXAxisTick/>}/>
              <YAxis width={60} allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="quantity" fill="#8884d8" />
            </BarChart>
          </div>
        </>
      )}

      {adjustingToner && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <div style={{
            background: 'black',
            color: 'white',
            padding: 20,
            borderRadius: 8,
            minWidth: 300
          }}>
            <h3>Adjust "{adjustingToner.name}"</h3>
            <div style={{ marginBottom: 10 }}>
              <label>
                Type:{' '}
                <select
                  value={adjustType}
                  onChange={(e) => setAdjustType(e.target.value)}
                >
                  <option value="add">Add</option>
                  <option value="remove">Remove</option>
                </select>
              </label>
            </div>
            <div style={{ marginBottom: 20 }}>
              <label>
                Quantity:{' '}
                <input
                  type="number"
                  value={adjustAmount}
                  onChange={(e) => setAdjustAmount(e.target.value)}
                  min="1"
                />
              </label>
            </div>
            <button onClick={handleAdjust} style={{ marginRight: 10 }}>Submit</button>
            <button onClick={closeAdjustModal}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

