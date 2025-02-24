import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

function ArticleCard({ article }) {
    return (
        <Card sx={{ height: '400px', width: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
            <CardContent sx={{ padding: '10px' }}>
                <Box>
                    {/* Multimedia (Image) */}
                    {article.multimedia && (
                        <CardMedia
                            component="img"
                            sx={{ height: '240px', objectFit: 'cover', width: '100%' }}  // Image Height and Fit
                            image={article.multimedia}
                            alt={article.title}
                        />
                    )}
                </Box>

                <Box>
                    {/* Headline (Linked) */}
                    <Typography variant="subtitle2" component="div">
                        <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                            {article.title}
                        </a>
                    </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{
                    position: 'absolute',
                    bottom: 5,
                    right: 5,
                    fontSize: '0.7rem' // Small Font Size
                }}>
                    {article.publishedDate}
                </Typography>
            </CardContent>
        </Card>
    );
}

export default ArticleCard;