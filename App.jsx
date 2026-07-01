import React, { useState } from 'react';
import { capitalGainsData, holdingsData } from './mockData';

function App() {
  const [selectedRows, setSelectedRows] = useState([]);

  const toggleRow = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter(rowId => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // 1. PRE-HARVESTING CALCULATIONS
  const preStcgNet = capitalGainsData.stcg.profits - capitalGainsData.stcg.losses;
  const preLtcgNet = capitalGainsData.ltcg.profits - capitalGainsData.ltcg.losses;
  const preTotalRealized = preStcgNet + preLtcgNet;

  // 2. AFTER-HARVESTING CALCULATIONS
  let postStcgProfits = capitalGainsData.stcg.profits;
  let postStcgLosses = capitalGainsData.stcg.losses;
  let postLtcgProfits = capitalGainsData.ltcg.profits;
  let postLtcgLosses = capitalGainsData.ltcg.losses;

  holdingsData.forEach((coin) => {
    if (selectedRows.includes(coin.id)) {
      if (coin.stcgGain > 0) {
        postStcgProfits += coin.stcgGain;
      } else {
        postStcgLosses += Math.abs(coin.stcgGain);
      }
      if (coin.ltcgGain > 0) {
        postLtcgProfits += coin.ltcgGain;
      } else {
        postLtcgLosses += Math.abs(coin.ltcgGain);
      }
    }
  });

  const postStcgNet = postStcgProfits - postStcgLosses;
  const postLtcgNet = postLtcgProfits - postLtcgLosses;
  const postTotalRealized = postStcgNet + postLtcgNet;

  const taxSaved = Math.max(0, (preTotalRealized - postTotalRealized) * 0.30);

  // Formatting helper to match the dollar layout in the design demo
  const formatCurrency = (num) => {
    const isNegative = num < 0;
    const formatted = Math.abs(num).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    return `${isNegative ? '-' : ''}$${formatted}`;
  };

  return (
    <div style={{ padding: '40px 20px', fontFamily: 'system-ui, sans-serif', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#080b11', minHeight: '100vh', color: '#ffffff' }}>
      
      {/* IMPORTANT NOTES DISCLAIMER TOP BANNER */}
      <div style={{ background: '#0f172a', border: '1px solid #1e293b', padding: '12px 20px', borderRadius: '6px', marginBottom: '24px', display: 'flex', alignItems: 'center', fontSize: '14px', color: '#94a3b8' }}>
        <span style={{ marginRight: '10px', color: '#38bdf8' }}>ℹ️</span> Important Notes And Disclaimers
      </div>

      {/* TAX SAVINGS ALERT BANNER */}
      {taxSaved > 0 && (
        <div style={{ background: '#064e3b', color: '#34d399', padding: '15px', borderRadius: '8px', marginBottom: '24px', fontWeight: 'bold', textAlign: 'center', border: '1px solid #059669' }}>
          🎉 You are going to save {formatCurrency(taxSaved)} in estimated taxes!
        </div>
      )}
      
      {/* TOP DASHBOARD CARDS CONTAINER */}
      <div style={{ display: 'flex', gap: '24px', marginBottom: '32px' }}>
        
        {/* Pre-Harvesting Card (Dark Background) */}
        <div style={{ flex: 1, background: '#111622', border: '1px solid #1e293b', padding: '24px', borderRadius: '8px' }}>
          <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#f8fafc' }}>Pre Harvesting</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', textAlign: 'right', gap: '12px', marginBottom: '16px', color: '#94a3b8', fontSize: '13px' }}>
            <span style={{ textAlign: 'left' }}></span>
            <span>Short-term</span>
            <span>Long-term</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', textAlign: 'right', gap: '12px', marginBottom: '16px', fontSize: '14px' }}>
            <span style={{ textAlign: 'left', color: '#94a3b8' }}>Profits</span>
            <span>{formatCurrency(capitalGainsData.stcg.profits)}</span>
            <span>{formatCurrency(capitalGainsData.ltcg.profits)}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', textAlign: 'right', gap: '12px', marginBottom: '16px', fontSize: '14px' }}>
            <span style={{ textAlign: 'left', color: '#94a3b8' }}>Losses</span>
            <span>{formatCurrency(capitalGainsData.stcg.losses)}</span>
            <span>{formatCurrency(capitalGainsData.ltcg.losses)}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', textAlign: 'right', gap: '12px', marginBottom: '24px', fontSize: '14px', fontWeight: '500' }}>
            <span style={{ textAlign: 'left', color: '#94a3b8' }}>Net Capital Gains</span>
            <span>{formatCurrency(preStcgNet)}</span>
            <span>{formatCurrency(preLtcgNet)}</span>
          </div>

          <div style={{ borderTop: '1px solid #1e293b', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '16px', fontWeight: '600', color: '#f8fafc' }}>Realised Capital Gains:</span>
            <span style={{ fontSize: '22px', fontWeight: '700', color: '#ffffff' }}>{formatCurrency(preTotalRealized)}</span>
          </div>
        </div>

        {/* After Harvesting Card (Vibrant Blue Background) */}
        <div style={{ flex: 1, background: '#2563eb', padding: '24px', borderRadius: '8px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#ffffff' }}>After Harvesting</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', textAlign: 'right', gap: '12px', marginBottom: '16px', color: '#bfdbfe', fontSize: '13px' }}>
              <span style={{ textAlign: 'left' }}></span>
              <span>Short-term</span>
              <span>Long-term</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', textAlign: 'right', gap: '12px', marginBottom: '16px', fontSize: '14px' }}>
              <span style={{ textAlign: 'left', color: '#bfdbfe' }}>Profits</span>
              <span>{formatCurrency(postStcgProfits)}</span>
              <span>{formatCurrency(postLtcgProfits)}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', textAlign: 'right', gap: '12px', marginBottom: '16px', fontSize: '14px' }}>
              <span style={{ textAlign: 'left', color: '#bfdbfe' }}>Losses</span>
              <span>{formatCurrency(postStcgLosses)}</span>
              <span>{formatCurrency(postLtcgLosses)}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', textAlign: 'right', gap: '12px', marginBottom: '24px', fontSize: '14px', fontWeight: '500' }}>
              <span style={{ textAlign: 'left', color: '#bfdbfe' }}>Net Capital Gains</span>
              <span>{formatCurrency(postStcgNet)}</span>
              <span>{formatCurrency(postLtcgNet)}</span>
            </div>
          </div>

          <div style={{ borderTop: '1px solid #60a5fa', paddingTop: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '16px', fontWeight: '600', color: '#ffffff' }}>Effective Capital Gains:</span>
            <span style={{ fontSize: '22px', fontWeight: '700', color: '#ffffff' }}>{formatCurrency(postTotalRealized)}</span>
          </div>
        </div>

      </div>

      {/* HOLDINGS CONTAINER */}
      <div style={{ background: '#111622', border: '1px solid #1e293b', padding: '24px', borderRadius: '8px' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600' }}>Holdings</h3>
        
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #1e293b', color: '#94a3b8' }}>
              <th style={{ padding: '12px 8px', width: '50px' }}>Select</th>
              <th style={{ padding: '12px 8px' }}>Asset</th>
              <th style={{ padding: '12px 8px', textAlign: 'right' }}>Avg. Buy Price</th>
              <th style={{ padding: '12px 8px', textAlign: 'right' }}>Current Price</th>
              <th style={{ padding: '12px 8px', textAlign: 'right' }}>Short-Term Gain/Loss</th>
              <th style={{ padding: '12px 8px', textAlign: 'right' }}>Long-Term Gain/Loss</th>
            </tr>
          </thead>
          <tbody>
            {holdingsData.map((coin) => (
              <tr key={coin.id} style={{ borderBottom: '1px solid #1e293b', color: '#f8fafc' }}>
                <td style={{ padding: '16px 8px' }}>
                  <input 
                    type="checkbox" 
                    checked={selectedRows.includes(coin.id)} 
                    onChange={() => toggleRow(coin.id)}
                    style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: '#2563eb' }}
                  />
                </td>
                <td style={{ padding: '16px 8px', fontWeight: '500' }}>{coin.name}</td>
                <td style={{ padding: '16px 8px', textAlign: 'right' }}>{formatCurrency(coin.avgBuyPrice)}</td>
                <td style={{ padding: '16px 8px', textAlign: 'right' }}>{formatCurrency(coin.currentPrice)}</td>
                <td style={{ padding: '16px 8px', textAlign: 'right', color: coin.stcgGain >= 0 ? '#10b981' : '#ef4444' }}>
                  {formatCurrency(coin.stcgGain)}
                </td>
                <td style={{ padding: '16px 8px', textAlign: 'right', color: coin.ltcgGain >= 0 ? '#10b981' : '#ef4444' }}>
                  {formatCurrency(coin.ltcgGain)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;