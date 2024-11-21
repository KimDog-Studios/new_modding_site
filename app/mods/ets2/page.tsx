'use client';

import React, { useState } from 'react';
import { Modal, Button, Box, Typography, IconButton } from '@mui/material';
import Image from 'next/image';
import Header from '@/components/Header';
import { acMods } from '@/Data/ETS2Mods';  // Import the acMods array
import { ArrowForward, ArrowBack } from '@mui/icons-material';  // Import icons for arrows

const ETS2Page = () => {
  const [open, setOpen] = useState(false);
  const [selectedMod, setSelectedMod] = useState<any>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);  // Track the current image index

  // Function to open the modal with the selected mod
  const handleOpen = (mod: any) => {
    setSelectedMod(mod);
    setCurrentImageIndex(0);  // Reset to first image when opening the modal
    setOpen(true);
  };

  // Function to close the mod details modal
  const handleClose = () => {
    setOpen(false);
    setSelectedMod(null);
  };

  // Function to go to the next image
  const handleNextImage = () => {
    if (selectedMod && selectedMod.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex < selectedMod.images.length - 1 ? prevIndex + 1 : prevIndex
      );
    }
  };

  // Function to go to the previous image
  const handlePrevImage = () => {
    if (selectedMod && selectedMod.images) {
      setCurrentImageIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    }
  };

  return (
    <div>
      <Header />

      {/* Assetto Corsa Mods Grid */}
      <h2 className="flex text-4xl font-bold mb-8 text-center justify-center p-4">Euro Truck Simulator 2 Mods</h2>

      {/* Grid of mod cards */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '16px', // Space between cards
        padding: '10px',
      }}>
        {acMods.map((mod, index) => (
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
            className="mod-card hover:scale-105 hover:shadow-2xl hover:outline outline-blue-500"
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
            width: '80%', // Adjust the width of the modal
            maxWidth: 800, // Limit the maximum width
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
          {selectedMod && selectedMod.images && (
            <>
              <Typography id="mod-details-modal" variant="h6" component="h2">
                {selectedMod.name}
              </Typography>

              {/* Image carousel with arrows */}
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                <IconButton onClick={handlePrevImage} disabled={currentImageIndex === 0}>
                  <ArrowBack sx={{ color: 'white' }} />
                </IconButton>

                <Image
                  src={selectedMod.images[currentImageIndex]} // Use images array for carousel
                  alt={`Image ${currentImageIndex + 1}`}
                  width={500}
                  height={300}
                  className="rounded mb-2"
                />

                <IconButton onClick={handleNextImage} disabled={currentImageIndex === selectedMod.images.length - 1}>
                  <ArrowForward sx={{ color: 'white' }} />
                </IconButton>
              </Box>

              {/* Image index display */}
              <Typography variant="body2" sx={{ textAlign: 'center', color: 'white' }}>
                {currentImageIndex + 1} of {selectedMod.images.length}
              </Typography>

              <div className='font-black' style={{ marginTop: '20px' }}>
                {/* Author and Version Information */}
                <Typography variant="body2" sx={{ color: 'red' }}>
                  <strong>Author:</strong> {selectedMod.author}
                </Typography>
                <Typography variant="body2" sx={{ color: 'green', marginBottom: 2 }}>
                  <strong>Version:</strong> {selectedMod.version}
                </Typography>

                {/* Styled Description */}
                <Box
                  sx={{
                    backgroundColor: '#1f1f1f', // Darker background for the description box
                    padding: '16px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
                    marginTop: 2,
                    color: 'white',
                  }}
                >
                  <Typography variant="body1" sx={{ fontSize: '1rem', lineHeight: 1.6 }}>
                    <strong>Description:</strong> {selectedMod.description}
                  </Typography>
                </Box>
              </div>

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

export default ETS2Page;
