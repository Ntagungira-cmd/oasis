"use client";

import HeaderBox from "@/components/HeaderBox";
import StatsCard from "@/components/StatsCard";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import React from "react";
import view from "../../public/icons/visits.svg";
import users from "../../public/icons/users.svg";
import newsignup from "../../public/icons/newsignup.svg";
import star from "../../public/icons/Star.svg";
import { SignedIn, UserButton } from "@clerk/nextjs";
import ChartWrapper from "@/components/ChartWrapper";
import useSWR from "swr";
import { VisitsData } from "@/types";
import Loader from "@/components/Loader";

// Fetcher function
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};

function Home() {
  // SWR hooks for data fetching with caching
  const { data: bounceRate, error: bounceError } = useSWR(
    "/api/bounce_rate",
    fetcher,
    {
      refreshInterval: 60000 * 30, // Refetch every 30 minutes
      dedupingInterval: 60000 * 5, // dedupe requests every 5 minutes
      revalidateOnFocus: false, // Do not refetch when the window regains focus
      revalidateOnReconnect: false, // Do not refetch when network reconnects
    }
  );

  const { data: newUsers, error: newUsersError } = useSWR(
    "/api/new_users",
    fetcher,
    {
      refreshInterval: 60000 * 30,
      dedupingInterval: 60000 * 5,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const { data: sessionData, error: sessionError } = useSWR(
    "/api/session",
    fetcher,
    {
      refreshInterval: 60000 * 30,
      dedupingInterval: 60000 * 5,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  const {
    data: visitors,
    error: visitorsError,
    isLoading,
  } = useSWR("/api/visitors", fetcher, {
    refreshInterval: 60000 * 30,
    dedupingInterval: 60000 * 5,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const { data: visits, error: visitsError } = useSWR(
    "/api/visits_data",
    fetcher,
    {
      refreshInterval: 60000 * 30,
      dedupingInterval: 60000 * 5,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  // Combine all errors
  const hasError =
    bounceError ||
    newUsersError ||
    sessionError ||
    visitorsError ||
    visitsError;

  //Build stats data array from fetched data
  const statsData = [
    {
      label: "Total visitors",
      value: `${visitors?.value}K` || "---",
      trend: visitors
        ? {
            value: visitors.trend_value,
            isPositive: visitors.trend_is_positive,
          }
        : { value: 0, isPositive: true },
      icon: view,
    },
    {
      label: "Bounce rate",
      value: `${bounceRate?.value}%` || "---",
      trend: bounceRate
        ? {
            value: bounceRate.trend_value,
            isPositive: bounceRate.trend_is_positive,
          }
        : { value: 0, isPositive: true },
      icon: users,
    },
    {
      label: "Average session",
      value: `${sessionData?.value} min` || "---",
      trend: sessionData
        ? {
            value: sessionData.trend_value,
            isPositive: sessionData.trend_is_positive,
          }
        : { value: 0, isPositive: true },
      icon: star,
    },
    {
      label: "New users",
      value: `${newUsers?.value}` || "---",
      trend: newUsers
        ? {
            value: newUsers.trend_value,
            isPositive: newUsers.trend_is_positive,
          }
        : { value: 0, isPositive: true },
      icon: newsignup,
    },
  ];
  //chart data
  const dailySessions: VisitsData[] = visits;

  // Error handling
  if (hasError) {
    return (
      <div className="p-4 text-2xl text-white-500 text-center">
        Error loading dashboard data. Please try again later.
      </div>
    );
  }

  return (
    <section className="home">
      <div className="home-content">
        <header className="home-header">
          <HeaderBox
            title="Welcome back!"
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
          {isLoading ? (
            <Loader />
          ) : (
            statsData.map((stat, index) => (
              <StatsCard
                key={index}
                label={stat.label}
                value={stat.value}
                trend={stat.trend}
                icon={stat.icon}
              />
            ))
          )}
        </div>

        {!isLoading && (
          <ChartWrapper statsData={statsData} visits={dailySessions} />
        )}
      </div>
    </section>
  );
}

export default Home;
