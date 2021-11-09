import React, { useState, useContext } from 'react';
import { TextField, Typography, Grid, Button, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core';
import { ExpenseTrackerContext } from '../../context/context.js';
import { v4 as uuidv4 } from 'uuid';
import { incomeCategories, expenseCategories } from '../../constants/categories.js';
import formatDate from '../../utils/formatDate.js';

import useStyles from './styles.js';


const initialState = {
    amount: '',
    category: '',
    type: 'Expense',
    date: formatDate(new Date())
}

const Form = () => {
    const classes = useStyles();
    const [formData, setFormData] = useState(initialState);
    const { addTransaction } = useContext(ExpenseTrackerContext);
    const selectedCategory = formData.type === 'Income' ? incomeCategories : expenseCategories;

    const createTransaction = () => {
        const transaction = { ...formData, amount: +formData.amount, id: uuidv4() };
        addTransaction(transaction);
        setFormData(initialState);
    }
    
    const handleChange = event => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    // console.log(formData);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography align="center" variant="subtitle2" gutterBottom>
                    ...    
                </Typography>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select name="type" value={formData.type} onChange={handleChange}>
                        <MenuItem value="Income">Income</MenuItem>
                        <MenuItem value="Expense">Expense</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select name="category" value={formData.category} onChange={handleChange}>
                        { selectedCategory.map(c => <MenuItem key={c.type} value={c.type}>{c.type}</MenuItem>) }
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={6}>
                <TextField type="number" name="amount" label="Amount" fullWidth value={formData.amount} onChange={handleChange} />
            </Grid>
            <Grid item xs={6}>
                <TextField type="date" name="date" label="Date" fullWidth value={formData.date} onChange={handleChange} />
            </Grid>
            <Button className={classes.button} variant="outlined" color="primary" fullWidth onClick={createTransaction}>Create</Button>
        </Grid>
    );
}

export default Form
