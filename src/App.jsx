import React, { useEffect, useState } from "react";
import { supabase } from "./lib/supabaseClient";

function App() {
  const [message, setMessage] = useState("Connecting to Supabase...");

  useEffect(() => {
    async function checkConnection() {
      if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
        setMessage("Supabase environment variables are missing. Please check .env.");
        return;
      }

      const { data, error } = await supabase.auth.getSession();
      if (error) {
        setMessage(`Supabase connected, but auth session check failed: ${error.message}`);
      } else {
        setMessage("Supabase connected successfully.");
      }
    }

    checkConnection();
  }, []);

  return (
    <main style={{
      fontFamily: "system-ui, sans-serif",
      minHeight: "100vh",
      display: "grid",
      placeItems: "center",
      padding: "2rem",
      textAlign: "center",
      background: "#f5f7fb"
    }}>
      <div style={{ maxWidth: 560, width: "100%", padding: 24, background: "white", borderRadius: 24, boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
        <h1 style={{ marginBottom: 16 }}>UDHRS Health Portal</h1>
        <p style={{ marginBottom: 12 }}>{message}</p>
        <code style={{ display: "block", wordBreak: "break-all", color: "#555" }}>
          {import.meta.env.VITE_SUPABASE_URL}
        </code>
      </div>
    </main>
  );
}

export default App;
