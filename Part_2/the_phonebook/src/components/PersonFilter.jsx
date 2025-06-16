const PersonFilter = ({ value, handler }) => {
  return (
    <div>
      Filter shown with: <input value={value} onChange={handler} />
    </div>
  );
}

export default PersonFilter;