import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import '../../styles/Overview.css';

const CategoryTransactions = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const txns = location.state?.txns || [];
  const backTo = location.state?.backTo || '/overview';
  const backLabel = backTo === '/analytics' ? 'Back to Analytics' : 'Back to Overview';

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2
    }).format(amount);
  };

  return (
    <div className="overview-container">
      <div className="overview-header" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          onClick={() => navigate(backTo)}
          style={{ 
            background: 'var(--bg-secondary)', 
            border: '1px solid var(--border-color)', 
            color: 'var(--text-primary)', 
            padding: '8px 16px', 
            borderRadius: '8px', 
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: 500,
            transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'var(--bg-secondary)'}
        >
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
          {backLabel}
        </button>
        <h1 style={{ margin: 0 }}>{decodeURIComponent(categoryName)} Transactions</h1>
      </div>

      <div className="overview-card top-space">
        <div className="card-header" style={{ marginBottom: '16px' }}>
          <h3 className="card-title">All Transactions</h3>
          <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{txns.length} transactions</span>
        </div>
        <table className="recent-transactions-table">
          <thead>
            <tr>
              <th style={{ padding: '16px 24px', textAlign: 'left' }}>DATE</th>
              <th style={{ padding: '16px 24px', textAlign: 'left' }}>DETAILS</th>
              <th style={{ padding: '16px 24px', textAlign: 'right' }}>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {txns.map((txn, index) => {
              const isDebit = txn.debit > 0;
              const amt = isDebit ? txn.debit : txn.credit;
              const sign = isDebit ? '-' : '+';
              const dateSplit = txn.txn_date.split('-');
              const displayDate = dateSplit.length === 3 ? `${dateSplit[2]}/${dateSplit[1]}/${dateSplit[0]}` : txn.txn_date;
              return (
                <tr key={txn.uncategorized_transaction_id || index}>
                  <td style={{ padding: '16px 24px' }}>{displayDate}</td>
                  <td className="txn-details" style={{ padding: '16px 24px' }}>{txn.details}</td>
                  <td className={`txn-amount ${isDebit ? 'negative' : 'positive'}`} style={{ padding: '16px 24px', textAlign: 'right' }}>
                    {sign}{formatCurrency(amt)}
                  </td>
                </tr>
              );
            })}
            {txns.length === 0 && (
              <tr><td colSpan="3" className="empty-state" style={{ padding: '32px', textAlign: 'center', color: 'var(--text-secondary)' }}>No transactions found or page reloaded. Please go back to the Overview page.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryTransactions;
