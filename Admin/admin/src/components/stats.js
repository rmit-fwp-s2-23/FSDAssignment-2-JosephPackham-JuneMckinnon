import React, { useContext, useEffect, useState } from "react";
import "../css/stats.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Label, LineChart, Line } from 'recharts';
import { reviewCountByMovie, getTickets } from "../data/repository";
import { MoviesContext } from "./dashboard";

const AverageReviews = () => {
    const { movies } = useContext(MoviesContext);
    const [reviewData, setReviewData] = useState([]);

    useEffect(() => {
        const fetchReviewData = async () => {
            const reviewDataPromises = movies.map(async (movie) => {
                const name = movie.movie_name;
                const count = await reviewCountByMovie(name);
                return {
                    name,
                    count,
                };
            });
    
            const updatedReviewData = await Promise.all(reviewDataPromises);
            setReviewData(updatedReviewData);
        };
    
        fetchReviewData();
    }, [movies]);

    const totalCount = reviewData.reduce((sum, movie) => sum + movie.count, 0);
    const averageCount = totalCount / reviewData.length;
    return (
        <ResponsiveContainer width = {1000} height = "100%">
            <BarChart data={reviewData} margin = {{left: 50, top: 50, bottom: 10, right: 20}}>
                <XAxis dataKey="name" axisLine = {{ stroke  : "white" }} tick = {{ fill: "white" }} tickLine = {{ stroke: "white" }} />
                <YAxis axisLine = {{ stroke: "white" }} tick = {{ fill: "white" }} tickLine = {{ stroke: "white" }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#8884d8" />
                <ReferenceLine y = {averageCount} stroke = "#BB86FC" strokeWidth = "3">
                <Label
                    value={`Average: ${averageCount.toFixed(2)}`}
                    position="left"
                    fill="white"  // Set the color of the label
                />
                </ReferenceLine>
            </BarChart>
        </ResponsiveContainer>
    )
}

const TicketsSold = () => {
    // 1 - Get all tickets
    // 2 - Count tickets based on day
    // 3 - Create line graph

    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const retrieveTickets = async () => {
            const retrievedTickets = await getTickets();
            setTickets(retrievedTickets);
        }
        
        retrieveTickets();
    }, [])
    
    const countedTickets = tickets.reduce((counts, ticket) => {
        const date = ticket.createdAt.slice(0, 10);
        
        counts[date] = (counts[date] || 0) + 1;
        
        return counts;
    }, {});
    
    const countedTicketsArray = Object.entries(countedTickets).map(([name, count]) => ({
        name,
        count
    }));

    return (
        <ResponsiveContainer width = {1000} height = "100%">
            <LineChart data = {countedTicketsArray} margin = {{left: 50, top: 50, bottom: 10, right: 20}}>
                <XAxis dataKey="name" axisLine = {{ stroke  : "white" }} tick = {{ fill: "white" }} tickLine = {{ stroke: "white" }} />
                <YAxis axisLine = {{ stroke: "white" }} tick = {{ fill: "white" }} tickLine = {{ stroke: "white" }} />
                <Tooltip />
                <Legend />
                <Line type = "monotone" dataKey="count" fill="#8884d8" />
            </LineChart>
        </ResponsiveContainer>
    )
}

const StatsPage = () => {
    const [graph, setGraph] = useState("average_reviews");

    const changeGraph = (e) => {
        setGraph(e.target.id);
    }

    return (
        <div className = "stats-page">
            <div className = "graph-buttons">
                <button 
                    className = {graph === "average_reviews" ? "graph-toggled" : "graph-button"} 
                    onClick = {(e) => changeGraph(e)}
                    id = "average_reviews"
                >Average Reviews</button>
                <button 
                    className = {graph === "tickets_sold" ? "graph-toggled" : "graph-button"} 
                    onClick = {(e) => changeGraph(e)}
                    id = "tickets_sold"
                >Tickets Sold Today</button>
                <button 
                    className = {graph === "page_views" ? "graph-toggled" : "graph-button"} 
                    onClick = {(e) => changeGraph(e)}
                    id = "page_views"
                >Movie Page Views</button>
            </div>
            <div className = "graph-container">
                {graph === "average_reviews" && <AverageReviews />}
                {graph === "tickets_sold" && <TicketsSold />}
            </div>
        </div>
    )
}

export default StatsPage