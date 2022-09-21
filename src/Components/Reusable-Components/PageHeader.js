import classes from './PageHeader.module.css';

function PageHeader(props) {
  return (
    <section className={classes.sectionContainer}>
      <div className={classes.headerContainer}>
        <h1 className={classes.header}>{props.headerContent}</h1>
      </div>
      {props.children}
    </section>
  );
}

export default PageHeader;