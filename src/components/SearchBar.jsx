import React, { useState, useEffect } from 'react';
import { getAllArticles } from './api';  // Assuming you have an api.js for backend calls
import ArticleCard from './ArticleCard';  // Component for displaying articles
import SearchBar from './SearchBar';   // Component for the search bar

function HomePage() {
    const [articles, setArticles] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchArticles = async () => {
            const data = await getAllArticles();
            setArticles(data);
        };
        fetchArticles();
    }, []);

   const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

const matchingTitles = filteredArticles.map(article => article.title); // Get matching titles
const nonMatchingSections = articles
        .filter(article => !matchingTitles.includes(article.title))  //filter those that matches

        .map(article => article.section) // Extract sections from non-matching articles
        .filter((section, index, array) => array.indexOf(section) === index);  // Remove Duplicates

    return (
        <div>
            <SearchBar setSearchTerm={setSearchTerm} />

            {searchTerm && (
              <div className="search-results-section">
                   <h2>Search Results</h2>
              </div>
            )}

            {/* Display all sections */}
            {articles.map(article => (

                (searchTerm == '' || filteredArticles.includes(article)) ?
                <>
                { !matchingTitles.includes(article.title) && (
                <div className="section-title">
                    <h2>{article.section}</h2>
                 </div>
                )}

               <ArticleCard key={article.id} article={article} fadeOut={false} />
               </> :  (
                 !matchingTitles.includes(article.title) &&
                    !nonMatchingSections.includes(article.section) && (
                        
                        <ArticleCard key={article.id} article={article} fadeOut={true} />
                    )
               )
            )}

        </div>
    );
}