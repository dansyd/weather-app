import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';

const AddWidget = (props) => {

  const inputProps = {
    value: props.addTerm,
    onChange: props.onAddTermChange,
    placeholder: 'Add new location',
    autoFocus: true,
    required: true
  }

  const options = {
    types: ['(cities)']
  }

  const myStyles = {
    root: { width: '90%', display: 'inline-block', margin: '1em' },
  }

  return (
    <form onSubmit={props.onSubmit}>
      <PlacesAutocomplete inputProps={inputProps} styles={myStyles} options={options} />
      <button type="submit" className="add-widget-submit">Add</button>
    </form>
  );
}

export default AddWidget;
