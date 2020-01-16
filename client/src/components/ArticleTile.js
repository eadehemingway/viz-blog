import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const ArticleTile = ({ url, title, updated }) => {
  return (
    <ArticleLink to={url}>
      <ArticleBox>
        <ArticleTitle>{title}</ArticleTitle>
        <UpdatedSignature>{updated}</UpdatedSignature>
      </ArticleBox>
    </ArticleLink>
  )
}

const UpdatedSignature = styled.p`
  color: #5c290c;
  font-size: 16px;
  text-align: right;
`

const ArticleTitle = styled.h2`
  color: #5c290c;
  font-size: 28px;
  text-align: right;
  width: 60%;
`

const ArticleBox = styled.div`
  border-bottom: 1px solid #ffa36f;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 40px;

  &:hover {
    cursor: pointer;
    background: #ffa36f;
    ${ArticleTitle} ,${UpdatedSignature} {
      color: white;
    }
  }
`

const ArticleLink = styled(Link)`
  width: 100%;
  height: 100%;
  text-decoration: none;
  cursor: pointer;
`
