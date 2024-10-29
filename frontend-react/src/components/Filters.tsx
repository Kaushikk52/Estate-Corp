import React, { useEffect, useState } from "react";
import {
  MapPin,
  IndianRupee,
  BedDouble,
  Search,
  X,
  Filter,
  RefreshCw,
  Scaling,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { clearFilters, setFilters } from "@/features/Filters/filterSlice";
import { Input } from "./ui/input";
import { Link, useLocation } from "react-router-dom";

interface FilterProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  locations: string[];
  bedrooms: number[];
  minPrice: string;
  maxPrice: string;
  amtUnit: string;
  minCarpetArea: string;
  maxCarpetArea: string;
  areaUnit: string;
}

interface LocationGroup {
  label: string;
  options: string[];
}

export default function Filters({ onFilterChange }: FilterProps) {
  const dispatch = useDispatch();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const filters = useSelector((state: any) => state.filters.filters);
  const [locations, setLocations] = useState<string[]>([]);
  const [bedrooms, setBedrooms] = useState<number[]>([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [amtUnit, setAmtUnit] = useState("K");
  const [minCarpetArea, setMinCarpetArea] = useState("");
  const [maxCarpetArea, setMaxCarpetArea] = useState("");
  const [areaUnit, setAreaUnit] = useState("sqft");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const bedroomOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const priceOptions = [
    "1",
    "5",
    "10",
    "20",
    "30",
    "40",
    "50",
    "60",
    "70",
    "80",
    "90",
    "100",
  ];
  const carpetAreaOptions = [
    "500",
    "1000",
    "1500",
    "2000",
    "2500",
    "3000",
    "3500",
    "4000",
    "4500",
    "5000",
    "5500",
    "6000",
    "7000",
    "8000",
    "9000",
    "10000",
  ];
  const amtUnitOptions = ["K", "L", "Cr"];
  const carpetAreaUnitOptions = ["sqft", "sqm", "sqyd", "acre"];
  const locationGroups: LocationGroup[] = [
    {
      label: "Bhayandar",
      options: ["Bhayandar East", "Bhayandar West"],
    },
    {
      label: "Mira Road",
      options: ["Mira Road East"],
    },
    {
      label: "Dahisar",
      options: ["Dahisar East", "Dahisar West"],
    },
    {
      label: "Borivali",
      options: ["Borivali East", "Borivali West"],
    },
    {
      label: "Malad",
      options: ["Malad East", "Malad West"],
    },
    {
      label: "Goregaon",
      options: ["Goregaon East", "Goregaon West"],
    },
  ];

  const [filteredGroups, setFilteredGroups] = useState<LocationGroup[]>([]);

  useEffect(() => {
    setLocations(filters.locations);
    setBedrooms(filters.bedrooms);
    setMinPrice(filters.minPrice);
    setMaxPrice(filters.maxPrice);
    setAmtUnit(filters.amtUnit);
    setMaxCarpetArea(filters.maxCarpetArea);
    setMinCarpetArea(filters.minCarpetArea);
    setAreaUnit(filters.areaUnit);
  }, [filters]);

  useEffect(() => {
    const filtered = locationGroups
      .map((group) => ({
        ...group,
        options: group.options.filter((option) =>
          option.toLowerCase().includes(searchTerm.toLowerCase())
        ),
      }))
      .filter((group) => group.options.length > 0);
    setFilteredGroups(filtered);
  }, [searchTerm]);

  const handleAddLocation = (location: string) => {
    if (!locations.includes(location)) {
      setLocations([...locations, location]);
    }
  };

  const handleRemoveLocation = (locationToRemove: string) => {
    setLocations(locations.filter((location) => location !== locationToRemove));
  };

  const handleBedroomToggle = (option: number) => {
    if (bedrooms.includes(option)) {
      setBedrooms(bedrooms.filter((bed) => bed !== option));
    } else {
      setBedrooms([...bedrooms, option]);
    }
  };

  const handlePriceSelect = (value: string, isMin: boolean) => {
    if (isMin) {
      setMinPrice(value);
    } else {
      setMaxPrice(value);
    }
  };

  const handleCarpetAreaSelect = (value: string, isMin: boolean) => {
    if (isMin) {
      setMinCarpetArea(value);
    } else {
      setMaxCarpetArea(value);
    }
  };

  const applyFilters = () => {
    dispatch(
      setFilters({
        locations,
        bedrooms,
        minPrice,
        maxPrice,
        amtUnit,
        minCarpetArea,
        maxCarpetArea,
        areaUnit,
      })
    );
    onFilterChange(filters);
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="max-w-6xl mx-auto mt-5 ">
      <Card className="mt-10">
        <CardContent className="p-4">
          <div className="md:hidden flex items-center justify-between gap-2 sm:mb-0">
            <Button
              variant="ghost"
              className="w-3/4 mb-2 border-blue-500 text-gray-500 hover:bg-blue-100"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="h-5 w-5 mr-2" />
              {isFilterOpen ? "Hide Filters" : "Show Filters"}
            </Button>

            {location.pathname === "/" ? (
              <Link to={"/listings/all/all"}>
                <Button onClick={applyFilters} className="w-1/7 bg-blue-500">
                  <Search className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Button onClick={applyFilters} className="w-1/7 bg-blue-500">
                <Search className="h-5 w-5" />
              </Button>
            )}

            <Button
              variant="ghost"
              className="border-blue-500 text-gray-500 hover:bg-gray-200 w-1/7"
              onClick={handleClearFilters}
            >
              <RefreshCw className="h-5 w-5" />
            </Button>
          </div>
          <div
            className={`md:flex md:items-center md:space-x-4 ${
              isFilterOpen ? "" : "hidden md:flex"
            }`}
          >
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="border-blue-500 text-gray-500 hover:bg-blue-100 w-full md:w-auto flex-1 min-w-0 mb-4 md:mb-0"
                >
                  <MapPin className="h-5 w-5 mr-2" />
                  {locations.length > 0
                    ? `${locations.length} selected`
                    : "Location"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 max-h-[400px] overflow-y-auto">
                <div className="p-2">
                  <Input
                    placeholder="Search locations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="mb-2"
                  />
                </div>
                <DropdownMenuSeparator />
                {filteredGroups.map((group) => (
                  <React.Fragment key={group.label}>
                    <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
                    {group.options.map((option) => (
                      <DropdownMenuItem
                        key={option}
                        onSelect={(event) => {
                          event.preventDefault();
                          if (locations.includes(option)) {
                            handleRemoveLocation(option);
                          } else {
                            handleAddLocation(option);
                          }
                        }}
                        className={`flex justify-between items-center ${
                          locations.includes(option)
                            ? "bg-blue-100 text-blue-800"
                            : ""
                        }`}
                      >
                        {option}
                        {locations.includes(option) && (
                          <X className="h-4 w-4 text-blue-800" />
                        )}
                      </DropdownMenuItem>
                    ))}
                  </React.Fragment>
                ))}
                {filteredGroups.length === 0 && (
                  <DropdownMenuItem disabled>
                    No locations found
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="border-blue-500 text-gray-500 hover:bg-blue-100 w-full md:w-auto flex-1 min-w-0 mb-4 md:mb-0"
                >
                  <BedDouble className="h-5 w-5 mr-2" />
                  {bedrooms.length > 0
                    ? `${bedrooms.join(", ")} BHK`
                    : "Bedrooms"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 max-h-[300px] overflow-y-auto custom-scrollbar">
                {bedroomOptions.map((option) => (
                  <DropdownMenuItem
                    key={option}
                    onSelect={() => handleBedroomToggle(option)}
                    className="dropdown-menu-item"
                  >
                    {option} BHK
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="border-blue-500 text-gray-500 hover:bg-blue-100 w-full md:w-auto flex-1 min-w-0 mb-4 md:mb-0"
                >
                  <IndianRupee className="h-5 w-5 mr-2" />
                  {minPrice && maxPrice
                    ? `${minPrice} - ${maxPrice} ${amtUnit}`
                    : minPrice
                    ? `${minPrice}+ ${amtUnit}`
                    : "Price"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 max-h-[300px] overflow-y-auto custom-scrollbar">
                <DropdownMenuLabel>Amount Unit</DropdownMenuLabel>
                <div className="flex justify-around mb-2 p-2">
                  {amtUnitOptions.map((unit) => (
                    <Button
                      key={unit}
                      variant={amtUnit === unit ? "default" : "outline"}
                      className={
                        amtUnit === unit
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "border-blue-500 text-blue-500 hover:bg-blue-100 hover:text-blue-800"
                      }
                      size="sm"
                      onClick={() => setAmtUnit(unit)}
                    >
                      {unit}
                    </Button>
                  ))}
                </div>
                <DropdownMenuSeparator />
                {!minPrice && (
                  <>
                    <DropdownMenuLabel>Min Price</DropdownMenuLabel>
                    {priceOptions.map((option) => (
                      <DropdownMenuItem
                        key={option}
                        onSelect={() => handlePriceSelect(option, true)}
                        className="dropdown-menu-item"
                      >
                        {parseInt(option).toLocaleString()} {amtUnit}
                      </DropdownMenuItem>
                    ))}
                  </>
                )}
                <DropdownMenuSeparator />
                {minPrice && (
                  <>
                    <DropdownMenuLabel>Max Price</DropdownMenuLabel>
                    {priceOptions
                      .filter(
                        (option) =>
                          !minPrice || parseInt(option) > parseInt(minPrice)
                      )
                      .map((option) => (
                        <DropdownMenuItem
                          key={option}
                          onSelect={() => handlePriceSelect(option, false)}
                          className="dropdown-menu-item"
                        >
                          {parseInt(option).toLocaleString()} {amtUnit}
                        </DropdownMenuItem>
                      ))}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="border-blue-500 text-gray-500 hover:bg-blue-100 w-full md:w-auto flex-1 min-w-0 mb-4 md:mb-0"
                >
                  <Scaling className="h-5 w-5 mr-2" />
                  {minCarpetArea && maxCarpetArea
                    ? `${minCarpetArea} - ${maxCarpetArea} ${areaUnit}`
                    : minCarpetArea
                    ? `${minCarpetArea}+ ${areaUnit}`
                    : "Area"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-64 max-h-[300px] overflow-y-auto custom-scrollbar">
                <DropdownMenuLabel>Area Unit</DropdownMenuLabel>
                <div className="flex flex-nowrap justify-evenly mb-2 p-2">
                  {carpetAreaUnitOptions.map((unit) => (
                    <Button
                      key={unit}
                      variant={areaUnit === unit ? "default" : "outline"}
                      className={
                        areaUnit === unit
                          ? "bg-blue-500 text-white hover:bg-blue-600"
                          : "border-blue-500 text-blue-500 hover:text-blue-800 hover:bg-blue-100"
                      }
                      size="sm"
                      onClick={() => setAreaUnit(unit)}
                    >
                      {unit}
                    </Button>
                  ))}
                </div>
                <DropdownMenuSeparator />
                {!minCarpetArea && (
                  <>
                    <DropdownMenuLabel>Min Area</DropdownMenuLabel>
                    {carpetAreaOptions.map((option) => (
                      <DropdownMenuItem
                        key={option}
                        onSelect={() => handleCarpetAreaSelect(option, true)}
                        className="dropdown-menu-item"
                      >
                        {option} {areaUnit}
                      </DropdownMenuItem>
                    ))}
                  </>
                )}
                <DropdownMenuSeparator />
                {minCarpetArea && (
                  <>
                    <DropdownMenuLabel>Max Area</DropdownMenuLabel>
                    {carpetAreaOptions
                      .filter(
                        (option) =>
                          !minCarpetArea ||
                          parseInt(option) > parseInt(minCarpetArea)
                      )
                      .map((option) => (
                        <DropdownMenuItem
                          key={option}
                          onSelect={() => handleCarpetAreaSelect(option, false)}
                          className="dropdown-menu-item"
                        >
                          {option} {areaUnit}
                        </DropdownMenuItem>
                      ))}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="hidden md:flex space-x-2">
              {location.pathname == "/" ? (
                <Link to={`/listings/all/all`}>
                  <Button
                    onClick={applyFilters}
                    className="bg-blue-500 text-white hover:bg-blue-600"
                  >
                    <Search className="h-5 w-5" />
                    Search
                  </Button>
                </Link>
              ) : (
                <Button
                  onClick={applyFilters}
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  <Search className="h-5 w-5" />
                  Search
                </Button>
              )}

              <Button
                variant="outline"
                className="text-gray-500 hover:bg-gray-200"
                onClick={handleClearFilters}
              >
                <RefreshCw className="h-5 w-5" />
                Clear
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
