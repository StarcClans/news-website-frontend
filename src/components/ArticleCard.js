// src/components/ArticleCard.js
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { Link } from "react-router-dom";

function ArticleCard({ article, fadeOut }) {
    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        } catch (error) {
            console.error("Error formatting date:", error);
            return 'Invalid Date'; // Handle invalid date strings gracefully
        }
    };

    return (
        <Card sx={{
            marginBottom: 2,
            opacity: fadeOut ? 0.3 : 1,
            transition: 'opacity 0.3s ease-in-out',
        }}>
            <CardActionArea>
                <Link to={`/article/${article.uri}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    <CardMedia
                        component="img"
                        height="380"
                        image={article.multimedia || "https://via.placeholder.com/150"}
                        alt={article.title}
                        sx={{
                            objectFit: "cover", // Prevent image distortion
                            width: "100%", // Ensure image takes the full width
                        }}
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" sx={{
                            textAlign: 'left',
                            fontSize: '1.4em',
                            marginBottom: 1,
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',

                        }}>
                            {article.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ marginTop: 4}}>
                            Published Date: {formatDate(article.publishedDate)}
                        </Typography>
                    </CardContent>
                </Link>
            </CardActionArea>
        </Card>
    );
}

export default ArticleCard;