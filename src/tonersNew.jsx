import React, { useState, useEffect } from "react";
import { supabase } from "./supabaseClient";

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

  return(
    <div>

    </div>
  );
}