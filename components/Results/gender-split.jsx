export default ({ data }) => {
  const male = data.filter((d) => d.category === "Men").length;
  const female = data.filter((d) => d.category === "Women").length;
  const other = male + female - data.length;

  const percentage = (val) => Math.round((val / data.length) * 100) + "%";

  return (
    <div>
      <h3>Gender</h3>
      <p>Male: {percentage(male)}</p>
      <p>Female: {percentage(female)}</p>
      {other > 0 && <p>N/A: {percentage(other)}</p>}
    </div>
  );
};
