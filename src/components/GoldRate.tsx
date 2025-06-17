import React, { useEffect, useState } from 'react';
import Marquee from 'react-fast-marquee';
import { fetchGoldRates } from '@/lib/api'; // adjust import path

type Rate = {
  id: string;
  type: string;
  value: number;
};

const GoldRates = () => {
  const [rates, setRates] = useState<Rate[]>([]);

  useEffect(() => {
    const getRates = async () => {
      try {
        const data = await fetchGoldRates();
        setRates(data);
      } catch (error) {
        console.error('Error fetching rates:', error);
      }
    };

    getRates();
  }, []);

  const formatRate = (type: string, value: number) => {
    return `${type} Gold: ₹${value.toLocaleString('en-IN')}.00 `;
  };

  return (
    <div className="header-marquee text-white py-1">
      <Marquee speed={50} gradient={false} pauseOnHover>
        <span style={{ fontWeight: '500', marginRight: '2rem' }}>2025 | Today's Rate:</span>
        {rates.map((rate, index) => (
          <span key={rate.id} style={{ marginRight: '2rem', fontWeight: '400' }}>
            {formatRate(rate.type, rate.value)}
            {index < rates.length - 1 && <span style={{ margin: '0 1rem' }}>|</span>}
          </span>
        ))}
      </Marquee>
    </div>
  );
};

export default GoldRates;
