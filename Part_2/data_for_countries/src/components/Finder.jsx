const Finder = ({ value, handler }) => {
    console.log('Finder component rendered with value:', value);
    return (
      <div>
        Country finder: <input value={value} onChange={handler} />
      </div>
    );
  }
  
  export default Finder;