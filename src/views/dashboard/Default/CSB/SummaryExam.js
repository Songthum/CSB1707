import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Button } from '@mui/material';

const SummaryExam = () => {
  const [data, setData] = useState([]);
  const printRef = useRef(); // Reference to the component for printing

  useEffect(() => {
    // Fetch data from the Room API
    axios.get('http://localhost:9999/Room') // Updated to your API URL
      .then(response => {
        // Sort data by R_Time before setting it to state
        const sortedData = response.data.sort((a, b) => new Date(a.R_Time) - new Date(b.R_Time));
        setData(sortedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handlePrint = () => {
    window.print(); // Trigger browser's print dialog
  };

  return (
    <>
      {/* Styling for print to ensure only table content is printed */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            .print-area, .print-area * {
              visibility: visible;
            }
            .print-area {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
            }
            .print-button {
              display: none;
            }
          }
        `}
      </style>

      {/* The content that will be printed */}
      <div ref={printRef} className="print-area">
        <TableContainer component={Paper} elevation={3}>
          <Typography variant="h2" align="center" gutterBottom><br/>
            Exam Room Summary<br/>
            ข้อมูลสำหรับออกเอกสาร<br/>
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Room ID</TableCell>
                <TableCell align="center">Room Name</TableCell>
                <TableCell align="center">Chairman</TableCell>
                <TableCell align="center">Teacher</TableCell>
                <TableCell align="center">Projects</TableCell>
                <TableCell align="center">Time Test</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item, index) => (
                <React.Fragment key={index}>
                  <TableRow>
                    <TableCell align="center">{item.R_id}</TableCell>
                    <TableCell align="center">{item.R_name}</TableCell>
                    <TableCell align="center">{item.R_C}</TableCell>
                    <TableCell align="center">
                      {Array.isArray(item.R_T) && item.R_T.length > 0 ? (
                        item.R_T.map((teacher, idx) => (
                          <div key={idx}>{teacher}</div>
                        ))
                      ) : (
                        ""
                      )}
                    </TableCell>
                    <TableCell >
                      {Array.isArray(item.R_P) && item.R_P.length > 0 ? (
                        item.R_P.map((project, idx) => (
                          <div key={idx}>{`${idx + 1}. ${project}`}</div> // Add numbering here
                        ))
                      ) : (
                        ""
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {Array.isArray(item.R_Time) && item.R_Time.length > 0 ? (
                        item.R_Time.map((time, idx) => (
                          <div key={idx}>{time}</div>
                        ))
                      ) : (
                        ""
                      )}
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      
      {/* Print Button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handlePrint}
        className="print-button"
        style={{ marginTop: '20px' }}
      >
        พิมพ์เอกสาร
      </Button>
    </>
  );
};

export default SummaryExam;
