import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'; // reduxForm is a function, similar to the connect helper from react-redux
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component {
    
    // field has event handlers we need to wire up for the jsx that's being returned
    renderField(field) {
        const { meta: { touched, error } } = field; // using destructuring; pulling off touched and meta from meta object
        const className = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={className}>
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input} // you want all of the properties here to be communicated to the Input tag (e.g. onchange, onfocus)
                />
                <div className="text-help">
                    {touched ? error : ''} 
                </div>
            </div> // field.meta.error is added via the validate function
            // we use .touched above, to check when a user has tabbed out of a control and has considered it complete
        );
    }

    onSubmit(values) {
        // values reflects values from forms; this === component
        this.props.createPost(values);
    }

    render() {
        // reduxForm is wired up at bottom - it adds additional properties to our PostsNew component - in this case, it's handleSubmit
        const { handleSubmit } = this.props;

        return (
            // handleSubmit runs redux-form side of things; if good, then call callback function to handle any custom api calls, saving to a backend server, etc.
            // we bind this to ensure that we have the right context of the form
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field 
                    label="Title" // this is a custom property that will be passed to the field object
                    name="title"
                    component={this.renderField} 
                />
                <Field 
                    label="Categories"
                    name="categories"
                    component={this.renderField} 
                />  
                <Field 
                    label="Post Content"
                    name="content"
                    component={this.renderField} 
                />    
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to="/" className="btn btn-danger">Cancel</Link>
            </form>
        );
    }
}

// used to validate all the fields; values shows different values entered in form - title, categories, content
function validate(values) {
    const errors = {};

    // if errors object has property of title, it bounds to name property of Field component

    // validate the inputs from 'values'
    if (!values.title|| values.title.length < 3) {
        errors.title = "Please enter a title that is at least 3 characters!";
    }

    if (!values.categories) {
        errors.categories = "Enter some categories!";
    }
    
    if (!values.content) {
        errors.content = "Enter some content!";
    }

    // if empty, form is valid
    // if has any properties, redux form assumes invalid
    return errors;
}

export default reduxForm({
    validate,
    form: 'PostsNewForm' // form property is name of the form - caters for multiple forms on the same page; will manage state correctly
})(
    connect(null,{ createPost })(PostsNew)
);