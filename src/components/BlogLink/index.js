import React from 'react';
import Link from 'gatsby-link'
import s from './BlogLink.module.scss'

const BlogLink = ({ to, title, date, excerpt }) => {

  return (
    <article className={s.container}>
      <Link to={to} className={s.banner}>
        <h4 className={s.title}>
          {title}
        </h4>
        <small className={s.date}>
          {date}
        </small>

        <span className={s.icon}>
          ICN
        </span>
      </Link>
      
      <div className={s.excerpt} dangerouslySetInnerHTML={{ __html: excerpt }}></div>
    </article>
  )
}

export default BlogLink;
