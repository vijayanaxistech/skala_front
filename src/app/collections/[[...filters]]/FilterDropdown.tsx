'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FaFilter } from 'react-icons/fa';
import { IoIosArrowDown, IoMdClose } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import Loader from '@/components/Loader';

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
  const [expanded, setExpanded] = useState<string | null>('jewellery');
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  // Log for debugging
  useEffect(() => {
    console.log('Selected Filters:', selectedFilters);
  }, [selectedFilters]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleSection = (section: string) => {
    setExpanded((prev) => (prev === section ? null : section));
  };

  const updateFilter = (filterType: string, filterValue: string) => {
    if (!filterValue) {
      console.warn('Empty filter value for type:', filterType);
      return;
    }
    // Create new filter object with the updated filter
    const newFilters = { ...selectedFilters };
    // Map 'jewellery' section to 'category' internally
    const internalFilterType = filterType === 'jewellery' ? 'category' : filterType;
    newFilters[internalFilterType] = filterValue;
    // Build URL with 'jewelry' instead of 'category'
    const segments = Object.entries(newFilters)
      .filter(([, value]) => value)
      .flatMap(([type, value]) => [
        encodeURIComponent(type === 'category' ? 'jewelry' : type),
        encodeURIComponent(value),
      ]);
    const url = segments.length > 0 ? `/collections/${segments.join('/')}` : '/collections';
    console.log('Navigating to:', url);
    router.push(url, { scroll: false });
    setDropdownOpen(false);
  };

  const removeFilter = (filterType: string) => {
    // Remove the specified filter
    const newFilters = { ...selectedFilters };
    delete newFilters[filterType];
    // Build URL with 'jewelry' instead of 'category'
    const segments = Object.entries(newFilters)
      .filter(([, value]) => value)
      .flatMap(([type, value]) => [
        encodeURIComponent(type === 'category' ? 'jewelry' : type),
        encodeURIComponent(value),
      ]);
    const url = segments.length > 0 ? `/collections/${segments.join('/')}` : '/collections';
    console.log('Removing filter:', filterType, 'Navigating to:', url);
    router.push(url, { scroll: false });
  };

  const clearAllFilters = () => {
    console.log('Clearing all filters, navigating to /collections');
    router.push('/collections', { scroll: false });
    setDropdownOpen(false);
  };

  const renderChips = (items: string[], filterType: string) => (
    <div className="d-flex flex-wrap gap-2 mt-2">
      {items.map((item) => (
        <span
          key={item}
          onClick={() => updateFilter(filterType, item)}
          className={`px-3 py-1 rounded-pill border ${
            selectedFilters[filterType === 'jewellery' ? 'category' : filterType] === item
              ? 'bg-dark text-white'
              : 'bg-light text-dark'
          }`}
          style={{ cursor: 'pointer', fontSize: '14px' }}
        >
          {item}
        </span>
      ))}
    </div>
  );

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;
  return (
    <div className="position-relative" ref={dropdownRef}>
      <Button
        variant="outline-dark"
        className="d-flex align-items-center gap-2 rounded-pill px-4 py-2"
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
        <FaFilter />
        Filters
        <IoIosArrowDown />
      </Button>

      {dropdownOpen && (
        <div
          className="shadow p-3 bg-white position-absolute"
          style={{
            minWidth: 'clamp(280px, 90vw, 350px)',
            top: '110%',
            right: 0,
            borderRadius: 12,
            zIndex: 1000,
            boxShadow: '0 0 12px rgba(0,0,0,0.15)',
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
                  Clear All Filters
                </Button>
              )}
              <IoMdClose
                onClick={() => setDropdownOpen(false)}
                style={{ cursor: 'pointer', fontSize: '20px' }}
              />
            </div>
          </div>

          {/* Active Filters */}
          {Object.keys(selectedFilters).length > 0 && (
            <div className="mb-3">
              <strong>Active Filters</strong>
              <div className="d-flex flex-wrap gap-2 mt-2">
                {Object.entries(selectedFilters).map(([type, value]) => (
                  <span
                    key={type}
                    className="px-3 py-1 rounded-pill border bg-dark text-white d-flex align-items-center"
                    style={{ fontSize: '14px' }}
                  >
                    {value}
                    <IoMdClose
                      onClick={() => removeFilter(type)}
                      style={{ cursor: 'pointer', marginLeft: '8px' }}
                    />
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Jewellery Type */}
          <div className="mb-3">
            <div
              className="d-flex justify-content-between align-items-center"
              onClick={() => toggleSection('jewellery')}
              style={{ cursor: 'pointer' }}
            >
              <strong>Products</strong>
              <IoIosArrowDown
                style={{
                  transform: expanded === 'jewellery' ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s',
                }}
              />
            </div>
            {expanded === 'jewellery' && renderChips(categories, 'jewellery')}
          </div>

          {/* Metal */}
          <div className="mb-3">
            <div
              className="d-flex justify-content-between align-items-center"
              onClick={() => toggleSection('metal')}
              style={{ cursor: 'pointer' }}
            >
              <strong>Jewellery Type</strong>
              <IoIosArrowDown
                style={{
                  transform: expanded === 'metal' ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s',
                }}
              />
            </div>
            {expanded === 'metal' && renderChips(metals, 'metal')}
          </div>

          {/* Purity */}
          <div className="mb-3">
            <div
              className="d-flex justify-content-between align-items-center"
              onClick={() => toggleSection('purity')}
              style={{ cursor: 'pointer' }}
            >
              <strong>Purity</strong>
              <IoIosArrowDown
                style={{
                  transform: expanded === 'purity' ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s',
                }}
              />
            </div>
            {expanded === 'purity' && renderChips([...purities].sort(), 'purity')}
          </div>

          {/* Occasion */}
          <div>
            <div
              className="d-flex justify-content-between align-items-center"
              onClick={() => toggleSection('occasion')}
              style={{ cursor: 'pointer' }}
            >
              <strong>Occasion</strong>
              <IoIosArrowDown
                style={{
                  transform: expanded === 'occasion' ? 'rotate(180deg)' : 'rotate(0)',
                  transition: 'transform 0.3s',
                }}
              />
            </div>
            {expanded === 'occasion' && renderChips(occasions, 'occasion')}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
