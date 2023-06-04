import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {Container,Table,Tr,Th,Thead,Tbody,Td,Heading} from "@chakra-ui/react";

function App() {
    const [answers, setAnswers] = useState([]);

    const fetchAnswers = async () => {
        const username = 'your_username';
        const password = 'your_password';

        const authHeader = `Basic ${btoa(`${username}:${password}`)}`;

        try {
            const res = await fetch("http://localhost:8081/findAll", {
                headers: {
                    ContentType: "application/json"
                },
            });

            if (res.ok) {
                const data = await res.json();
                const finalData = data.map((d: any) => ({
                    answer: String(d.answer),
                    timeTaken: d.timeTaken,
                }));
                setAnswers(finalData);
            } else {
                // Handle error response
                console.error('Request failed:', res.status, res.statusText);
            }
        } catch (error) {
            // Handle network error
            console.error('Network error:', error);
        }
    };
    useEffect(() => {
        fetchAnswers();
        const interval = setInterval(() => {
            fetchAnswers();
        }, 5000);
        return () => clearInterval(interval);

    }, [])
  return (
      <Container>
          <Heading>
              Prime Dashboard
          </Heading>
          <Table>
              <Thead>
              <Tr>
                  <Th>ID</Th>
                  <Th>Answer</Th>
                  <Th>Time Taken</Th>
              </Tr>
              </Thead>
              <Tbody>
                  {
                  answers && answers.map((ans: any, index: number) => {
                      return (
                          <Tr key={index}>
                              <Td>{index + 1}</Td>
                              <Td>{ans.answer}</Td>
                              <Td>{ans.timeTaken}</Td>
                          </Tr>
                      )
                  })
                  }

              </Tbody>
          </Table>
      </Container>

  );
}

export default App;
