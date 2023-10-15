import React, { useContext, useEffect, useState } from "react";
import "../css/stats.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, ReferenceLine, Label } from 'recharts';
import { reviewCountByMovie } from "../data/repository";
import { MoviesContext } from "./dashboard";

const StatsPage = () => {
    const { movies } = useContext(MoviesContext);
    const [reviewData, setReviewData] = useState([]);

    // average number of reviews
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
    console.log(averageCount);


    return (
        <div className = "stats-page">
            <ResponsiveContainer width = "80%" height = "80%">
                <BarChart
                width = {500}
                height = {100}
                data={reviewData}
                >
                    <XAxis dataKey="name" />
                    <YAxis />
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
        </div>
    )
}

export default StatsPage