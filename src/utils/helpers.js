export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };
  
  export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  export const getStatusColor = (status) => {
    const colors = {
      'New': '#2196F3',
      'Contacted': '#FF9800',
      'Qualified': '#4CAF50',
      'Proposal': '#9C27B0',
      'Negotiation': '#FF5722',
      'Closed-Won': '#2E7D32',
      'Closed-Lost': '#F44336',
    };
    return colors[status] || '#757575';
  };