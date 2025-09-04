"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { FaFilter } from "react-icons/fa";
import { IoIosArrowDown, IoMdClose } from "react-icons/io";
import { useRouter } from "next/navigation";
import Image from "next/image";
import filter from "../../../../public/assets/icons/filter.svg";
import { slugify, unslugify } from "@/lib/slugify"; // Import both functions

interface FilterDropdownProps {
  categories: string[];
  metals: string[];
  purities: string[];
  occasions: string[];
  selectedFilters: { [key: string]: string };
}

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  categories,
  metals,
  purities,
  occasions,
  selectedFilters,
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>("jewellery");
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSection = (section: string) => {
    setExpanded((prev) => (prev === section ? null : section));
  };

  const updateFilter = (filterType: string, filterValue: string) => {
    const newFilters = { ...selectedFilters };
    const internalType = filterType === "jewellery" ? "category" : filterType;
    newFilters[internalType] = slugify(filterValue); // Use slugify here
    const segments = Object.entries(newFilters).flatMap(([type, value]) => [
      type === "category" ? "products" : type,
      value,
    ]);
    router.push(`/jewellery/${segments.join("/")}`, { scroll: false });
    setDropdownOpen(false);
  };

  const removeFilter = (type: string) => {
    const newFilters = { ...selectedFilters };
    delete newFilters[type];
    const segments = Object.entries(newFilters).flatMap(([t, value]) => [
      t === "category" ? "products" : t,
      value,
    ]);
    router.push(segments.length ? `/jewellery/${segments.join("/")}` : "/jewellery", {
      scroll: false,
    });
  };

  const clearAllFilters = () => {
    router.push("/jewellery", { scroll: false });
    setDropdownOpen(false);
  };

  const renderChips = (items: string[], type: string) => (
    <div className="d-flex flex-wrap gap-2 mt-2">
      {items.map((item) => (
        <span
          key={item}
          onClick={() => updateFilter(type, item)}
          className={`px-3 py-1 rounded-pill border ${
            selectedFilters[type === "jewellery" ? "category" : type] === slugify(item)
              ? "bg-dark text-white"
              : "bg-light text-dark"
          }`}
          style={{ cursor: "pointer", fontSize: "14px" }}
        >
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <div className="position-relative" ref={dropdownRef}>
      <button
        className="d-flex align-items-center gap-2 rounded-pill lora"
        onClick={() => setDropdownOpen((prev) => !prev)}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8f9fa")}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
        style={{
          padding: "0.4rem 1.3rem",
          fontSize: "16px",
          border: "1px solid #000",
          backgroundColor: "transparent",
          color: "#000",
          transition: "all 0.3s ease",
        }}
      >
        <Image src={filter} alt="Filter" width={18} height={18} />
        Filters
      </button>

      {dropdownOpen && (
        <div
          className="shadow p-3 bg-white position-absolute"
          style={{
            minWidth: "clamp(280px, 90vw, 350px)",
            top: "110%",
            right: 0,
            borderRadius: 12,
            zIndex: 1000,
            boxShadow: "0 0 12px rgba(0,0,0,0.15)",
          }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <strong>Filter By</strong>
            <div>
              {Object.keys(selectedFilters).length > 0 && (
                <Button
                  variant="outline-secondary"
                  size="sm"
                  className="me-2"
                  onClick={clearAllFilters}
                >
                  Clear All
                </Button>
              )}
              <IoMdClose
                onClick={() => setDropdownOpen(false)}
                style={{ cursor: "pointer", fontSize: "20px" }}
              />
            </div>
          </div>

          {Object.keys(selectedFilters).length > 0 && (
            <div className="mb-3">
              <strong>Active Filters</strong>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {Object.entries(selectedFilters).map(([type, value]) => (
                  <span
                    key={type}
                    className="px-3 py-1 rounded-pill border bg-dark text-white d-flex align-items-center"
                    style={{ fontSize: "14px" }}
                  >
                    {unslugify(value)} {/* Use unslugify here */}
                    <IoMdClose
                      onClick={() => removeFilter(type)}
                      style={{ cursor: "pointer", marginLeft: "8px" }}
                    />
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mb-3">
            <div
              className="d-flex justify-content-between align-items-center"
              onClick={() => toggleSection("jewellery")}
              style={{ cursor: "pointer" }}
            >
              <strong>Products</strong>
              <IoIosArrowDown
                style={{
                  transform: expanded === "jewellery" ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform 0.3s",
                }}
              />
            </div>
            {expanded === "jewellery" && renderChips(categories, "jewellery")}
          </div>

          <div className="mb-3">
            <div
              className="d-flex justify-content-between align-items-center"
              onClick={() => toggleSection("metal")}
              style={{ cursor: "pointer" }}
            >
              <strong>Jewellery Type</strong>
              <IoIosArrowDown
                style={{
                  transform: expanded === "metal" ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform 0.3s",
                }}
              />
            </div>
            {expanded === "metal" && renderChips(metals, "jewelleryType")}
          </div>

          <div className="mb-3">
            <div
              className="d-flex justify-content-between align-items-center"
              onClick={() => toggleSection("purity")}
              style={{ cursor: "pointer" }}
            >
              <strong>Purity</strong>
              <IoIosArrowDown
                style={{
                  transform: expanded === "purity" ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform 0.3s",
                }}
              />
            </div>
            {expanded === "purity" && renderChips([...purities].sort(), "purity")}
          </div>

          <div className="mb-3">
            <div
              className="d-flex justify-content-between align-items-center"
              onClick={() => toggleSection("occasion")}
              style={{ cursor: "pointer" }}
            >
              <strong>Occasion</strong>
              <IoIosArrowDown
                style={{
                  transform: expanded === "occasion" ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform 0.3s",
                }}
              />
            </div>
            {expanded === "occasion" && renderChips(occasions, "occasion")}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;