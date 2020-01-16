import React from 'react'
import { ArticlePage, ArticleTitle } from './../SharedStyledComponents'
import arrow from './../assets/left-arrow.svg'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

export const ArticleTemplate = ({ children, title }) => {
  return (
    <ArticlePage className="page-container page">
      <LinkStyled to="/">
        {' '}
        <Arrow src={arrow} />
      </LinkStyled>
      <ArticleTitle>{title}</ArticleTitle>
      {children}
    </ArticlePage>
  )
}

const Arrow = styled.img`
  width: 50px;
  margin-left: 10px;
`

const LinkStyled = styled(Link)`
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
`
