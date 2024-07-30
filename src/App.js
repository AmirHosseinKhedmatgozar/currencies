//// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`

import { useEffect, useState } from "react";

function App() {
  const [money, setMoney] = useState(0);
  const [origin, setOrigin] = useState("USD");
  const [destination, setDestination] = useState("EUR");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(
    function () {
      async function getData() {
        setLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${money}&from=${origin}&to=${destination}`
        );
        const data = await res.json();
        setOutput(data.rates[destination]);
        setLoading(false);
      }
      if (money <= 0) return;
      if (origin === destination) return setOutput(money);
      getData();
    },
    [money, origin, destination]
  );
  return (
    <>
      <div>
        <input
          type="text"
          value={money}
          onChange={(e) => setMoney(Number(e.target.value))}
          disabled={loading}
        />
        <select value={origin} onChange={(e) => setOrigin(e.target.value)}>
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <select
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="CAD">CAD</option>
          <option value="INR">INR</option>
        </select>
        <p>
          {output || "---"}:{destination}
        </p>
      </div>
      {loading && <h3 className="loading">LOADING...</h3>}
    </>
  );
}

export default App;
