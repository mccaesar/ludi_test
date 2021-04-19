import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
import './Guidance.css';
import Paper from '@material-ui/core/Paper';


export default function Description (props) {

	// mount if not null

    if (props.description == "") {
		return ( <div></div> );
	} else { 
		return (
			<div id="description-wrapper" xs={10} sm={5}>
				<Paper id='parent' variant='outlined'>
					<Grid container justify='left'>
						<Grid id='inner'>
							<h5>Description</h5>
							<p>{props.description}</p>
						</Grid>
					</Grid>
				</Paper>
			</div>
		);
	}
}
