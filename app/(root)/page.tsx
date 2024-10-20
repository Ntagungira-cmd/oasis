/* eslint-disable @typescript-eslint/no-unused-vars */
import HeaderBox from '@/components/HeaderBox';
import StatsCard from '@/components/StatsCard';
import { Button } from '@/components/ui/button';
import { ArrowDown } from "lucide-react";
import React from 'react'
import view from "../../public/icons/visits.svg";
import users from "../../public/icons/users.svg";
import newsignup from "../../public/icons/newsignup.svg"
import star from "../../public/icons/Star.svg";
import WebsiteVisitsChart from '@/components/WebsiteVisitsChart';
import useSWR from 'swr';
import { SignedIn, UserButton } from '@clerk/nextjs';
import ChartWrapper from '@/components/ChartWrapper';
import { StatsCardProps } from '@/types';

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

function Home() {

  // // SWR hooks for data fetching
  // const { data: bounceRate, error: bounceError } = useSWR(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/bounce_rate.json?key=${process.env.NEXT_PUBLIC_MOCKAROO_KEY}`,
  //   fetcher,
  //   {
  //     refreshInterval: 60000, // Refresh every 60 seconds
  //     revalidateOnFocus: true,
  //   }
  // );

  // const { data: newUsers, error: newUsersError } = useSWR(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/new_users.json?key=${process.env.NEXT_PUBLIC_MOCKAROO_KEY}`,
  //   fetcher,
  //   {
  //     refreshInterval: 60000,
  //   }
  // );

  // const { data: sessionData, error: sessionError } = useSWR(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/session.json?key=${process.env.NEXT_PUBLIC_MOCKAROO_KEY}`,
  //   fetcher,
  //   {
  //     refreshInterval: 60000,
  //   }
  // );

  // const { data: visitors, error: visitorsError } = useSWR(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/visitors.json?key=${process.env.NEXT_PUBLIC_MOCKAROO_KEY}`,
  //   fetcher,
  //   {
  //     refreshInterval: 60000,
  //   }
  // );

  // // Combine all errors
  // const hasError =
  //   bounceError || newUsersError || sessionError || visitorsError;

  // Build stats data array from fetched data
  // const statsData = [
  //   {
  //     label: "Total visitors",
  //     value: `${visitors?.value}K` || "---",
  //     trend: visitors ? { value: visitors.trend_value, isPositive: visitors.trend_is_positive } : { value: 0, isPositive: true },
  //     icon: view,
  //   },
  //   {
  //     label: "Bounce rate",
  //     value: `${bounceRate?.value}%` || "---",
  //     trend: bounceRate ? { value: bounceRate.trend_value, isPositive: bounceRate.trend_is_positive } : { value: 0, isPositive: true },
  //     icon: users,
  //   },
  //   {
  //     label: "Average session",
  //     value: `${sessionData?.value} min` || "---",
  //     trend: sessionData ? { value: sessionData.trend_value, isPositive: sessionData.trend_is_positive } : { value: 0, isPositive: true },
  //     icon: star,
  //   },
  //   {
  //     label: "New users",
  //     value: `${newUsers?.value}` || "---",
  //     trend: newUsers ? { value: newUsers.trend_value, isPositive: newUsers.trend_is_positive } : { value: 0, isPositive: true },
  //     icon: newsignup,
  //   },
  // ];

    const statsData: StatsCardProps[] = [
    {
      label: "Total visitors",
      value: "50.8K",
      trend: {
        value: 28.4,
        isPositive: true,
      },
      icon: view,
    },
    {
      label: "Bounce rate",
      value: "24.3%",
      trend: {
        value: 15.1,
        isPositive: true,
      },
      icon: users,
    },
    {
      label: "Average session",
      value: "40 min",
      trend: {
        value: 5.6,
        isPositive: false,
      },
      icon: star,
    },
    {
      label: "New users",
      value: "3.2K",
      trend: {
        value: 10.2,
        isPositive: true,
      },
      icon: newsignup,
    },
  ];

  // Error handling
  // if (hasError) {
  //   return (
  //     <div className="p-4 text-white-500 text-center">
  //       Error loading dashboard data. Please try again later.
  //     </div>
  //   );
  // }

  const loggedIn = () => {
    return {
      id: "b67f93e2-8c42-4c23-99a8-0c5f234bcf73",
      firstName: "John",
      lastName: "Adams",
      email: "johnadams@gmail.com",
      address: "1234 Main Street",
      city: "New York",
      country: "USA",
      postalCode: "10001",
    };
  };

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            type="greeting"
            title="Welcome back,"
            user={loggedIn()?.firstName || "Guest"}
            subtext="Measure your app’s performance and report traffic data."
          />
          <div className="flex items-center justify-between gap-2 md:gap-4 md:w-[30%]">
            <Button className="text-white bg-blue-100 mb-2 sm:mb-0">
              export report <ArrowDown />
            </Button>
            <Button className="text-white bg-purple-500 mb-2 sm:mb-0">
              create report
            </Button>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <div className="flex flex-row justify-evenly w-full flex-wrap">
          {statsData.map((stat, index) => (
            <StatsCard
              key={index}
              label={stat.label}
              value={stat.value}
              trend={stat.trend}
              icon={stat.icon}
            />
          ))}
        </div>
        {/* <WebsiteVisitsChart total={{value: statsData[0].value, isPositive:statsData[0].trend.isPositive }} /> */}

        <ChartWrapper statsData={statsData} />
      </div>
    </section>
  );
}

export default Home