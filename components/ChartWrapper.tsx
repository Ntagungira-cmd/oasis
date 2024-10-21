"use client";

import React from 'react'
import WebsiteVisitsChart from './WebsiteVisitsChart';
import {ChartWrapperProps} from '@/types';

function ChartWrapper({ statsData, visits }: ChartWrapperProps) {
  return (
    <div>
      <WebsiteVisitsChart
        total={{
          value: statsData[0].value,
          isPositive: statsData[0]?.trend?.isPositive ?? true,
        }}
        data = {visits}
      />
    </div>
  );
}

export default ChartWrapper