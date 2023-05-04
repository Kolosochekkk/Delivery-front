import React, { useState, useEffect } from "react";
import axios from "axios";
import { Doughnut } from 'react-chartjs-2';

const StatusChart = () => {
    const [orders, setOrders] = useState([]);
    const [chart, setChart] = useState(null);

    useEffect(() => {
        loadOrders()
    }, []);

    const loadOrders = async () => {
        const result = await axios.get("http://localhost:8080/orders");
        setOrders(result.data);
    }

    const cancelledOrders = orders.filter((order) => order.status === 'Отменен');
    const cancelledPercentage = cancelledOrders.length / orders.length * 100;

    const data = {
        labels: ['Отменен', 'Остальные'],
        datasets: [
            {
                label: 'Отношение отмененных заказов',
                data: [cancelledPercentage, 100 - cancelledPercentage],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB'
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB'
                ]
            }
        ]
    };

    return (
        <div style={{ maxWidth: "500px" }}>
            <div>
                <h3>Отношение отмененных заказов к общему числу:</h3>
                <Doughnut data={data} />
            </div>
        </div>
    );


};

export default StatusChart;
