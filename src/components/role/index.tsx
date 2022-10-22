import PropTypes from 'prop-types'
import React, { Component } from 'react'

interface IRole {
    jobTitle: string;
    company: string;
    description: string;
    linkTo?: string;
    duration: string
}

const Role = ({ ...props }: IRole) => {
    return (
        <>
            <h4> {props.jobTitle} at <a href={props.linkTo} rel="noreferrer" target="_blank">({props.company})</a> </h4>
            <p> {props.description} </p>
            <span> {props.duration} </span>
        </>
    )
}

export default Role