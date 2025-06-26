import React, { useState, useEffect } from 'react';
import './App.css';
import { Container, Typography, TextField, Button, Paper, IconButton, List, ListItem, ListItemText, Stack, Box, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [filter, setFilter] = useState('all'); // 'all', 'completed', 'incomplete'

  // Load tasks from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('tasks');
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

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

  // Filtered tasks
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'incomplete') return !task.completed;
    return true;
  });

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          ToDo List
        </Typography>
        <Box component="form" className="todo-form" onSubmit={handleAddTask} sx={{ mb: 2, display: 'flex', gap: 1 }}>
          <TextField
            label="Task name"
            variant="outlined"
            size="small"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            required
            sx={{ flex: 2 }}
          />
          <TextField
            label="Description (optional)"
            variant="outlined"
            size="small"
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
            sx={{ flex: 3 }}
          />
          <Button type="submit" variant="contained" color="primary" sx={{ height: '40px' }}>
            Add
          </Button>
        </Box>
        <Stack direction="row" spacing={1} justifyContent="center" sx={{ mb: 2 }}>
          <Chip
            label="All"
            color={filter === 'all' ? 'primary' : 'default'}
            onClick={() => setFilter('all')}
            variant={filter === 'all' ? 'filled' : 'outlined'}
          />
          <Chip
            label="Completed"
            color={filter === 'completed' ? 'primary' : 'default'}
            onClick={() => setFilter('completed')}
            variant={filter === 'completed' ? 'filled' : 'outlined'}
          />
          <Chip
            label="Incomplete"
            color={filter === 'incomplete' ? 'primary' : 'default'}
            onClick={() => setFilter('incomplete')}
            variant={filter === 'incomplete' ? 'filled' : 'outlined'}
          />
        </Stack>
        <Paper elevation={1} sx={{ maxHeight: 400, overflow: 'auto' }}>
          <List>
            {filteredTasks.length === 0 && (
              <ListItem>
                <ListItemText primary="No tasks yet." />
              </ListItem>
            )}
            {filteredTasks.map((task) => (
              <ListItem key={task.id} divider secondaryAction={
                <IconButton edge="end" aria-label="delete" color="error" onClick={() => handleDeleteTask(task.id)}>
                  <DeleteIcon />
                </IconButton>
              }>
                <IconButton
                  edge="start"
                  aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                  onClick={() => handleToggleComplete(task.id)}
                  sx={{ color: task.completed ? 'green' : 'gray', mr: 1 }}
                >
                  {task.completed ? <CheckCircleIcon /> : <RadioButtonUncheckedIcon />}
                </IconButton>
                <ListItemText
                  primary={<span style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? '#aaa' : 'inherit' }}>{task.name}</span>}
                  secondary={task.desc}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Paper>
    </Container>
  );
}

export default App;
