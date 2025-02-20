import  { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Container,
  Rating,
  CircularProgress,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled components
const StyledTableContainer = styled(TableContainer)({
  marginBottom: '24px',
  maxHeight: '400px'
});

const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column'
});

const ProgressLabel = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '8px'
});

const CompanyAnalytics = () => {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('http://localhost:8000/api/companies/');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setCompanies(data);
      } else {
        setCompanies([]);
        setError('Invalid data format received from server');
      }
    } catch (error) {
      console.error('Error fetching companies:', error);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompanyDetails = async (companyId) => {
    try {
      setError(null);
      const response = await fetch(`http://localhost:8000/api/companies/${companyId}/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setSelectedCompany(data);
    } catch (error) {
      console.error('Error fetching company details:', error);
    }
  };

  const ProgressBar = ({ value, label }) => (
    <Box sx={{ mb: 3 }}>
      <ProgressLabel>
        <Typography variant="body2" color="textSecondary">
          {label}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {value.toFixed(1)}%
        </Typography>
      </ProgressLabel>
      <LinearProgress 
        variant="determinate" 
        value={Number(value) || 0} 
        sx={{ 
          height: 8, 
          borderRadius: 4,
          backgroundColor: '#e0e0e0',
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
            backgroundColor: value > 50 ? '#f44336' : '#2196f3'
          }
        }}
      />
    </Box>
  );

  if (loading) {
    return (
      <>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
      </>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={selectedCompany ? 6 : 12}>
          <StyledCard elevation={3}>
            <CardContent>
              <Typography variant="h5" component="h2" gutterBottom>
                Company Analytics Dashboard
              </Typography>
              {companies.length > 0 ? (
                <StyledTableContainer component={Paper}>
                  <Table stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell>Company ID</TableCell>
                        <TableCell>Company Name</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {companies.map((company) => (
                        <TableRow key={company.company_id} hover>
                          <TableCell>{company.company_id}</TableCell>
                          <TableCell>{company.company_name}</TableCell>
                          <TableCell align="right">
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => fetchCompanyDetails(company.company_id)}
                              size="small"
                            >
                              View Analytics
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </StyledTableContainer>
              ) : (
                <Typography color="textSecondary" align="center" sx={{ py: 3 }}>
                  No companies found
                </Typography>
              )}
            </CardContent>
          </StyledCard>
        </Grid>

        {selectedCompany && (
          <Grid item xs={12} md={6}>
            <StyledCard elevation={3}>
              <CardContent>
                <Typography variant="h5" component="h2" gutterBottom>
                  {selectedCompany.company_name} Details
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Rating
                  </Typography>
                  <Box display="flex" alignItems="center">
                    <Rating
                      value={Number(selectedCompany.rating) || 0}
                      precision={0.5}
                      readOnly
                      size="large"
                    />
                    <Typography variant="body1" sx={{ ml: 1 }}>
                      ({selectedCompany.rating})
                    </Typography>
                  </Box>
                </Box>

                <ProgressBar
                  value={selectedCompany.return_percentage}
                  label="Return Rate"
                />
                
                <ProgressBar
                  value={selectedCompany.cancelled_percentage}
                  label="Cancellation Rate"
                />

                <Box>
                  <Typography variant="subtitle1" gutterBottom>
                    Average Delivery Time
                  </Typography>
                  <Typography variant="h6" color="primary">
                    {selectedCompany.average_delivery_time.toFixed(1)} days
                  </Typography>
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>
        )}
      </Grid>
    </Container>
    
  );
};

export default CompanyAnalytics;