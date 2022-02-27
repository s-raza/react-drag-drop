import React, { useState, useEffect, useCallback } from 'react';
import Main from './Components/Main.js'

function App() {
  const [campaigns, setCampaigns] = useState(0);

  let getCampaigns = useCallback(async () => {
    await fetch('/campaigns').then(res => res.json()).then(data => {
      setCampaigns(data);
    });
  }, [])

  useEffect(() => {
    getCampaigns()
  }, [getCampaigns]);

  return (
    <div className="App">
      <Main campaigns={campaigns} getCampaigns={getCampaigns} />
    </div>
  );
}

export default App;
