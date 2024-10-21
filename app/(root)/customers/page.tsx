"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ArrowDown, Search } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";
import useSWR from "swr";
import { User } from "@/types";
import Loader from "@/components/Loader";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
};


function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const { data, error, isLoading } = useSWR(`/api/customers`, fetcher, {
    refreshInterval: 60000 * 30,
    dedupingInterval: 60000 * 5,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // Error handling
  if (error) {
    return (
      <div className="p-4 text-2xl text-white-500 text-center">
        Error loading dashboard data. Please try again later.
      </div>
    );
  }

  if (isLoading || !data)
    return (
      <div className="flex flex-row justify-center p-12 item-center w-full">
        <Loader />
      </div>
    );

  const uniqueCountries: string[] = Array.from(
    new Set(data.map((customer: User) => customer.country))
  );

  const filteredData = data.filter((customer: User) => {
    const matchesSearch = Object.values(customer).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesCountry =
      countryFilter === "all" ? true : customer.country === countryFilter;
    return matchesSearch && matchesCountry;
  });

  // Calculate number of pages
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <Card className="w-full border-none">
      <div className="flex flex-row justify-between">
        <CardHeader>
          <CardTitle className="text-white">Customers</CardTitle>
        </CardHeader>
        <div className="flex items-center justify-around gap-2 md:gap-4 md:w-[30%]">
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
      </div>
      <CardContent>
        <div className="flex gap-4 mb-4">
          <div className="relative flex-1 w-[250px] outline-none">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground text-blue-500" />
            <Input
              placeholder="Search customers..."
              className="pl-8 outline-none font-semibold bg-blue-100 text-blue-500 border-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={countryFilter} onValueChange={setCountryFilter}>
            <SelectTrigger className="w-[180px] border-none bg-blue-100 text-white outline-none">
              <SelectValue placeholder="Filter by country" />
            </SelectTrigger>
            <SelectContent className="bg-blue-100 text-white border-none">
              <SelectItem
                value="all"
                className="hover:bg-purple-500 hover:text-white transition-colors duration-200 text-blue-500 font-semibold"
              >
                All Countries
              </SelectItem>
              {uniqueCountries.map((country) => (
                <SelectItem
                  key={country}
                  value={country}
                  className="hover:bg-purple-500 hover:text-white transition-colors duration-200 text-blue-500 font-semibold"
                >
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Table>
            <TableHeader className="border-none">
              <TableRow className="bg-[#0B1739] border-blue-500">
                <TableHead className="text-white text-md font-bold border-none">
                  Name
                </TableHead>
                <TableHead className="text-white text-md font-bold border-none">
                  Email
                </TableHead>
                <TableHead className="text-white text-md font-bold border-none">
                  Address
                </TableHead>
                <TableHead className="text-white text-md font-bold border-none">
                  City
                </TableHead>
                <TableHead className="text-white text-md font-bold border-none">
                  Country
                </TableHead>
                <TableHead className="text-white text-md font-bold border-none">
                  Postal Code
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedData.map((customer: User, index: number) => (
                <TableRow
                  key={customer.id}
                  className={
                    index % 2 === 0
                      ? "bg-[#0B1739] border-none"
                      : "bg-[#081028] border-none"
                  }
                >
                  <TableCell className="text-white border-none font-semibold">{`${customer.firstName} ${customer.lastName}`}</TableCell>
                  <TableCell className="text-white border-none font-semibold">
                    {customer.email}
                  </TableCell>
                  <TableCell className="text-white border-none font-semibold">
                    {customer.address}
                  </TableCell>
                  <TableCell className="text-white border-none font-semibold">
                    {customer.city}
                  </TableCell>
                  <TableCell className="text-white border-none font-semibold">
                    {customer.country}
                  </TableCell>
                  <TableCell className="text-white border-none font-semibold">
                    {customer.postalCode ? customer.postalCode : "none"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-blue-500 text-muted-foreground">
            Showing {startIndex + 1} to{" "}
            {Math.min(startIndex + itemsPerPage, filteredData.length)} of{" "}
            {filteredData.length} entries
          </div>

          {/* Pagination Button Controls */}
          <div className="flex space-x-2 text-blue-500 font-semibold">
            <Button
              variant="outline"
              className="text-blue-500 font-semibold bg-blue-100 border-none"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {/* Pagination Numbers */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                className={`text-blue-500 font-semibold bg-blue-100 border-none px-3 py-1 ${
                  currentPage === page
                    ? "bg-purple-500 text-white"
                    : "hover:bg-purple-500 hover:text-white transition-colors"
                }`}
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Button>
            ))}
            <Button
              className="text-blue-500 font-semibold bg-blue-100 border-none"
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Customers;
