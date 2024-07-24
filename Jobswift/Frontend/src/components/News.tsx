// src/components/News.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Typography, Card, CardContent, Link, CircularProgress } from "@mui/material";

interface Article {
  title: string;
  description: string;
  url: string;
}

const News: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything?q=fitness&apiKey=dd27e2e8bc3e42019de5d7b28a13647b');
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Error fetching news: {error}</Typography>;

  return (
    <Box mt={4}>
      <Typography variant="h6" gutterBottom>Latest Fitness News</Typography>
      {articles.slice(0, 1).map((article, index) => (
        <Card key={index} sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">{article.title}</Typography>
            <Typography variant="body2" color="textSecondary">{article.description}</Typography>
            <Link href={article.url} target="_blank" rel="noopener">Read more</Link>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default News;
