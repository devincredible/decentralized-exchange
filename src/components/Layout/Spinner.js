const Spinner = (props) => {
  if(props.type === 'table') {
    return(
      <tbody>
        <tr className="spinner-border text-light text-center"></tr>
      </tbody>
    );
  } else {
    return(
      <div className="spinner-border text-light text-center"></div>
    );    
  }
};

export default Spinner;