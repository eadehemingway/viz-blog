import React from "react";
import { ArticleTemplate } from "./../components/ArticleTemplate";
import { ArtOneMatrix } from "../components/ArtOneMatrix";
import { ArtOneMap } from "../components/ArtOneMap";
export class ArticleOne extends React.Component {
  render() {
    return (
      <ArticleTemplate title="Female Political Represtentation Worldwide">
        <ArtOneMatrix />
        <ArtOneMap />
        {/* <div>
          Icons made by{' '}
          <a
            href="https://www.flaticon.com/authors/those-icons"
            title="Those Icons"
          >
            Those Icons
          </a>{' '}
          from{' '}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div> */}
      </ArticleTemplate>
    );
  }
}
