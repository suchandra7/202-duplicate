import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { Chart as ChartJS, BarElement, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';


function Noofvisitors() {
    const { guserID, setguserID } = useContext(AuthContext);
    const { guserRole, setguserRole } = useContext(AuthContext);
    const [selectedLocation, setselectedLocation] = useState('Select a location');
    const [barData, setBarData] = useState();
    const [total, setTotal] = useState(0);
    const [weekday, setweekday] = useState();
    const [date, setDate] = useState();


    const navigate = useNavigate();

    useEffect(() => {
        if (guserRole == '') {
            navigate('/');
        }
        else if (guserRole == 'member') {
            navigate('/member');
        }
        else if (guserRole == 'Non Member') {
            navigate('/nonmember');
        }
    }, [guserRole]);

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    async function getHours() {
        try {
            const obj = {
                date: new Date(date),
                location: selectedLocation
            };
            const response = await axios.post('http://52.40.70.166:3000/analytics/visitorsPerHours', obj);
            console.log(response.data);
            const hourData = response.data.slice(0, 24);
            setweekday(response.data[24]);
            console.log(typeof (weekday));
            setTotal(hourData.reduce((t, c) => t + c));
            console.log("***********************");
            console.log(hourData);
            setBarData(
                {
                    labels: ["Hour 1", "Hour 2", "Hour 3", "Hour 4", "Hour 5", "Hour 6", "Hour 7", "Hour 8", "Hour 9", "Hour 10", "Hour 11", "Hour 12", "Hour 13", "Hour 14", "Hour 15", "Hour 16", "Hour 17", "Hour 18", "Hour 19", "Hour 20", "Hour 21", "Hour 22", "Hour 23", "Hour 24"],
                    datasets: [
                        {
                            label: 'Hours spent',
                            data: hourData,
                            backgroundColor: 'rgba(176, 224, 230, 1)',
                            borderColor: 'black',
                            borderWidth: 1,
                        }
                    ]
                }
            );

        } catch (error) {
            console.error('Error fetching data', error.response.data);
        }
    };

    const setValue = (e) => {
        const target = e.target;
        if (target.classList.contains('dropdown-item')) {
            setselectedLocation(target.innerText);
        }
    }
    const handleDateChange = (e) => {
        setDate(e.target.value);
      };

    const submit = (e) => {
        getHours();
    }

    return (
        <div>
            <div className='row center'>
                <h1>
                    No of visitors {date}
                </h1>
            </div>
            <div className='row'>
                <div className='freetrial'>
                    <h3>
                        Date
                    </h3>
                    <input type="date" value={date} onChange={handleDateChange}/>
                    <div className='center side'>
                        <h3>Location</h3>
                        <div class="dropdown" onClick={setValue}>
                            <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                {selectedLocation}
                            </button>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" >Mountain View</a></li>
                                <li><a class="dropdown-item" >Sunnyvale</a></li>
                                <li><a class="dropdown-item" >Milpitas</a></li>
                                <li><a class="dropdown-item" >San jose</a></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <button type="button" class="btn btn-success" onClick={submit}>Get data</button>
                    </div>
                </div>

            </div>
            <div className='row center'>
                <h1>
                    Selected day is {(weekday ? ('Weekday') : ('Weekend'))}
                </h1>
            </div>
            <div className='row center'>
                <h1>
                    Selected day is {(weekday ? ('Weekday') : ('Weekend'))}
                </h1>
            </div>
            <div className='row'>
                <div>
                    {
                        (total != 0 ?
                            <Bar data={barData} options={options}></Bar> : <h3 className='center'>No of hours is 0 for the selected location and date</h3>)
                    }
                </div>
            </div>

        </div>

    )
}

export default Noofvisitors;