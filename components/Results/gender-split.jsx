const GenderSplit = ({ data }) => {
  const male = data.filter(d => d.category.toLowerCase() === "men").length;
  const female = data.filter(d => d.category.toLowerCase() === "women").length;
  const other = male + female - data.length;

  const percentage = val => Math.round((val / data.length) * 100) + "%";

  return (
    <div>
      <p>Male: {percentage(male)}</p>
      <p>Female: {percentage(female)}</p>
      {other > 0 && <p>N/A: {percentage(other)}</p>}
    </div>
  );
};

export default GenderSplit;
