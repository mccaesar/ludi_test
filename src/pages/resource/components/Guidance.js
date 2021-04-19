import React from 'react';
import Grid from '@material-ui/core/Grid';
import './Guidance.css';
import Paper from '@material-ui/core/Paper';


export default function Guidance (props) {

	var title1 = "Potential use cases";
	var title2 = "Strength";
	var title3 = "Cons";

	// for all, mount if not null

	var use;
    if (props.potentialUseCase === "") {
		title1 = null;
        use = null;
	} else { use = props.potentialUseCase; }

	var Strength;
    if (props.Strength === "") {
		title2 = null;
        Strength = null;
    } else { Strength = props.Strength; }

	var cons;
    if (props.cons === "") {
		title3 = null;
        cons = null;
    } else { cons = props.cons; }
		
	return (
		<div id="guidance-wrapper" xs={10} sm={5}>
			<Paper id='parent' variant='outlined'>
                <Grid container justify='left'>
					<Grid id='inner'>
						<h5>{title1}</h5>
						<p>{use}</p>
						<h5>{title2}</h5>
						<p>{Strength}</p>
						<h5>{title3}</h5>
						<p>{cons}</p>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
}
