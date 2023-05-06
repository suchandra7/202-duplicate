import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

function Signupforclass() {
    const [selectedValue, setselectedValue] = useState();
    return (
        <div>
            <select value={selectedValue} onChange={e => setselectedValue(e.target.value)}>
                <option>
                    apple
                </option>
                <option>
                    mango
                </option>
            </select>
        </div>
    )
}

export default Signupforclass;