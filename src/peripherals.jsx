import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { supabase } from "./supabaseClient";
import Navbar from "./navbar";

function Peripherals() {
  const [peripherals, setPeripherals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

  // Fetch peripherals from Supabase
  useEffect(() => {
    const fetchPeripherals = async () => {
      const { data, error } = await supabase
        .from("peripherals")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error("Error fetching peripherals:", error.message);
      } else {
        setPeripherals(data);
      }
      setLoading(false);
    };

    fetchPeripherals();
  }, []);

  const handleAdjust = async (peripheral, delta) => {
    const updatedQuantity = Math.max(0, Number(peripheral.quantity) + delta);

    const { error } = await supabase
      .from("peripherals")
      .update({ quantity: updatedQuantity })
      .eq("id", peripheral.id);

    if (error) {
      alert("Failed to update");
      console.error(error.message);
      return;
    }

    // Refresh peripherals list
    const { data } = await supabase
      .from("peripherals")
      .select("*")
      .order("id", { ascending: true });

    setPeripherals(data);
  };

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <p className="text-white text-center pt-10">Loading peripheral data...</p>
      ) : (
        <>
          <div className="text-white font-[Roboto] mt-30 lg:mt-50">
            <h1 className="text-center text-3xl lg:text-4xl mb-8 font-semibold">
              Inventory Management
            </h1>

            <div className="max-w-4xl mx-auto px-4 lg:px-8">
              <div className="space-y-3">
                {peripherals.map((peripheral) => (
                  <div
                    key={peripheral.id}
                    className="bg-black/20 backdrop-blur-sm border border-white/50 rounded-2xl shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] overflow-hidden"
                  >
                    {/* Accordion Header */}
                    <button
                      onClick={() => toggleExpanded(peripheral.id)}
                      className="w-full flex items-center justify-between p-6 hover:bg-blue-900/30 transition-colors
                       bg-black/20 backdrop-blur-sm border border-white/50 rounded-2xl shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] overflow-hidden"
                    >
                      <div className="flex items-center gap-4 flex-1 text-left">
                        <div>
                          <div className="font-semibold text-lg">{peripheral.name}</div>
                          <div className="text-sm text-gray-300">
                            Current Quantity: <span className="font-bold text-white">{peripheral.quantity}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronDown
                        size={24}
                        className={`transition-transform duration-300 ${
                          expandedId === peripheral.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Accordion Content */}
                    {expandedId === peripheral.id && (
                      <div className="border-t border-white/20 p-6 bg-black/10">
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                          <div className="text-center sm:text-left">
                            <div className="text-sm text-gray-300 mb-2">Adjust Quantity</div>
                            <div className="text-2xl font-bold">{peripheral.quantity} units</div>
                          </div>
                          <div className="flex gap-3 w-full sm:w-auto">
                            <button
                              onClick={() => handleAdjust(peripheral, -5)}
                              className="flex-1 sm:flex-none bg-red-600/80 hover:bg-red-700 backdrop-blur-sm border border-red-400/50 rounded-xl p-3 text-white font-semibold transition-colors"
                            >
                              -5
                            </button>
                            <button
                              onClick={() => handleAdjust(peripheral, -1)}
                              className="flex-1 sm:flex-none bg-orange-600/80 hover:bg-orange-700 backdrop-blur-sm border border-orange-400/50 rounded-xl p-3 text-white font-semibold transition-colors"
                            >
                              -1
                            </button>
                            <button
                              onClick={() => handleAdjust(peripheral, 1)}
                              className="flex-1 sm:flex-none bg-green-600/80 hover:bg-green-700 backdrop-blur-sm border border-green-400/50 rounded-xl p-3 text-white font-semibold transition-colors"
                            >
                              +1
                            </button>
                            <button
                              onClick={() => handleAdjust(peripheral, 5)}
                              className="flex-1 sm:flex-none bg-blue-600/80 hover:bg-blue-700 backdrop-blur-sm border border-blue-400/50 rounded-xl p-3 text-white font-semibold transition-colors"
                            >
                              +5
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Peripherals;
