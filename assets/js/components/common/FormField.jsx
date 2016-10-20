import React, { Component } from 'react';
import {FormGroup, FormControl, ControlLabel} from 'react-bootstrap';

export default class FieldFormControl extends Component {

  render () {

    const { placeholder, type, input, meta} = this.props;

    return (
      <FormGroup controlId={input.name} validationState={meta.error ? 'error' : 'success'}>
        <ControlLabel>{this.props.children}</ControlLabel>
        <FormControl type={type} placeholder={placeholder} value={input.value} onChange={input.onChange} />
        <FormControl.Feedback />
      </FormGroup>
    );
  }
}
