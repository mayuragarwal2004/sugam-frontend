import React from 'react'
import Select from 'react-select';
import options from './options.json'


const FormQuestionSingle = props => {
    const {name, set, question} = props
    return (
    <div className= "field">
    <label htmlFor={name}>{question}<span className="required-star">*</span></label><br />
    <Select
        className="basic-single"
        classNamePrefix="select"
        name={name}
        options={options[name]}
        onChange={val =>set(val.value)}
    /></div>
    )
}

export default FormQuestionSingle