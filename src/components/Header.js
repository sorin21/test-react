import React from 'react';
import classes from './Header.scss';

const Header = (props) => {
  return (
    <div className={classes.header}>
      < div className={classes.container} >
        <h1 className={classes.header__title}>{props.title}</h1>
        {props.subtitle && <h2 className={classes.header__subtitle}>{props.subtitle}</h2>}
      </div>
    </div>
  );
}

Header.defaultProps = {
  title: 'some default'
}

export default Header;
