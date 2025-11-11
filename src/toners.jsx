import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis } from "recharts";
import { supabase } from "./supabaseClient";
import Navbar from "./navbar";

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
      fontFamily="Roboto"
      fontWeight={"semibold"}
      transform={`rotate(-50, ${x}, ${y + dy})`}
    >
      {payload.value}
    </text>
  );
};

function Toners() {
  const [toners, setToners] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch toners from Supabase
  useEffect(() => {
    const fetchToners = async () => {
      const { data, error } = await supabase
        .from("toners")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching toners:", error.message);
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
      .from("toners")
      .update({ quantity: updatedQuantity })
      .eq("id", toner.id);

    if (error) {
      alert("Failed to update");
      console.error(error.message);
      return;
    }

    // Refresh toner list
    const { data } = await supabase
      .from("toners")
      .select("*")
      .order("id", { ascending: true });

    setToners(data);
  };

  return (
    // Wrapped Bar Chart in a div with hidden block to hide chart on mobile for clean UI

    <div>
      <Navbar />
      {loading ? (
        <p>Loading toner data...</p>
      ) : (
        <>
          <div class="hidden lg:block">
            <h1 class="text-2xl text-white font-[Roboto] text-center pt-10 lg:pt-50 hidden lg:block">
              Current Levels
            </h1>
            <div class="lg:m-5 flex justify-center">
              <BarChart
                width={1050}
                height={800}
                data={toners}
                margin={{ bottom: 350, top: 20, left: 20, right: 20 }}
              >
                <XAxis
                  dataKey="name"
                  interval={0}
                  angle={0}
                  textAnchor="end"
                  tick={<CustomXAxisTick />}
                />
                <YAxis width={100} allowDecimals={false} />
                <Bar dataKey="quantity" fill="white" />
              </BarChart>
            </div>
          </div>

          <div class="block lg:hidden text-center font-[Roboto] mt-40 mb-20">
            <h1 class="text-2xl">Quick Summary</h1>
            <h1>Low on:</h1>
          </div>

          {/* Claude Assist with formatting this section for Reordering */}

          <div class="hidden lg:block">
            <h1 class="text-center text-2xl mb-4">Reorder</h1>
            <div class="mx-auto max-w-4xl rounded-xl m-5 p-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <a
                  href="https://www.amazon.com/dp/B0DDKKSJ1M?ref=fed_asin_title"
                  class="flex items-center gap-6 text-sm py-5 px-6
                   text-white bg-neutral-800/30 backdrop-blur-lg rounded-md"
                >
                  760 Toner
                </a>
                <a
                  href="https://www.amazon.com/dp/B09W9K6BPM?ref=fed_asin_title"
                  class="flex items-center gap-6 text-sm py-5 px-6
                   text-white bg-neutral-800/30 backdrop-blur-lg rounded-md"
                >
                  730 Drum
                </a>
                <a
                  href="https://www.amazon.com/dp/B0D8Q5HQBX?ref=fed_asin_title"
                  class="flex items-center gap-6 text-sm py-5 px-6
                   text-white bg-neutral-800/30 backdrop-blur-lg rounded-md"
                >
                  830XL Toner
                </a>
                <a
                  href="https://www.amazon.com/dp/B0D8Q61J3Y?ref=fed_asin_title&th=1"
                  class="flex items-center gap-6 text-sm py-5 px-6
                   text-white bg-neutral-800/30 backdrop-blur-lg rounded-md"
                >
                  830 Drum
                </a>
                <a
                  href="https://ueweb1.ubeo.com/einfo/Gateway/Login?ReturnUrl=%2feinfo%2f"
                  class="flex items-center gap-6 text-sm py-5 px-6
                   text-white bg-neutral-800/30 backdrop-blur-lg rounded-md"
                >
                  UBEO Printer
                </a>
                <a
                  href="https://www.amazon.com/dp/B00HV43884?ref=fed_asin_title&th=1"
                  class="flex items-center gap-6 text-sm py-5 px-6
                   text-white bg-neutral-800/30 backdrop-blur-lg rounded-md"
                >
                  PrintBoss
                </a>
              </div>
            </div>
          </div>

          <div class="text-white font-[Roboto] mt-25">
            <h1 class="text-center text-2xl lg:pt-25 mb-6">Edit Quantities</h1>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 px-4">
              {toners.map((toner) => (
                <div 
                  key={toner.id}
                  class="rounded-lg p-6 bg-neutral-800/30 backdrop-blur-lg"
                >
                  <div class="text-sm font-bold mb-1">{toner.name}</div>
                  <div class="text-xs text-gray-400 mb-3">Qty: {toner.quantity}</div>
                  <div class="flex gap-2">
                    <button
                      class="flex-1 bg-neutral-800/30 backdrop-blur-lg
                       text-white hover:bg-blue-900 rounded-md py-4 text-sm shadow-lg transition-colors"
                      onClick={() => handleAdjust(toner, 1)}
                    >
                      +1
                    </button>
                    <button
                      class="flex-1 bg-neutral-800/30 backdrop-blur-lg
                       text-white hover:bg-blue-900 rounded-md py-2 text-sm shadow-lg transition-colors"
                      onClick={() => handleAdjust(toner, -1)}
                    >
                      -1
                    </button>
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

export default Toners;
