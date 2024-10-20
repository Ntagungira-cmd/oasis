"use client";

import React from 'react'
import WebsiteVisitsChart from './WebsiteVisitsChart';
import { ChartWrapperProps } from '@/types';

function ChartWrapper({ statsData }: ChartWrapperProps) {
  return (
    <div>
      <WebsiteVisitsChart
        total={{
          value: statsData[0].value,
          isPositive: statsData[0]?.trend?.isPositive ?? true,
        }}
      />
    </div>
  );
}

export default ChartWrapper