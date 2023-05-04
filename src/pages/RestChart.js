import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Chart from 'chart.js/auto';

const RestChart = () => {
    const [restaurants, setRestaurants] = useState([]);
    const [chart, setChart] = useState(null);

    useEffect(() => {
        const loadRestaurants = async () => {
            const result = await axios.get("http://localhost:8080/restaurants");
            setRestaurants(result.data);
        };
        loadRestaurants();
    }, []);

    const canvasRef = useRef(null);

    useEffect(() => {
        if (restaurants.length > 0) {
            if (chart) {
                chart.destroy();
            }

            const ctx = canvasRef.current.getContext("2d");
            const sortedRestaurants = restaurants.sort((a, b) => b.stars - a.stars).slice(0, 5);
            const labels = sortedRestaurants.map((restaurant) => restaurant.name);
            const data = sortedRestaurants.map((restaurant) => restaurant.stars);

            const newChart = new Chart(ctx, {
                type: "bar",
                data: {
                    labels: labels,
                    datasets: [{
                        label: "Рейтинг ресторанов",
                        data: data,
                        backgroundColor: ["#f5a623", "#7ed321", "#50e3c2", "#4a90e2", "#d0021b"],
                    }],
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                            },
                        }],
                    },
                    tooltips: {
                        callbacks: {
                            label: (tooltipItem, data) => {
                                const restaurantName = data.labels[tooltipItem.index];
                                const stars = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
                                return `${restaurantName}: ${stars} звезды`;
                            },
                        },
                    },
                },
            });

            setChart(newChart);
        }
    }, [restaurants]);

    return (
        <div style={{ maxWidth: "700px" }}>
            <h3>5 ресторанов с самым высоким рейтингом</h3>
            <div style={{ display: "flex", justifyContent: "space-between"}}>
                <canvas ref={canvasRef}></canvas>
            </div>

        </div>


    );


};

export default RestChart;
