'use client'
import React, { useState } from 'react';
import { Modal, Button, Box, Typography, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Checkbox, FormControlLabel } from '@mui/material';
import Image from 'next/image';
import Header from '@/components/Header';
import { acMods } from '@/Data/AssettoCorsaMods';  // Import the acMods array

const AssettoCorsaPage = () => {
  const [open, setOpen] = useState(false);
  const [selectedMod, setSelectedMod] = useState<any>(null);
  const [selectedBrands, setSelectedBrands] = useState<string[]>(['All']);  // Default to 'All' selected
  const [filterOpen, setFilterOpen] = useState(false);  // State for filter modal

  // Function to open the modal with the selected mod
  const handleOpen = (mod: any) => {
    setSelectedMod(mod);
    setOpen(true);
  };

  // Function to close the mod details modal
  const handleClose = () => {
    setOpen(false);
    setSelectedMod(null);
  };

  // Function to toggle the checkbox selection for a brand
  const handleBrandToggle = (brand: string) => {
    if (brand === 'All') {
      // If "All" is selected, reset everything to just "All"
      setSelectedBrands(['All']);
    } else {
      // If a specific brand is selected and "All" is already in the list, remove "All" before adding the specific brand
      if (selectedBrands.includes('All')) {
        setSelectedBrands([brand]);
      } else {
        setSelectedBrands(prevSelectedBrands =>
          prevSelectedBrands.includes(brand)
            ? prevSelectedBrands.filter(item => item !== brand)
            : [...prevSelectedBrands, brand]
        );
      }
    }
    
    // If no brands are selected, check "All" automatically
    if (selectedBrands.length === 0) {
      setSelectedBrands(['All']);
    }
  };

  // Function to apply the selected filter brands
  const applyFilter = () => {
    setFilterOpen(false);  // Close the filter modal
  };

  // Filter mods by the selected brands
  const filteredMods = selectedBrands.includes('All') || selectedBrands.length === 0
    ? acMods
    : acMods.filter(mod => selectedBrands.includes(mod.brand));

  // Extract unique brands from the mods list
  const brands = ['All', ...new Set(acMods.map(mod => mod.brand))];

  // Sort mods alphabetically by name
  const sortedMods = filteredMods.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      <Header />

      {/* Brand Filter Modal */}
      <Modal
        open={filterOpen}
        onClose={() => {}}
        aria-labelledby="brand-filter-modal"
        aria-describedby="brand-filter-description"
        BackdropProps={{
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',  // Dark backdrop color
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#2c2c2c',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            color: 'white',
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        >
          <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
            Select Brands to Filter
          </Typography>

          {/* Checkboxes for each brand */}
          {brands.map((brand) => (
            <FormControlLabel
              key={brand}
              control={
                <Checkbox
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandToggle(brand)}
                  name={brand}
                  color="primary"
                />
              }
              label={brand}
            />
          ))}

          {/* Apply filter button */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={applyFilter}>
              Apply Filter
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Assetto Corsa Mods Grid */}
      <h2 className="flex text-4xl font-bold mb-8 text-center justify-center p-4">Assetto Corsa Mods</h2>
      {/* Filter Button to open the brand selection modal */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setFilterOpen(true)}
          sx={{ maxWidth: 300 }}
        >
          Filter by Brand
        </Button>
      </div>
      {/* Grid of mod cards */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '16px', // Space between cards
        padding: '10px',
      }}>
        {sortedMods.map((mod, index) => (
          <div
            key={index}
            onClick={() => handleOpen(mod)}
            style={{
              background: '#333',
              padding: '20px',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              width: '250px',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            }}
            className="mod-card hover:scale-105 hover:shadow-2xl hover:outline outline-red-500"
          >
            <Image
              src={mod.image}
              alt={mod.name}
              width={200}
              height={200}
              className="rounded"
            />
            <h3 className="text-lg text-white mt-2">{mod.name}</h3>
          </div>
        ))}
      </div>

      {/* Modal for displaying mod details */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="mod-details-modal"
        aria-describedby="mod-details-description"
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          },
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: '#2c2c2c',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
            maxHeight: '90vh',
            overflowY: 'auto',
            color: 'white',
            border: '1px solid #444',
          }}
        >
          {selectedMod && (
            <>
              <Typography id="mod-details-modal" variant="h6" component="h2">
                {selectedMod.name}
              </Typography>
              <Image
                src={selectedMod.image}
                alt={selectedMod.name}
                width={300}
                height={300}
                className="rounded mb-4"
              />
              <Typography id="mod-details-description" variant="body1" paragraph>
                {selectedMod.description}
              </Typography>

              <div className='font-black'>
                <Typography variant="body2" sx={{ color: 'red' }}>
                  <strong>Author:</strong> {selectedMod.author}
                </Typography>
                <Typography variant="body2" sx={{ color: 'green', marginBottom: 2 }}>
                  <strong>Version:</strong> {selectedMod.version}
                </Typography>
              </div>

              <TableContainer sx={{ maxHeight: 300, overflowY: 'auto' }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Spec</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Value</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(selectedMod.specs).map(([key, value]) => (
                      <TableRow key={key}>
                        <TableCell sx={{ color: 'white' }}>{key.charAt(0).toUpperCase() + key.slice(1)}</TableCell>
                        <TableCell sx={{ color: 'white' }}>{value as string}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>

              <Button
                variant="contained"
                color="primary"
                href={selectedMod.url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ marginTop: 2 }}
              >
                Download Mod
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default AssettoCorsaPage;
