// CityNews.js
import React from 'react';
import PropTypes from 'prop-types';
import {
  NewsContainer,
  NewsItem,
  NewsTitle,
  PublishDate,
  NewsSummary,
  ReadMoreLink,
} from './styles'; // Assuming you'll add these to styles.js

const CityNews = ({ newsItems }) => {
  return (
    <NewsContainer>
      <h2>City News & Updates</h2>
      {newsItems &&
        newsItems.map((news) => (
          <NewsItem key={news.id}>
            <NewsTitle>{news.title}</NewsTitle>
            <PublishDate>{new Date(news.publishDate).toLocaleDateString()}</PublishDate>
            <NewsSummary>{news.summary}</NewsSummary>
            {news.link && (
              <ReadMoreLink href={news.link} target="_blank" rel="noopener noreferrer">
                Read More
              </ReadMoreLink>
            )}
          </NewsItem>
        ))}
      {newsItems && newsItems.length === 0 && <p>No recent city news or updates.</p>}
    </NewsContainer>
  );
};

CityNews.propTypes = {
  newsItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      publishDate: PropTypes.number.isRequired,
      summary: PropTypes.string.isRequired,
      link: PropTypes.string,
    })
  ).isRequired,
};

CityNews.defaultProps = {
  newsItems: [],
};

export default CityNews;