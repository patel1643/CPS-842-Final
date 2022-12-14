import React, {useState} from 'react'
import api from "../api/queryUtils";
import InputBox from "../components/InputBox";
import Container from '../components/Container';
import { Circles } from 'react-loader-spinner';

function Home() {

    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [bm25, setBm25] = useState(false);
    const [rec, setRec] = useState(false);
    const [searchText, setSearchText] = useState(null);

    const onHandleChangeRec = () => {
        setRec(!rec);
    }

    const onHandleChangeBm25 = () => {
        setBm25(!bm25);
    }

    const handleSearchChange = (text) => {
        setSearchText(text)
    }

    const fetchQueryResults = async () => {
        setLoading(true)
        try {
            var fetchRoute = "/search";
            if(!searchText || searchText === ""){
                alert("Please input a term");
                return
            }

            fetchRoute += "/"+searchText;
            
            fetchRoute += "?clustering="+rec;

            if(bm25){
                fetchRoute += "&bm25=true"
            }

            const response = await api.get(fetchRoute);
            setResults(response.data)
        } catch (err) {
        }
        setLoading(false)
    }


    const ShowResults = () => {
        if(!results){
            return (
                <>
                    <img alt="" className=" mx-auto" src="https://media.tenor.com/7iup7fX-1Q8AAAAM/empty-wallet-no-money.gif"/>
                    <p className="text-center text-2xl">There are no results</p>                
                </>
            )
        }

        return (
            <>
                <h3 className="text-center"><b>Search Text:</b> {results.term}</h3>
                <h3  className="text-center"><b>Runtime:</b> {results.query_runtime? results.query_runtime : "N/A"}</h3>
                <img width='5rem' height='auto' alt={results.seo_vis ? 'SEO Visualization' : 'No image returned'} src={results.seo_vis? results.seo_vis : null} />
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
        )
    }

    return (
        <Container className="flex flex-col gap-4 p-4">
            
            <h1 className="text-4xl text-center font-semibold">
                Assignment 2<br/> - <br/>Matthew Meszaros (500900098) and Udbhav Prasad (500909034)
            </h1>
            
            <div className="flex flex-col gap-2 text-center">
                <h3 className="text-2xl font-bold">
                    Instructions
                </h3>
                <div className="flex flex-col gap-1">
                    <p>First, select the options for the query.</p>
                    <p>Next, enter the search query and click the search button</p>
                    <p>Finally, wait for the results!</p> 
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-center">
                    <InputBox text={"Apply clustering"} handleChange={onHandleChangeRec} className="toggle-accent" />
                    <InputBox text={"Apply bm25"} handleChange={onHandleChangeBm25} className="toggle-primary" />
                </div>
                <div className="flex flex-col justify-center items-center gap-4 w-full ">
                    <input onChange={(e) => handleSearchChange(e.target.value)} type="text" className="bg-red-400 text-green-400 dark:text-white max-w-md input w-full rounded-none" />
                    <button onClick={() => fetchQueryResults()} className="bg-green-400 text-red-600 text-lg font-semibold p-2">Search</button>
                </div>
            </div>
            <br/>
            <h3 className="text-4xl font-semibold text-center">
                🎅Results🎅
            </h3>

            <div className={`flex flex-col px-4 pb-8 ${loading ? 'items-center':''} gap-4`}>
                {
                    loading ?
                        <Circles
                            height="80"
                            width="80"
                            color="#4fa94d"
                            ariaLabel="circles-loading"
                            wrapperStyle={{}}
                            wrapperClass=""
                            visible={true}
                        />
                    : 
                        <ShowResults/>
                }
          
            </div>
        </Container>
    )
}


export default Home