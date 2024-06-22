import React from 'react'
import { Link } from 'react-router-dom';

function Categories() {
    const categories = [
        { id: 1, name: 'Current Affairs', link: '/articles', imageUrl: "https://res.cloudinary.com/dpktfyhbi/image/upload/v1718529415/viewmore_xsmil0.jpg" },
        { id: 2, name: 'Latest Updates', link: '/latest-updates', imageUrl: "https://res.cloudinary.com/dpktfyhbi/image/upload/v1718529415/viewmore_xsmil0.jpg" },
        { id: 3, name: 'Study Material', link: '/ebooks', imageUrl: "https://res.cloudinary.com/dpktfyhbi/image/upload/v1718558408/testkg_ttyz5t.jpg" },
        { id: 4, name: 'Free Mock Tests', link: '/allquizes', imageUrl: "https://res.cloudinary.com/dpktfyhbi/image/upload/v1718529415/viewmore_xsmil0.jpg" }
    ];

    return (
        <div className="container mt-4">
            <hr />
            <h2 className="text-center mb-4">Categories</h2>
            <div className="row">
                {categories.map(category => (
                    <div className="col-md-4" key={category.id}>
                        <div className="my-3">
                            <Link to={category.link} className='text-decoration-none'>
                                <div className="card">
                                    <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: 0, padding: '2px' }}>
                                    </div>
                                    <img src={category.imageUrl} className="card-img-top" alt="..." />
                                    <div className="card-body">
                                        <h5 className="text-center text-dark m-auto p-3">{category.name}</h5>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>))}
            </div>
        </div>
    )
}

export default Categories
