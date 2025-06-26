import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Fade } from '@mui/material';

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

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ width: '100%', maxWidth: 420, p: 4, borderRadius: 6, background: 'rgba(255,255,255,0.95)', boxShadow: '0 8px 32px rgba(99,102,241,0.10)', textAlign: 'center' }}>
        {!greet ? (
          <form onSubmit={handleSubmit}>
            <Typography variant="h4" sx={{ mb: 3, fontWeight: 800, letterSpacing: 1 }}>
              Enter your name
            </Typography>
            <TextField
              label="Your Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              autoFocus
              sx={{ mb: 3, borderRadius: 3, '& .MuiOutlinedInput-root': { borderRadius: '16px' }, '& .MuiOutlinedInput-notchedOutline': { borderRadius: '16px' } }}
            />
            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ borderRadius: 8, fontWeight: 600, fontSize: 16, py: 1, background: '#6366f1', textTransform: 'none', letterSpacing: 0.5 }}>
              Continue
            </Button>
          </form>
        ) : (
          <Fade in={greet} timeout={500}>
            <Typography variant="h4" sx={{ fontWeight: 900, color: '#6366f1', letterSpacing: 1 }}>
              Welcome, {name}!
            </Typography>
          </Fade>
        )}
      </Box>
    </Container>
  );
}

export default Welcome; 