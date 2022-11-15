import classes from "./Card.module.css";

const Card = (props) => {
  return (
    <section className={`${classes.card} ${props.className}`} style={props.style}>
      {props.children}
    </section>
  );
};

export default Card;
