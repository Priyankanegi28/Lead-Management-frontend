import {
    Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, Grid, InputLabel, MenuItem, Select, TextField
} from '@mui/material';
import { useState } from 'react';

const LeadForm = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(initialData || {
    name: '',
    email: '',
    phone: '',
    company: '',
    jobTitle: '',
    status: 'New',
    source: 'Website',
    value: 0,
    notes: '',
    assignedTo: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>{initialData ? 'Edit Lead' : 'Add New Lead'}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Job Title"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  label="Status"
                >
                  <MenuItem value="New">New</MenuItem>
                  <MenuItem value="Contacted">Contacted</MenuItem>
                  <MenuItem value="Qualified">Qualified</MenuItem>
                  <MenuItem value="Proposal">Proposal</MenuItem>
                  <MenuItem value="Negotiation">Negotiation</MenuItem>
                  <MenuItem value="Closed-Won">Closed Won</MenuItem>
                  <MenuItem value="Closed-Lost">Closed Lost</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Source</InputLabel>
                <Select
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  label="Source"
                >
                  <MenuItem value="Website">Website</MenuItem>
                  <MenuItem value="Referral">Referral</MenuItem>
                  <MenuItem value="Social Media">Social Media</MenuItem>
                  <MenuItem value="Advertisement">Advertisement</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Value"
                name="value"
                type="number"
                value={formData.value}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Assigned To"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                name="notes"
                multiline
                rows={4}
                value={formData.notes}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" sx={{ backgroundColor: '#1a237e' }}>
            {initialData ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default LeadForm;