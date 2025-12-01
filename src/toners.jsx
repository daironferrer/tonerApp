import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import { supabase } from "./supabaseClient";
import Navbar from "./navbar";

function Toners() {
  const [toners, setToners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

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

  const toggleExpanded = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div>
      <Navbar />
      {loading ? (
        <p className="text-white text-center pt-10">Loading toner data...</p>
      ) : (
        <>
          <div className="text-white font-[Roboto] mt-30 lg:mt-50">
            <h1 className="text-center text-3xl lg:text-4xl mb-8 font-semibold">
              Inventory Management
            </h1>

            <div className="max-w-4xl mx-auto px-4 lg:px-8">
              <div className="space-y-3">
                {toners.map((toner) => (
                  <div
                    key={toner.id}
                    className="bg-black/20 backdrop-blur-sm border border-white/50 rounded-2xl shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] overflow-hidden"
                  >
                    {/* Accordion Header */}
                    <button
                      onClick={() => toggleExpanded(toner.id)}
                      className="w-full flex items-center justify-between p-6 hover:bg-blue-900/30 transition-colors
                       bg-black/20 backdrop-blur-sm border border-white/50 rounded-2xl shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] overflow-hidden"
                    >
                      <div className="flex items-center gap-4 flex-1 text-left">
                        <div>
                          <div className="font-semibold text-lg">{toner.name}</div>
                          <div className="text-sm text-gray-300">
                            Current Quantity: <span className="font-bold text-white">{toner.quantity}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronDown
                        size={24}
                        className={`transition-transform duration-300 ${
                          expandedId === toner.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {/* Accordion Content */}
                    {expandedId === toner.id && (
                      <div className="border-t border-white/20 p-6 bg-black/10">
                        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                          <div className="text-center sm:text-left">
                            <div className="text-sm text-gray-300 mb-2">Adjust Quantity</div>
                            <div className="text-2xl font-bold">{toner.quantity} units</div>
                          </div>
                          <div className="flex gap-3 w-full sm:w-auto">
                            <button
                              onClick={() => handleAdjust(toner, -5)}
                              className="flex-1 sm:flex-none bg-red-600/80 hover:bg-red-700 backdrop-blur-sm border border-red-400/50 rounded-xl p-3 text-white font-semibold transition-colors"
                            >
                              -5
                            </button>
                            <button
                              onClick={() => handleAdjust(toner, -1)}
                              className="flex-1 sm:flex-none bg-orange-600/80 hover:bg-orange-700 backdrop-blur-sm border border-orange-400/50 rounded-xl p-3 text-white font-semibold transition-colors"
                            >
                              -1
                            </button>
                            <button
                              onClick={() => handleAdjust(toner, 1)}
                              className="flex-1 sm:flex-none bg-green-600/80 hover:bg-green-700 backdrop-blur-sm border border-green-400/50 rounded-xl p-3 text-white font-semibold transition-colors"
                            >
                              +1
                            </button>
                            <button
                              onClick={() => handleAdjust(toner, 5)}
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

            {/* Reorder Section */}
            <div className="hidden lg:block mt-20">
              <h1 className="text-center text-2xl mb-8 font-semibold">Reorder</h1>
              <div className="mx-auto max-w-4xl rounded-xl m-5 p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <a
                    href="https://www.amazon.com/dp/B0DDKKSJ1M?ref=fed_asin_title"
                    className="flex items-center gap-6 text-sm py-5 px-6 bg-black/20 backdrop-blur-sm border border-white/50 rounded-2xl shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] p-6 text-white relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/30 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-tl after:from-white/15 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none hover:bg-blue-900"
                  >
                    760 Toner
                  </a>
                  <a
                    href="https://www.amazon.com/dp/B09W9K6BPM?ref=fed_asin_title"
                    className="flex items-center gap-6 text-sm py-5 px-6 bg-black/20 backdrop-blur-sm border border-white/50 rounded-2xl shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] p-6 text-white relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/30 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-tl after:from-white/15 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none hover:bg-blue-900"
                  >
                    730 Drum
                  </a>
                  <a
                    href="https://www.amazon.com/dp/B0D8Q5HQBX?ref=fed_asin_title"
                    className="flex items-center gap-6 text-sm py-5 px-6 bg-black/20 backdrop-blur-sm border border-white/50 rounded-2xl shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] p-6 text-white relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/30 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-tl after:from-white/15 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none hover:bg-blue-900"
                  >
                    830XL Toner
                  </a>
                  <a
                    href="https://www.amazon.com/dp/B0D8Q61J3Y?ref=fed_asin_title&th=1"
                    className="flex items-center gap-6 text-sm py-5 px-6 bg-black/20 backdrop-blur-sm border border-white/50 rounded-2xl shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] p-6 text-white relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/30 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-tl after:from-white/15 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none hover:bg-blue-900"
                  >
                    830 Drum
                  </a>
                  <a
                    href="https://ueweb1.ubeo.com/einfo/Gateway/Login?ReturnUrl=%2feinfo%2f"
                    className="flex items-center gap-6 text-sm py-5 px-6 bg-black/20 backdrop-blur-sm border border-white/50 rounded-2xl shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] p-6 text-white relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/30 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-tl after:from-white/15 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none hover:bg-blue-900"
                  >
                    UBEO Printer
                  </a>
                  <a
                    href="https://www.amazon.com/dp/B00HV43884?ref=fed_asin_title&th=1"
                    className="flex items-center gap-6 text-sm py-5 px-6 bg-black/20 backdrop-blur-sm border border-white/50 rounded-2xl shadow-[inset_0_1px_0px_rgba(255,255,255,0.75),0_0_9px_rgba(0,0,0,0.2),0_3px_8px_rgba(0,0,0,0.15)] p-6 text-white relative before:absolute before:inset-0 before:rounded-lg before:bg-gradient-to-br before:from-white/30 before:via-transparent before:to-transparent before:opacity-70 before:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:bg-gradient-to-tl after:from-white/15 after:via-transparent after:to-transparent after:opacity-50 after:pointer-events-none hover:bg-blue-900"
                  >
                    PrintBoss
                  </a>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Toners;