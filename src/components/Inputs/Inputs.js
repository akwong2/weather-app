import React from 'react'

const inputs = (props) => {
  return (
    <div className={"Input"}>
      <form onSubmit={props.submit}>
        <input 
          type="text" 
          value={props.city} 
          name="city"
          placeholder="City"
          onChange={props.change} />
        <input 
          type="text"
          value={props.country}
          name="country"
          placeholder="Country"
          onChange={props.change} />
        <input 
          type="submit"
          value="Submit" />
      </form>
    </div>
  )
};

export default inputs;