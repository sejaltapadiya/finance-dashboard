import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableFooter, TablePagination, TableRow, Paper, TableHead, Button, TextField } from "@mui/material";
import axios from 'axios';
import { useAuth } from './AuthContext';

const DataTable = () => {
    const { role } = useAuth();

    useEffect(() => {
        axios.get("http://localhost:9192/api/dashboard", { withCredentials: true })
            .then(response => setRiskData(response.data))
            .catch(error => console.error("Error fetching data:", error));
    }, []);

    const [formData, setFormData] = useState({
        id: '',
        age: '',
        gender: '',
        education_level: '',
        marital_status: '',
        income: '',
        credit_score: '',
        loan_amount: '',
        loan_purpose: '',
        employment_status: '',
        years_at_current_job: '',
        payment_history: '',
        debt_to_income_ratio: '',
        assets_value: '',
        number_of_dependents: '',
        city: '',
        state: '',
        country: '',
        previous_defaults: '',
        marital_status_change: false,
        risk_rating: ''
    });
    
    const [riskData, setRiskData] = useState([]);
    const [editing, setEditing] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);

    const fetchRiskData = () => {
        axios.get("http://localhost:9192/api/dashboard", { withCredentials: true })
            .then((response) => setRiskData(response.data))
            .catch((error) => console.error("Error fetching data:", error));
    };

    useEffect(() => {
        fetchRiskData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type } = e.target;
        setFormData({ ...formData, [name]: type === 'checkbox' ? e.target.checked : value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiCall = editing
            ? axios.put(`http://localhost:9192/api/dashboard/${formData.id}`, formData, { withCredentials: true })
            : axios.post("http://localhost:9192/api/dashboard", formData, { withCredentials: true });

        apiCall.then(() => {
            fetchRiskData();
            setEditing(false);
            setFormData({
                id: '', age: '', gender: '', education_level: '', marital_status: '', income: '', credit_score: '',
                loan_amount: '', loan_purpose: '', employment_status: '', years_at_current_job: '', payment_history: '',
                debt_to_income_ratio: '', assets_value: '', number_of_dependents: '', city: '', state: '', country: '',
                previous_defaults: '', marital_status_change: false, risk_rating: ''
            });
        }).catch(error => console.error("Error saving data:", error));
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:9192/api/dashboard/${id}`, { withCredentials: true })
            .then(() => fetchRiskData())
            .catch(error => console.error("Error deleting data:", error));
    };

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const handleRowsPerPageChange = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(0);
    };

    const paginatedData = riskData.slice(currentPage * rowsPerPage, (currentPage + 1) * rowsPerPage);

    return (
        <div>
            {role === 'admin' ? (
                <>
            <form onSubmit={handleSubmit} style={{ marginBottom: "20px", display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {[
                    { label: "Age", name: "age", type: "number", required: true },
                    { label: "Gender", name: "gender", required: true },
                    { label: "Education Level", name: "education_level", required: true },
                    { label: "Marital Status", name: "marital_status", required: true },
                    { label: "Income", name: "income", type: "number", required: true },
                    { label: "Credit Score", name: "credit_score", type: "number", required: true },
                    { label: "Loan Amount", name: "loan_amount", type: "number", required: true },
                    { label: "Loan Purpose", name: "loan_purpose", required: true },
                    { label: "Employment Status", name: "employment_status", required: false },
                    { label: "Years at Current Job", name: "years_at_current_job", type: "number" },
                    { label: "Payment History", name: "payment_history", required: false },
                    { label: "Debt to Income Ratio", name: "debt_to_income_ratio", type: "number" },
                    { label: "Assets Value", name: "assets_value", type: "number" },
                    { label: "Number of Dependents", name: "number_of_dependents", type: "number" },
                    { label: "City", name: "city", required: true },
                    { label: "State", name: "state", required: true },
                    { label: "Country", name: "country", required: true },
                    { label: "Previous Defaults", name: "previous_defaults", type: "number" },
                    { label: "Marital Status Change", name: "marital_status_change", type: "checkbox" },
                    { label: "Risk Rating", name: "risk_rating" }
                ].map(field => (
                    <TextField
                        key={field.name}
                        label={field.label}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        type={field.type || 'text'}
                        required={field.required}
                    />
                ))}
                <Button type="submit" variant="contained" color="primary">{editing ? "Update" : "Add"}</Button>
            </form>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            {["Gender", "Income", "Loan Purpose", "Loan Amount", "Age", "Credit Score", "Actions"].map(header => (
                                <TableCell key={header}>{header}</TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.gender}</TableCell>
                                <TableCell>{row.income}</TableCell>
                                <TableCell>{row.loan_purpose}</TableCell>
                                <TableCell>{row.loan_amount}</TableCell>
                                <TableCell>{row.age}</TableCell>
                                <TableCell>{row.credit_score}</TableCell>
                                <TableCell>
                                    <Button color="primary" onClick={() => { setFormData(row); setEditing(true); }}>Edit</Button>
                                    <Button color="secondary" onClick={() => handleDelete(row.id)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TablePagination
                            rowsPerPageOptions={[10, 20, 50]}
                            count={riskData.length}
                            rowsPerPage={rowsPerPage}
                            page={currentPage}
                            onPageChange={handlePageChange}
                            onRowsPerPageChange={handleRowsPerPageChange}
                        />
                    </TableFooter>
                </Table>
            </TableContainer>
            </>
            ) : (
                <h2>You do not have permission to view this data.</h2>
            )}
        </div>
    );
};

export default DataTable;
