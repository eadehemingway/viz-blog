import React from 'react'

import { ArticleTile } from './../components/ArticleTile'
import styled from 'styled-components'
import './homePageStyle.scss'

export const ArticleList = () => {
  return (
    <div className="page-container page">
      <TitleBox>
        <H1>
          Visual <br />
          Information
        </H1>
        <H2>By Eade Hemingway</H2>
      </TitleBox>

      <ArticleTile
        url="/article-one"
        title="Female Political Represtentation Worldwide"
        updated="Jan 2020"
      />

      <ArticleTile
        url="/article-two"
        title="Progress in Post Political Africa"
        updated="Jan 2020"
      />
      <Creditations>
        Icons made by
        <a href="https://www.flaticon.com/authors/lyolya" title="Lyolya">
          Lyolya
        </a>
        from
        <a href="https://www.flaticon.com/" title="Flaticon">
          www.flaticon.com
        </a>
      </Creditations>
    </div>
  )
}

const TitleBox = styled.div`
  border-bottom: 1px solid #ffa36f;
  padding-left: 60px;
  height: 250px;
`

const H2 = styled.h2`
  font-size: 18px;
  color: #ff5c00;
  margin-bottom: 40px;
`
const H1 = styled.h1`
  text-transform: uppercase;
  font-size: 36px;
  color: #ff5c00;
  margin-top: 70px;
  margin-bottom: 60px;
`
const Creditations = styled.div`
  color: #ffa36f;

  & a {
    color: #ffa36f;
    font-size: 12px;
    text-align: right;
  }
`
