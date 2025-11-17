import React, { useEffect, useState } from 'react'
import './ProductPage.css'

export default function ProductPage() {

    let [product, setProduct] = useState([])
    let [page, setPage] = useState(1)
    let [totalPages, setTotalPages] = useState(0)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                let res = await fetch(`https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}&select=title,images`);
                let result = await res.json();
                console.log(result)
                setProduct(result.products);
                setTotalPages(Math.ceil(result.total / 10));
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, [page]);

    let getPrev = () => {
        if (page == 0) {
            alert("Sumthing is wrong")
        } else {
            setPage(prev => prev - 1)
        }
    }

    let getNext = () => {
        if (page == null) {
            alert("Sumthing is wrong")
        } else {
            setPage(prev => prev + 1)
        }
    }

    return (
        <div className='container'>
            <div className='pro'>
                {product.length > 0 ?
                    product.map((v, i) => {
                        return (
                            <div className='product' key={i}>
                                <img src={v.images[0]} alt="product" />
                                <p> {v.title}</p>
                            </div>
                        )
                    })
                    : (
                        <div className='display'> <p>no data</p></div>
                    )}
            </div>
            <div className='nav'>
                {page > 1 ? (<button onClick={getPrev}>Prev</button>) : (<></>)}

                {[...Array(10)].map((_, i) => {
                    // 0 
                    let crpage = page - 4 + i;
                    if (crpage > 0 && crpage <= totalPages) {
                        return (
                            <button key={crpage} onClick={() => setPage(crpage)} className={crpage === page ? 'active' : ''}> {crpage} </button>
                        );
                    }
                    return null;
                })}

                {page < totalPages ? (<button onClick={getNext}>Next</button>) : (<></>)}
            </div>
        </div>
    )
}
