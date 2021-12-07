import React, { Component } from "react";
import './error-boundry.scss';

export default class ErrorBoundry extends Component {
	state = {
		hasError: false
	};

	componentDidCatch() {
		this.setState({ hasError: true });
	}

	render() {
		if (this.state.hasError) {
			return (
				<div className="error-boundry">
					<p>Error Boundry</p>
				</div>
			);
		}

		return this.props.children;
	}
}
