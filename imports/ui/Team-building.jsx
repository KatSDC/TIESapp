import React, { Component, PropTypes } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {green700, red700, teal200, blue400} from 'material-ui/styles/colors';

import { createContainer } from 'meteor/react-meteor-data';
import { Employees } from '../api/employees.js';
import { SkillsList } from '../api/skills_list.js';
import { Companies } from '../api/companies.js';
import Done from 'material-ui/svg-icons/action/done';


import SkillCard from './SkillCard'
import Sidemenu from './Sidemenu'

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const muiTheme = getMuiTheme({
	fontFamily: 'Open Sans',
	palette: {
		primary1Color: red700,
	},
  	appBar: {
    	height: 50,
  	},
});
var width = 900,
    height = 300,
    margins = {left: 100, right: 100, top: 50, bottom: 50},
    title = "User sample",
    // chart series,
    // field: is what field your data want to be selected
    // name: the name of the field that display in legend
    // color: what color is the line
    chartSeries = [
      {
        field: 'BMI',
        name: 'BMI',
        color: '#ff7f0e'
      }
    ],
    // your x accessor
    x = function(d) {
      return d.index;
    }
const business = [
      {name: 'Marketing', diana: 4000, jim: 2400, bob: 0},
      {name: 'Leadership', diana: 3000, jim: 100, bob: 2210},
      {name: 'Methodologies', diana: 2000, jim: 9800, bob: 2290},
      {name: 'Business \n Analysis', diana: 200, jim: 3908, bob: 2000},
      {name: 'Competitive \n Analysis', diana: 200, jim: 500, bob: 2000},
      {name: 'Change \n Management', diana: 1000, jim: 3908, bob: 2000},
      {name: 'Requirements Analysis', diana: 200, jim: 300, bob: 2000},
      {name: 'Strategy', diana: 300, jim: 300, bob: 20},
];
const coding = [
      {name: 'html5', diana: 4000, jim: 2400, bob: 2400},
      {name: 'angularjs', diana: 1000, jim: 20000, bob: 2210},
      {name: 'html5', diana: 2000, jim: 10090, bob: 2290},
      {name: 'ruby on rails', diana: 1000, jim: 200, bob: 2000},
      {name: 'python', diana: 2780, jim: 3908, bob: 2000},
      {name: 'websocket', diana: 300, jim: 3908, bob: 1000},
      {name: 'css', diana: 27800, jim: 208, bob: 2000},
      {name: 'json', diana: 300, jim: 8908, bob: 1000},
      {name: 'xml', diana: 2780, jim: 908, bob: 2000},
      {name: 'java', diana: 300, jim: 3908, bob: 1000},
];
const devops = [
      {name: 'amazon web services', diana: 4000, jim: 2400, bob: 2400},
      {name: 'cloud computing', diana: 3000, jim: 1398, bob: 2210},
      {name: 'maven', diana: 2000, jim: 9800, bob: 2290},
      {name: 'heroku', diana: 480, jim: 3908, bob: 3000},
      {name: 'travis', diana: 3908, jim: 3908, bob: 500},
      {name: 'jenkins', diana: 2780, jim: 9008, bob: 900},
      {name: 'tomcat', diana: 300, jim: 508, bob: 900},
      {name: 'google app engine', diana: 2780, jim: 9008, bob: 900},
      {name: 'google cloud platform', diana: 600, jim: 7000, bob: 900},
];

const iconStyles = {
  	display: 'none',
};

class TeamList extends Component{
	state = {
	    name_select: [],
	};
	handleChange = (event, index, name_select) => {
		this.setState({name_select});
		const parent = event.target.parentNode;
		const svg_check = parent.getElementsByTagName('svg');
		svg_check[0].style.display = "block";
	}

	menuItems(name_select) {
	    return this.props.employees.map((employee) => (
	      <MenuItem
	        key={employee._id._str}
	        insetChildren={true}
	        checked={name_select && name_select.indexOf(employee) > -1}
	        value={employee.name}
	        primaryText={employee.name}
	        leftIcon={<Done style={iconStyles} color={red700}/>}/>
	    ));
	}
	renderSkills(){
		console.log(this.props)
		// return this.props._list.map((skill) => {
		// 	return(<SkillCard key={skill._id} employee={skill}></SkillCard>)
		// })
	}
	render(){
		const {name_select} = this.state;
		return (
			<MuiThemeProvider muiTheme={muiTheme}> 
				<div>
					<Sidemenu />
					<div className="container">
						<div className="row relative">
							<h1 className="col m9">Skills</h1>
							<SelectField
								className="col m3 right-align"
						        multiple={true}
						        hintText="Select a name"
						        value={name_select}
						        onChange={this.handleChange}
						      >
						        {this.menuItems(name_select)}
						    </SelectField>
						</div>
						<div>
							<SkillCard header={'Business'} icon="work">
								{this.renderSkills()}	
							</SkillCard>
							<SkillCard header={'Coding'}  icon="code">
								<BarChart width={1000} height={300} data={coding}
							            margin={{top: 20, right: 30, left: 20, bottom: 5}}>
							       <XAxis dataKey="name"/>
							       <YAxis/>
							       <CartesianGrid strokeDasharray="3 3"/>
							       <Tooltip/>
							       <Legend />
							       <Bar dataKey="jim" stackId="a" fill={green700} />
							       <Bar dataKey="diana" stackId="a" fill={teal200} />
							       <Bar dataKey="bob" stackId="a" fill={blue400} />
							      </BarChart>
							</SkillCard>
							<SkillCard header={'DevOps'} icon="cloud_upload">
								<BarChart width={1000} height={300} data={devops}
							            margin={{top: 20, right: 30, left: 20, bottom: 5}}>
							       <XAxis dataKey="name"/>
							       <YAxis/>
							       <CartesianGrid strokeDasharray="3 3"/>
							       <Tooltip/>
							       <Legend />
							       <Bar dataKey="jim" stackId="a" fill={green700} />
							       <Bar dataKey="diana" stackId="a" fill={teal200} />
							       <Bar dataKey="bob" stackId="a" fill={blue400} />
							      </BarChart>
							</SkillCard>

						</div>
					</div>
				</div>
			</MuiThemeProvider>
		)
	}
}
TeamList.propTypes = {
  employees: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    employees: Employees.find({"current_company": "google"}).fetch(),
    skills_list: SkillsList.find().fetch(),
    companies: Companies.find().fetch()
  };
}, TeamList);

// 