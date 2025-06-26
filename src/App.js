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
  Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);

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
    setHasLoaded(true);
  }, []);

  useEffect(() => {
    if (!hasLoaded) return;
    console.log('Saving to localStorage:', tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks, hasLoaded]);

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
      },
    ]);
    setTaskName('');
    setTaskDesc('');
  };

  const handleToggleComplete = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <Container maxWidth="sm" sx={{ py: 8, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Card elevation={2} sx={{ borderRadius: 6, p: { xs: 2, sm: 4 }, background: '#fff', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', width: '100%', maxWidth: 480 }}>
        <CardContent>
          <Typography variant="h4" align="center" sx={{ fontWeight: 800, mb: 4, color: '#23272f', letterSpacing: 0.5 }}>
            ToDo List
          </Typography>
          <Box component="form" onSubmit={handleAddTask} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5, mb: 4 }}>
            <TextField
              label="Task name"
              variant="outlined"
              size="medium"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required
              sx={{ background: '#f7f8fa', borderRadius: 4 }}
            />
            <TextField
              label="Description"
              variant="outlined"
              size="medium"
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
              sx={{ background: '#f7f8fa', borderRadius: 4 }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{
                mt: 1,
                borderRadius: 4,
                fontWeight: 700,
                fontSize: 18,
                py: 1.2,
                background: 'linear-gradient(90deg, #6366f1 0%, #22d3ee 100%)',
                boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
                textTransform: 'none',
                letterSpacing: 0.5,
                '&:hover': {
                  background: 'linear-gradient(90deg, #4f46e5 0%, #06b6d4 100%)',
                },
              }}
              fullWidth
            >
              Add Task
            </Button>
          </Box>
          <Stack direction="row" spacing={1.5} justifyContent="center" sx={{ mb: 3 }}>
            <Chip
              label="All"
              color={filter === 'all' ? 'primary' : 'default'}
              onClick={() => setFilter('all')}
              variant={filter === 'all' ? 'filled' : 'outlined'}
              sx={{ fontWeight: 600, fontSize: 16, px: 2, borderRadius: 4 }}
            />
            <Chip
              label="Completed"
              color={filter === 'completed' ? 'primary' : 'default'}
              onClick={() => setFilter('completed')}
              variant={filter === 'completed' ? 'filled' : 'outlined'}
              sx={{ fontWeight: 600, fontSize: 16, px: 2, borderRadius: 4 }}
            />
            <Chip
              label="Incomplete"
              color={filter === 'incomplete' ? 'primary' : 'default'}
              onClick={() => setFilter('incomplete')}
              variant={filter === 'incomplete' ? 'filled' : 'outlined'}
              sx={{ fontWeight: 600, fontSize: 16, px: 2, borderRadius: 4 }}
            />
          </Stack>
          <Divider sx={{ mb: 2, borderRadius: 4 }} />
          <Stack spacing={1.5} sx={{ minHeight: 120 }}>
            {(!loading && filteredTasks.length === 0) && (
              <Typography align="center" color="text.secondary" sx={{ fontSize: 18, fontWeight: 400 }}>
                No tasks yet.
              </Typography>
            )}
            {filteredTasks.map((task, idx) => (
              <React.Fragment key={task.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', background: '#f7f8fa', borderRadius: 4, px: 2, py: 1.5, boxShadow: '0 1px 4px rgba(0,0,0,0.02)', mb: 0 }}>
                  <Tooltip title={task.completed ? 'Mark as incomplete' : 'Mark as complete'}>
                    <IconButton onClick={() => handleToggleComplete(task.id)} sx={{ color: task.completed ? '#22c55e' : '#bdbdbd', mr: 1, borderRadius: 3 }}>
                      {task.completed ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                    </IconButton>
                  </Tooltip>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" sx={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#9e9e9e' : '#23272f', fontWeight: 500, fontSize: 17 }}>
                      {task.name}
                    </Typography>
                    {task.desc && (
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.2, fontSize: 15 }}>
                        {task.desc}
                      </Typography>
                    )}
                  </Box>
                  <Tooltip title="Delete Task">
                    <IconButton edge="end" aria-label="delete" color="error" onClick={() => handleDeleteTask(task.id)} sx={{ borderRadius: 3 }}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                {idx < filteredTasks.length - 1 && <Divider sx={{ my: 0.5, mx: 1, borderRadius: 4 }} />}
              </React.Fragment>
            ))}
          </Stack>
        </CardContent>
      </Card>
      <Typography variant="body2" align="center" sx={{ color: '#888', mt: 4, fontWeight: 500, letterSpacing: 0.5 }}>
        Made by Swati Gouda
      </Typography>
    </Container>
  );
}

export default App;
