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
import { ArrowDown } from "lucide-react";
import { Search } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/nextjs";


const CUSTOMERS_DATA = [
  {
    id: 1,
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    address: "123 Main St",
    city: "New York",
    country: "United States",
    postalCode: "10001",
  },
  {
    id: 2,
    email: "jane.smith@example.com",
    firstName: "Jane",
    lastName: "Smith",
    address: "456 Oak Ave",
    city: "London",
    country: "United Kingdom",
    postalCode: "SW1A 1AA",
  },
  // Add more sample data to demonstrate pagination
  ...Array.from({ length: 18 }, (_, i) => ({
    id: i + 3,
    email: `user${i + 3}@example.com`,
    firstName: `First${i + 3}`,
    lastName: `Last${i + 3}`,
    address: `${i + 3}00 Street`,
    city: `City${i + 3}`,
    country: i % 2 === 0 ? "Canada" : "Australia",
    postalCode: `${10000 + i}`,
  })),
];

function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [countryFilter, setCountryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const uniqueCountries = Array.from(
    new Set(CUSTOMERS_DATA.map((customer) => customer.country))
  );

  const filteredData = CUSTOMERS_DATA.filter((customer) => {
    const matchesSearch = Object.values(customer).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesCountry =
      countryFilter === "all" ? true : customer.country === countryFilter;
    return matchesSearch && matchesCountry;
  });

  //calculate number of pages
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
              {paginatedData.map((customer, index) => (
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
                    {customer.postalCode}
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
