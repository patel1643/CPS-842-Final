import { useState } from "react"
import data from '../data/processed_data';
export default function Example(){
    const [selectedText, setSelectedText] = useState('');
    const [results, setResults] = useState();
    const handleChange = (e) => {
        setSelectedText(e.target.innerHTML);
        const results = data[e.target.innerHTML];
        setResults(results);
    }

    const objects = Object.keys(data);
    return (
        <>
        <div className="mx-auto text-center pb-4">
        <h1>Pre run tests</h1>
        <h1>{selectedText.length > 0 ? selectedText : ''}</h1>
        </div>
        <div className="dropdown dropdown-left absolute right-4">
            <label tabIndex={0} className="bg-green-400  text-red-600 border-green-900 border-2 p-2 shadow">Ranking List</label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow  w-72 border-2 border-green-700 h-96 max-h-96 overflow-y-auto !flex-nowrap bg-red-700">
                {objects?.map((obj,i) => {
                    return <li key={i}><button  onClick={(e) => handleChange(e)}>{obj}</button></li>
                }) }
            </ul>
        </div>

        {
            results ?
            <>
                <h3 className="text-center"><b>Search Text:</b> {results.term}</h3>
                <h3  className="text-center"><b>Runtime:</b> {results.query_runtime? results.query_runtime : "N/A"}</h3>
                {
                    results.queries? 
                        results.queries.map((query, index)=>{
                            return (
                                <div key={`query_${index}`} className="text-center p-4 border-green-800 bg-green-400 bg-opacity-80 border-2 shadow-xl text-black">
                                    <h3><b>Sample:</b> {query.sample_text}</h3>
                                    <h3><b>Term:</b> {query.term}</h3>
                                    <h3><b>Clustered Result:</b> {query.recommended_term? "Yes" : "No"}</h3>
                                    <h3><b>Document Id:</b> {query.doc_id}</h3>
                                    <h3><b>Document Name:</b> {query.doc_name}</h3>
                                </div>
                            )
                        })
                    : "No query results found"
                }
                </>
            : null
        }            
                
        </>
    )
}