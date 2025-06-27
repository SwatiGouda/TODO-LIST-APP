import React, { useState, useEffect } from 'react';
import './App.css';
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  Box,
  Chip,
  Divider,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './Welcome';
import confetti from 'canvas-confetti';

function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [firstLoad, setFirstLoad] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    console.log('Loaded from localStorage:', stored);
    if (stored) {
      const parsed = JSON.parse(stored);
      console.log('Parsed tasks from localStorage:', parsed);
      setTasks(parsed);
    } else {
      console.log('No tasks found in localStorage.');
    }
    setLoading(false);
    setFirstLoad(false);
  }, []);

  useEffect(() => {
    if (firstLoad) return;
    console.log('Saving to localStorage:', tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks, firstLoad]);

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskName.trim()) return;
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        name: taskName,
        desc: taskDesc,
        completed: false,
        createdAt: new Date().toISOString(),
        completedAt: null,
      },
    ]);
    setTaskName('');
    setTaskDesc('');
  };

  const handleToggleComplete = (id) => {
    setTasks((prevTasks) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          if (!task.completed) {
            confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 },
              zIndex: 9999,
            });
            return { ...task, completed: true, completedAt: new Date().toISOString() };
          } else {
            return { ...task, completed: false, completedAt: null };
          }
        }
        return task;
      });
    });
  };

  const handleDeleteTask = (id) => {
    const task = tasks.find((t) => t.id === id);
    setTaskToDelete(task);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      setTasks(tasks.filter((task) => task.id !== taskToDelete.id));
    }
    setDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  const handleCancelDelete = () => {
    setDeleteDialogOpen(false);
    setTaskToDelete(null);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  // Task counts
  const totalAll = tasks.length;
  const totalCompleted = tasks.filter((t) => t.completed).length;
  const totalIncomplete = tasks.filter((t) => !t.completed).length;

  // Helper to format time
  const formatTime = (isoString) => {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <Container maxWidth="sm" sx={{
      py: 8,
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f0fdfa 100%)',
      borderRadius: 6,
      boxShadow: '0 8px 32px rgba(99,102,241,0.10)',
    }}>
      <Card elevation={4} sx={{
        borderRadius: 8,
        p: { xs: 2, sm: 5 },
        background: 'rgba(255,255,255,0.95)',
        boxShadow: '0 8px 32px rgba(99,102,241,0.10)',
        width: '100%',
        maxWidth: 520,
        backdropFilter: 'blur(2px)',
      }}>
        <CardContent>
          <Typography variant="h3" align="center" sx={{ fontWeight: 900, mb: 2, color: '#23272f', letterSpacing: 1, fontFamily: 'Montserrat, sans-serif' }}>
            ToDo List
          </Typography>
          <Box component="form" onSubmit={handleAddTask} sx={{ display: 'flex', flexDirection: 'column', gap: 3, mb: 5 }}>
            <TextField
              label="Task name"
              variant="outlined"
              size="medium"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
              sx={{
                background: '#f7f8fa',
                fontWeight: 600,
                boxShadow: '0 2px 8px rgba(99,102,241,0.07)',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '16px',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderRadius: '16px',
                },
              }}
              InputProps={{ style: { fontSize: 18, fontWeight: 600 } }}
            />
            <TextField
              label="Description"
              variant="outlined"
              size="medium"
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
              multiline
              minRows={3}
              maxRows={8}
              sx={{
                background: '#f7f8fa',
                resize: 'vertical',
                fontSize: 16,
                boxShadow: '0 2px 8px rgba(99,102,241,0.07)',
                '& .MuiOutlinedInput-root': {
                  borderRadius: '16px',
                },
                '& .MuiOutlinedInput-notchedOutline': {
                  borderRadius: '16px',
                },
              }}
              InputProps={{ style: { fontSize: 16, resize: 'vertical' } }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{
                mt: 1,
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 16,
                py: 1,
                px: 0,
                background: '#6366f1',
                boxShadow: '0 2px 8px 0 rgba(99,102,241,0.10)',
                textTransform: 'none',
                letterSpacing: 0.5,
                transition: 'background 0.2s',
                '&:hover': {
                  background: '#4f46e5',
                  boxShadow: '0 4px 16px 0 rgba(99,102,241,0.14)',
                },
              }}
              fullWidth
            >
              Add Task
            </Button>
          </Box>
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ mb: 4 }}>
            <Chip
              label={`All (${totalAll})`}
              color={filter === 'all' ? 'primary' : 'default'}
              onClick={() => setFilter('all')}
              variant={filter === 'all' ? 'filled' : 'outlined'}
              sx={{ fontWeight: 700, fontSize: 17, px: 2.5, borderRadius: 4, boxShadow: filter === 'all' ? '0 2px 8px #6366f133' : 'none' }}
            />
            <Chip
              label={`Completed (${totalCompleted})`}
              color={filter === 'completed' ? 'primary' : 'default'}
              onClick={() => setFilter('completed')}
              variant={filter === 'completed' ? 'filled' : 'outlined'}
              sx={{ fontWeight: 700, fontSize: 17, px: 2.5, borderRadius: 4, boxShadow: filter === 'completed' ? '0 2px 8px #22d3ee33' : 'none' }}
            />
            <Chip
              label={`Incomplete (${totalIncomplete})`}
              color={filter === 'incomplete' ? 'primary' : 'default'}
              onClick={() => setFilter('incomplete')}
              variant={filter === 'incomplete' ? 'filled' : 'outlined'}
              sx={{ fontWeight: 700, fontSize: 17, px: 2.5, borderRadius: 4, boxShadow: filter === 'incomplete' ? '0 2px 8px #f59e4233' : 'none' }}
            />
          </Stack>
          <Divider sx={{ mb: 2, borderRadius: 4 }} />
          <Stack spacing={2} sx={{ minHeight: 120 }}>
            {(!loading && filteredTasks.length === 0) && (
              <Typography align="center" color="text.secondary" sx={{ fontSize: 19, fontWeight: 500, opacity: 0.7 }}>
                No tasks yet.
              </Typography>
            )}
            {filteredTasks.map((task, idx) => (
              <React.Fragment key={task.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', background: '#f7f8fa', borderRadius: 4, px: 2, py: 1.8, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', mb: 0 }}>
                  <Tooltip title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}>
                    <IconButton onClick={() => handleToggleComplete(task.id)} sx={{ color: task.completed ? '#22c55e' : '#bdbdbd', mr: 1, borderRadius: 3, fontSize: 28 }}>
                      {task.completed ? <CheckCircleIcon sx={{ fontSize: 28 }} /> : <RadioButtonUncheckedIcon sx={{ fontSize: 28 }} />}
                    </IconButton>
                  </Tooltip>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#9e9e9e' : '#23272f', fontWeight: 600, fontSize: 18 }}>
                      {task.name}
                    </Typography>
                    {task.desc && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, fontSize: 16, opacity: 0.85 }}>
                        {task.desc}
                      </Typography>
                    )}
                    <Stack direction="row" spacing={2} sx={{ mt: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        Added: {formatTime(task.createdAt)}
                      </Typography>
                      {task.completed && task.completedAt && (
                        <Typography variant="caption" color="success.main">
                          Completed: {formatTime(task.completedAt)}
                        </Typography>
                      )}
                    </Stack>
                  </Box>
                  <Tooltip title="Delete Task">
                    <IconButton edge="end" aria-label="delete" color="error" onClick={() => handleDeleteTask(task.id)} sx={{ borderRadius: 3, fontSize: 24 }}>
                      <DeleteIcon sx={{ fontSize: 24 }} />
                    </IconButton>
                  </Tooltip>
                </Box>
                {idx < filteredTasks.length - 1 && <Divider sx={{ my: 0.7, mx: 1, borderRadius: 4 }} />}
              </React.Fragment>
            ))}
          </Stack>
        </CardContent>
      </Card>
      <Typography variant="body2" align="center" sx={{ color: '#888', mt: 5, fontWeight: 600, letterSpacing: 0.7, fontFamily: 'Montserrat, sans-serif', fontSize: 15 }}>
        Made by Swati Gouda
      </Typography>
      {/* Delete Confirmation Dialog */}
      <Dialog 
        open={deleteDialogOpen} 
        onClose={handleCancelDelete}
        maxWidth="xs"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxWidth: 320,
            mx: 'auto',
            border: '2px solid #f59e42',
            boxShadow: '0 4px 24px #f59e4233',
            p: 1.5,
          }
        }}
      >
        <DialogTitle sx={{
          fontWeight: 900,
          color: '#e11d48',
          fontFamily: 'Montserrat, sans-serif',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          fontSize: 18,
          px: 1,
          pt: 1.5,
          pb: 0.5,
        }}>
          <WarningAmberRoundedIcon sx={{ color: '#f59e42', fontSize: 24, mr: 1 }} />
          Delete Task
        </DialogTitle>
        <DialogContent sx={{ pb: 0.5, pt: 0.5, px: 1 }}>
          <Typography sx={{ fontWeight: 600, fontSize: 15, color: '#23272f', textAlign: 'center' }}>
            Are you sure you want to delete
            <span style={{ color: '#6366f1', fontWeight: 800 }}> "{taskToDelete?.name}"</span>?
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 1, pt: 0, gap: 1 }}>
          <Button
            onClick={handleCancelDelete}
            variant="outlined"
            color="primary"
            sx={{ fontWeight: 700, borderRadius: 2, px: 2, fontSize: 14, minWidth: 80 }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            sx={{ fontWeight: 700, borderRadius: 2, px: 2, fontSize: 14, minWidth: 80, boxShadow: '0 2px 8px #e11d4822' }}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/todo" element={<TodoList />} />
      </Routes>
    </Router>
  );
}

export default App;
