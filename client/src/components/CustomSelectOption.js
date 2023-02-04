import React from 'react';

// eslint-disable-next-line no-unused-vars
const CustomSelectOption = ({ value, label, customAbbreviation }) => (
    <div style={{ display: 'flex' }}>
        <div style={{ marginLeft: '10px', color: '#ccc' }}>
            <img src={customAbbreviation} alt={label} width='30'/>
        </div>
        <div className="loginName">{label}</div>
    </div>
);

export default CustomSelectOption;
