import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Fade } from '@mui/material';
import { keyframes } from '@mui/system';

function Welcome() {
  const [name, setName] = useState('');
  const [greet, setGreet] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    localStorage.setItem('username', name);
    setGreet(true);
    setTimeout(() => {
      navigate('/todo');
    }, 1500);
  };

  // Fade-in animation for the card
  const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(40px) scale(0.98); }
    to { opacity: 1; transform: none; }
  `;

  return (
    <Box sx={{
      minHeight: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)',
      overflow: 'auto',
      position: 'relative',
    }}>
      {/* Glowing effect behind the card */}
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 420,
        height: 420,
        borderRadius: '50%',
        background: 'radial-gradient(circle, #a5b4fc55 0%, #f0fdfa00 80%)',
        filter: 'blur(32px)',
        zIndex: 0,
        pointerEvents: 'none',
      }} />
      <Box sx={{
        width: '100%',
        maxWidth: 440,
        p: { xs: 2, sm: 5 },
        borderRadius: 6,
        background: 'rgba(255,255,255,0.80)',
        boxShadow: '0 8px 32px 0 rgba(99,102,241,0.18)',
        backdropFilter: 'blur(8px)',
        textAlign: 'center',
        border: '1.5px solid #e0e7ff',
        position: 'relative',
        zIndex: 1,
        animation: `${fadeIn} 0.8s cubic-bezier(.4,2,.6,1)`,
      }}>
        {!greet ? (
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 900,
                  letterSpacing: 1.5,
                  fontFamily: 'Montserrat, sans-serif',
                  background: 'linear-gradient(90deg, #6366f1 0%, #22d3ee 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textFillColor: 'transparent',
                  fontSize: { xs: 28, sm: 36 },
                  mb: 1,
                  textShadow: '0 2px 8px #6366f122',
                }}
              >
                Enter your name
              </Typography>
              <Box sx={{
                width: 60,
                height: 5,
                mx: 'auto',
                borderRadius: 2,
                background: 'linear-gradient(90deg, #6366f1 0%, #22d3ee 100%)',
                opacity: 0.7,
              }} />
            </Box>
            <TextField
              label="Your Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              autoFocus
              sx={{ mb: 3, borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: '16px' }, '& .MuiOutlinedInput-notchedOutline': { borderRadius: '16px' } }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ borderRadius: 8, fontWeight: 700, fontSize: 18, py: 1.2, background: 'linear-gradient(90deg, #6366f1 0%, #22d3ee 100%)', textTransform: 'none', letterSpacing: 0.7, boxShadow: '0 2px 8px #6366f122', mt: 1 }}>
              Continue
            </Button>
          </form>
        ) : (
          <>
            <Fade in={greet} timeout={500}>
              <Typography variant="h3" sx={{ fontWeight: 900, color: '#22d3ee', letterSpacing: 1, mt: 4, mb: 2, fontFamily: 'Montserrat, sans-serif', textShadow: '0 2px 12px #22d3ee33' }}>
                Welcome, {name}!
              </Typography>
            </Fade>
            <Box sx={{
              background: 'linear-gradient(90deg, #e0e7ff 0%, #f0fdfa 100%)',
              borderRadius: 4,
              px: 3,
              py: 2,
              mt: 2,
              boxShadow: '0 2px 8px #6366f122',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 20,
              fontWeight: 700,
              color: '#6366f1',
              fontFamily: 'Montserrat, cursive',
              letterSpacing: 0.5,
            }}>
              "A journey of a thousand miles begins with a single step."
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}

export default Welcome; 