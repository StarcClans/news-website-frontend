import React, { useState, useEffect } from 'react';
import articleService from '../services/articleService';
import ArticleCard from '../components/ArticleCard';
import Grid from '@mui/material/Grid';
import Loading from '../components/Loading';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';

function Home() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            try {
                const data = await articleService.getArticles();
                setArticles(data);
            } catch (error) {
                console.error("Error fetching articles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const StyledBox = styled(Box)(({ theme }) => ({
        padding: theme.spacing(2),
        marginLeft: '30px',  // Add left margin
        marginRight: '30px', // Add right margin
    }));

    const StyledGrid = styled(Grid)({
        margin: 0,         // Reset default Grid margins
        width: '100%',
    });

    return (
        <StyledBox>
            {loading ? (
                <Loading />
            ) : (
                <StyledGrid container spacing={2}>
                    {articles.map(article => (
                        <Grid item xs={12} sm={6} md={3} key={article.id}>
                            <ArticleCard article={article} />
                        </Grid>
                    ))}
                </StyledGrid>
            )}
        </StyledBox>
    );
}

export default Home;