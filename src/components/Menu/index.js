import React from 'react'
import Link from 'gatsby-link'
import s from './Menu.module.scss'

class Menu extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
  }

  toggle_expansion = () => {
    let current_exp = this.state.expanded,
        new_exp     = !current_exp;

    this.setState({
      expanded: new_exp
    });
  }

  make_menu_items = () => {
    const menu_items = this.props.data;

    return menu_items.map((menu, i) => (
        <li key={i} className={s.list_item}>
          <Link to={menu.link}>
            {menu.name}
          </Link>
        </li>
      )
    );
  }

  get_menu_classes = () => {
    const is_vertical = this.props.vertical,
          vertical_classes = is_vertical ? s.vertical : s.horizontal,
          expanded_classes = this.state.expanded ? s.expanded : s.collapsed;

    return `${s.list} ${vertical_classes} ${expanded_classes}`;
  }

  render() {

    const menu_items = this.make_menu_items(),
          classes = this.get_menu_classes();

    return (
      <div className={s.container}>
        <span className={s.toggle} onClick={() => this.toggle_expansion()}>
          Toggle
        </span>
        <ul className={classes}>
          {menu_items}
        </ul>
      </div>
    )
  }
}

export default Menu
