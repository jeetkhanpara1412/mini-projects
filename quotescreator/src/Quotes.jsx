import React, { useEffect, useState } from 'react'
import './Quotes.css'

export default function Quotes() {

    const [quote, setQuote] = useState("")
    const [count, setcount] = useState(0)
    const [page, setPage] = useState({
        number: '',
        limit: ''
    })

    let getQuote = async () => {
        try {
            let res = await fetch(`https://api.quotable.io/quotes?page=${page.number}&limit=${page.limit}`);
            let quoteData = await res.json();
            let firstQuote = quoteData.results;
            setQuote(firstQuote);
            console.log(quoteData)
            console.log(firstQuote)
        } catch (error) {
            console.log("problem is", error)
        }
    }
    let handelPage = (e) => {
        let value = e.target.value;
        setPage(pageData => ({
            ...pageData,
            number: value
        }));
    }

    let handelLimit = (e) => {
        let value = e.target.value;
        setPage(pageData => ({
            ...pageData,
            limit: value
        }));
    }

    
    useEffect(()=>{
        if(quote){
            console.log('quote', quote)
            let reCount = count + 1;
            setcount(reCount);
        }
    },[quote])


    return (
        <div>
            <div className='container'>
                <input type="number" value={page.number} onChange={handelPage} />
                <input type="number" value={page.limit} onChange={handelLimit} />
                <button onClick={getQuote}>Get New Quote</button>
            </div>
            <div className='data'>
                <h1>Quote is this {count}</h1>
            </div>

            <div >
                {quote.length > 0 ?
                    quote.map((v, i) => {
                        return (
                            <div key={i} className='display' >
                                <p>{v.author} = {v.content}</p>
                            </div>
                        )
                    })
                    : (
                        <div className='display'> <p>no data</p></div>
                    )}
            </div>

        </div>
    )
}
