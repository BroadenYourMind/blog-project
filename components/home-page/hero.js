import Image from "next/image";
import classes from "./hero.module.css";

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/max.jpg"
          alt="An image showing Ivan"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I`m Bob</h1>
      <p>
        I blog about webdevelopment - especially about frontend frameworks like
        React.
      </p>
    </section>
  );
}

export default Hero;
