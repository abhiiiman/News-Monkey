import React, { Component } from 'react'
import NewsItem from './NewsItem'
import SpinLoader from './SpinLoader';
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import ButtonTop from './ButtonTop';

export class News extends Component {

    static defaultProps = {
        country: "in",
        pageSize: 6,
        category: "general",
        totalResults: 0
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            showLoader: false, // New state for controlling the progress bar
        }
        document.title = `NewsMonkey - ${this.capitalizeFirstLetter(this.props.category)}`;
    }

    fetchMoreData = async () => {
        this.setState({ page: this.state.page + 1 });
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4b7a1b7e835c4f98bec0b3a4fc8051e9&pageSize=${this.props.pageSize}&page=${this.state.page + 1}`;
        let data = await fetch(url);
        let parsedData = await data.json();

        // Filter out duplicate articles
        const newArticles = parsedData.articles.filter(article => !this.state.articles.some(existingArticle => existingArticle.url === article.url));

        this.setState(prevState => ({
            articles: [...prevState.articles, ...newArticles],
            totalResults: parsedData.totalResults,
            loading: false
        }));
    };



    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4b7a1b7e835c4f98bec0b3a4fc8051e9&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false })
        this.props.setProgress(100);
    };

    async componentDidMount() {
        await this.updateNews();
    };


    render() {
        const { articles, loading } = this.state;
        return (
            <div className="container mt-4">
                <h1 className='heading text-center'>Top {this.capitalizeFirstLetter(this.props.category)} Headlines</h1>
                <InfiniteScroll

                    dataLength={articles ? articles.length : 0}
                    next={this.fetchMoreData}
                    hasMore={articles && articles.length !== this.state.totalResults}
                    loader={<SpinLoader />}
                    scrollableTarget="scrollableDiv">

                    <div className="row">
                        {!loading && (articles && articles.length > 0 ? (articles.map((element) => (
                            <div className="col-md-4 col-sm" key={element.url}>
                                <NewsItem
                                    title={element.title}
                                    description={element.description}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                    author={element.author}
                                    date={element.publishedAt}
                                    source={element.source.name}
                                />
                            </div>
                        ))) : (
                            <div className="errorMsg container text-center">
                                {/* <p>No articles to display</p>
                                <p><strong>API Error : 429</strong></p> */}
                                <img src="/Resources/APIErrorImage.gif" alt="error_image" />
                            </div>
                        ))}
                    </div>
                </InfiniteScroll>
                <ButtonTop />
            </div>
        );
    }
}

export default News;