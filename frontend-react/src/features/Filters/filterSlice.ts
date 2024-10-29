// src/features/filtersSlice.ts
import Project from "@/Models/Project";
import Property from "@/Models/Property";
import { createSlice } from "@reduxjs/toolkit";

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

interface FiltersSliceState {
  filters: FilterState;
  allProperties:Property[],
  allProjects:Project[],
  filteredProjects: Project[];
  filteredProperties: Property[];
}

const initialState: FiltersSliceState = {
    filters: {
        locations: [],
        bedrooms: [],
        minPrice: "",
        maxPrice: "",
        amtUnit: "K",
        minCarpetArea: "",
        maxCarpetArea: "",
        areaUnit: "sqft",
    },
    filteredProjects: [],
    filteredProperties: [],
    allProperties: [],
    allProjects: []
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    setAllProjects: (state, action) => {
        state.allProjects = action.payload;
    },
    setAllProperties: (state, action) => {
        state.allProperties = action.payload;
    },
    setFilteredProjects: (state, action) => {
      state.filteredProjects = action.payload;
    },
    setFilteredProperties: (state, action) => {
        state.filteredProperties = action.payload;
      },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.filteredProperties = [];
      state.filteredProjects = [];
    },
  },
});

export const { setFilters, setFilteredProjects, setFilteredProperties, setAllProjects, setAllProperties, clearFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
