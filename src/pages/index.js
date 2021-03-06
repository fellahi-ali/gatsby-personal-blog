import React from 'react'
import get from 'lodash/get'
import Quote from './../components/Quote'
import HomepageArticle from './../components/HomepageArticle'
import Timeline from './../components/TwitterTimeline'
import profile_pic from './../components/Bio/profile-pic.jpg'
import Head from './../components/Head'

import home_img_1 from './homepage_1.jpg'
import home_img_2 from './homepage_2.jpg'
import home_img_3 from './homepage_3.jpg'

import s from './homepage.module.scss'
import s_page from './../layouts/page.module.scss'

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      twitter: false
    };
  }

  get_placeholder_items = () => {
    const item_1 = (
      <img key='item1' className={`${s.grid_img} ${s.row_1} ${s.column_1}`} src={home_img_1} alt="" />
    );

    const item_2 = (
      <img key='item2' className={`${s.grid_img} ${s.row_2} ${s.column_2}`} src={home_img_2} alt="" />
    );

    const item_3 = (
      <img key='item3' className={`${s.grid_img} ${s.row_1} ${s.column_1}`} src={home_img_3} alt="" />
    );

    const item_4 = (
      <div key='item4' className={`${s.grid_quote} ${s.row_1} ${s.column_2}`}>
        "In the face of life's absurdity and horror, the only true weapon is our wit and observations."
      </div>
    );

    const item_5 = (
      <a key='item6' href="https://www.notebook.maxwellantonucci.com" target="_blank" rel="noopener" className={`${s.grid_studyRepo} ${s.row_1} ${s.column_1}`}>
        <h3>
          Online Notebook
        </h3>

        <small>
          Notes I've taken on programming, front-end development, nonfiction, fiction, and whatever else.
        </small>
      </a>
    );

    const timeline = (
      <Timeline />
    );

    const quotes = (
      <article key='quotes' className={s.quotes}>
        <Quote />
      </article>
    );

    return [item_1, item_2, item_3, item_4, item_5, quotes, timeline];
  }

  get_writing_items = () => {
    let writing_items = [];
    const post_data = get(this, 'props.data.allMarkdownRemark.edges'),
          article_data = get(this, 'props.data.allArticlesYaml.edges[0].node.articles').slice(0, 3),
          all_data = post_data.concat(article_data);

    const random_chance = (limit) => limit <= Math.floor((Math.random() * 10) + 1);

    all_data.forEach(function(post, i) {

      const is_article = (post.node === undefined) ? true : false,
            link = is_article ? post.link : post.node.frontmatter.path,
            title = is_article ?  post.name : post.node.frontmatter.title,
            is_note = (!is_article && post.node.frontmatter.postType === "note") ? true : false,
            item_class = (is_note ? s.notes_item : s.article_item),
            excerpt = is_article ?  post.description : post.node.frontmatter.excerpt,
            has_excerpt = (!is_note && random_chance(5) ? excerpt : false),
            is_row_size = random_chance(5) ? true : false,
            type_class = is_article ? s.article_type : (is_note ? s.note_type : s.blog_type),
            row_class = ((has_excerpt && is_row_size) ? (s.row_2) : (s.row_1)),
            column_class = ((has_excerpt && !is_row_size) ? (s.column_2) : (s.column_1));

      let post_data = {
        is_article: is_article,
        item_class: item_class,
        type_class: type_class,
        title: title,
        excerpt: (has_excerpt ? excerpt : false),
        link: link,
        row: row_class,
        column: column_class
      };

      writing_items.push(post_data);
    });

    const article_list = writing_items.map(function(article, i){
      return (
        <HomepageArticle
          classes={`${article.item_class} ${article.type_class} ${article.row} ${article.column}`}
          key={i}
          title={article.title}
          excerpt={article.excerpt || false}
          link={article.link}
          external={article.is_article} />
      );
    });

    return article_list;
  }

  // Also add one of two of the imagination-esque images here?
  // Find a way to tap into Twitter's API and show a recent tweet?

  render() {
    this.get_writing_items();

    const tagline = "Journalist turned Full-time Coder, Part-time Ponderer",
          writing_items = this.get_writing_items(),
          placheolder_items = this.get_placeholder_items(),
          all_items = writing_items.concat(placheolder_items),
          shuffled_items = shuffle(all_items);



    return (
      <div>
        <Head
          url_path={this.props.location.pathname}
          tagline={tagline}
        />

        <div className={s.title}>
          <div>
            I’m Max Antonucci, a front-end developer living and working in New Haven, CT. Writing is most of my life, whether it’s code, words, or tweets. The rest is reading, boxing, philosophizing, and often breathing.
          </div>
        </div>

        <div className={s_page.content_large}>
          <section className={s.grid}>
            <img
              className={s.image}
              src={profile_pic}
              alt="Cartoon version of myself for my avatar"
            />

            {shuffled_items}
          </section>
        </div>
      </div>
    )
  }
}

export default Homepage

export const pageQuery = graphql`
  query HomepageQuery {
    allMarkdownRemark(
      limit: 8,
      sort: { fields: [frontmatter___date], order: DESC }
    ){
      edges {
        node {
          excerpt
          html
          frontmatter {
            postType
            title
            icon
            path
            excerpt
            date
          }
        }
      }
    }
    allArticlesYaml {
      edges {
        node {
          articles {
            name
            date
            link
            description
          }
        }
      }
    }
  }
`

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
