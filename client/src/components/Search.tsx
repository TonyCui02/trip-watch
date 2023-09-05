import { faTrain, faBus, faFerry } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select, { components, MultiValue } from "react-select";
import { Route, RouteType } from "../types/Route";
import { useEffect, useState } from "react";

const { Option } = components;

const getIcon = (routeType: number) => {
  switch (routeType) {
    case RouteType.BUS:
      return <FontAwesomeIcon icon={faBus} />;
    case RouteType.TRAIN:
      return <FontAwesomeIcon icon={faTrain} />;
    case RouteType.FERRY:
      return <FontAwesomeIcon icon={faFerry} />;
    default:
      return <FontAwesomeIcon icon={faBus} />;
  }
};

const IconOption = (props: any) => (
  <Option {...props}>
    <span className="mr-2">{getIcon(props.data.routeType)}</span>
    {props.data.routeShortName}
  </Option>
);

interface SearchProps {
  routes: Route[];
  setSelectedRoutes: (routes: Route[]) => void;
}

const Search = (props: SearchProps) => {
  const customFilter = (option: any, searchText: string) => {
    if (
      option.data.routeShortName
        .toLowerCase()
        .includes(searchText.toLowerCase()) ||
      option.data.routeLongName.toLowerCase().includes(searchText.toLowerCase())
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleChange = (options: any) => {
    console.log("selected Routes changed!")
    props.setSelectedRoutes(options);
  };

  return (
    <div className="absolute top-3 left-3 z-50 w-2/3 sm:w-1/2 md:w-96 ">
      <Select
        placeholder="Search Routes"
        options={props.routes}
        components={{ Option: IconOption }}
        isMulti
        filterOption={customFilter}
        getOptionLabel={(option) => option.routeShortName}
        getOptionValue={(option) => option.routeShortName}
        onChange={handleChange}
      />
    </div>
  );
};

export default Search;
