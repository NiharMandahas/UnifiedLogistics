import { useState } from 'react';
import './TextEditor.css';

function TextEditor() {
    const [textContent, setTextContent] = useState('');
    const [queriesHistory, setQueriesHistory] = useState([]);
    const [sqlQuery, setSqlQuery] = useState('');
    const [error, setError] = useState(null);
    const [isDirectSQL, setIsDirectSQL] = useState(false);

    const handleGenerateSQL = async () => {
        setError(null);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/text-editor/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text_content: textContent }),
            });
            const data = await response.json();
            if (response.ok) {
                setSqlQuery(data.sql_query);
            } else {
                setError(data.error || 'Failed to generate SQL query.');
            }
        } catch (e) {
            setError('An error occurred while generating SQL query.');
            console.log(e);
        }
    };

    const handleExecuteQuery = async () => {
        setError(null);
        try {
            const response = await fetch('http://127.0.0.1:8000/api/execute-query/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ sql_query: sqlQuery }),
            });
            const data = await response.json();
            if (response.ok) {
                setQueriesHistory([
                    ...queriesHistory,
                    { 
                        text: isDirectSQL ? null : textContent, 
                        sqlQuery, 
                        result: data,
                        isDirectSQL 
                    },
                ]);
                setTextContent('');
                setSqlQuery('');
                openQueryResultInNewPage(data);
            } else {
                setError(data.error || 'Failed to execute SQL query.');
            }
        } catch (e) {
            setError('An error occurred while executing SQL query');
            console.log(e);
        }
    };

    const openQueryResultInNewPage = (data) => {
        const newWindow = window.open('', '_blank');
        if (!newWindow) {
            setError('Unable to open a new window. Please check your browser settings.');
            return;
        }

        const htmlContent = `
            <html>
                <head>
                    <title>Query Result</title>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { padding: 10px; border: 1px solid #ddd; text-align: left; }
                        th { background-color: #f2f2f2; }
                    </style>
                </head>
                <body>
                    <h1>Query Result</h1>
                    <h4>Result:</h4>
                    <table>
                        <thead>
                            <tr>
                                ${data.columns.map(col => `<th>${col}</th>`).join('')}
                            </tr>
                        </thead>
                        <tbody>
                            ${data.rows.map(row => `
                                <tr>
                                    ${row.map(cell => `<td>${cell}</td>`).join('')}
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <button onclick="window.location.reload()">Reopen Results</button>
                </body>
            </html>
        `;
        
        newWindow.document.write(htmlContent);
        newWindow.document.close();
    };

    const handleReopenResults = (result) => {
        openQueryResultInNewPage(result);
    };

    const toggleQueryMode = () => {
        setIsDirectSQL(!isDirectSQL);
        setTextContent('');
        setSqlQuery('');
        setError(null);
    };

    return (
        <div className='TextField'>
            <h1 className='TextField-H1'>Query Database</h1>
            
            <div className='TextField-mode-toggle'>
                <button 
                    className={`mode-button ${!isDirectSQL ? 'active' : ''}`}
                    onClick={() => !isDirectSQL || toggleQueryMode()}
                >
                    Text to SQL
                </button>
                <button 
                    className={`mode-button ${isDirectSQL ? 'active' : ''}`}
                    onClick={() => isDirectSQL || toggleQueryMode()}
                >
                    Direct SQL
                </button>
            </div>

            <div className='TextField-Previous' style={{ marginBottom: '20px' }}>
                {queriesHistory.length > 0 && (
                    <div>
                        <h2 className='TextField-H2'>Previous Queries</h2>
                        <div>
                            {queriesHistory.map((item, index) => (
                                <div key={index} style={{ marginBottom: '10px', borderBottom: '1px solid #ddd', paddingBottom: '10px' }}>
                                    <h3 className='TextField-H3'>Query {index + 1}:</h3>
                                    {!item.isDirectSQL && (
                                        <p className='TextField-p'><strong>Input Text:</strong> {item.text}</p>
                                    )}
                                    <p className='TextField-p'>
                                        <strong>{item.isDirectSQL ? 'Direct SQL Query:' : 'Generated SQL Query:'}</strong> {item.sqlQuery}
                                    </p>
                                    {item.result ? (
                                        <div className='TextField-PrevResults'>
                                            <div>
                                                <h4 className='TextField-H4'>Query Result:</h4>
                                            </div>
                                            <div className='TextField-PrevResults-Button'>
                                                <button id='TextField-PrevResults-Button' onClick={() => handleReopenResults(item.result)}>
                                                    Open Results
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <p>Query result not available yet.</p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div style={{ marginTop: '20px' }}>
                {!isDirectSQL ? (
                    <div className='TextField-inputdiv'>
                        <div>
                            <textarea 
                                className='TextField-input'
                                value={textContent}
                                onChange={(e) => setTextContent(e.target.value)}
                                placeholder="Enter text to convert to SQL"
                                rows={1}
                            />
                        </div>
                        <div>
                            <button id='TextField-Generate-Button' onClick={handleGenerateSQL}>Generate SQL</button>
                        </div>
                    </div>
                ) : (
                    <div className='TextField-inputdiv'>
                        <div>
                            <textarea
                                className='TextField-input'
                                value={sqlQuery}
                                onChange={(e) => setSqlQuery(e.target.value)}
                                placeholder="Enter SQL query directly"
                                rows={1}
                            />
                        </div>
                        <div>
                            <button id='TextField-Execute-Button' onClick={handleExecuteQuery}>Execute Query</button>
                        </div>
                    </div>
                )}

                {!isDirectSQL && sqlQuery && (
                    <div className='TextField-sqlquery'>
                        <div>
                            <h2 className='TextField-H2'>Generated SQL Query:</h2>
                        </div>
                        <div>
                            <textarea
                                className='TextField-output'
                                value={sqlQuery}
                                onChange={(e) => setSqlQuery(e.target.value)}
                                placeholder="Edit the generated SQL query"
                                rows={1}
                            />
                        </div>
                        <div>
                            <button id='TextField-Execute-Button' onClick={handleExecuteQuery}>Execute Query</button>
                        </div>
                    </div>
                )}
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default TextEditor;