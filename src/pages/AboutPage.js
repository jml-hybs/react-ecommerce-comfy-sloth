import React from 'react'
import styled from 'styled-components'
import { PageHero } from '../components'
import aboutImg from '../assets/hero-bcg.jpeg'

const AboutPage = () => {
  return <main>
    <PageHero title='About' />
    <Wrapper className='page section section-center '>
      <img src={aboutImg} alt="image" />
      <article>
        <div className='title'>
          <h2>our story</h2>
          <div className='underline'></div>
        </div>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus inventore tempore unde nulla, tempora commodi odio natus, rerum asperiores, similique ea quas odit modi corporis quae distinctio temporibus ex alias.
          Numquam error quia repellendus reiciendis sit repellat, neque quisquam. Quo illo ullam culpa sapiente voluptatibus, impedit quis sint dolor dolores quia quidem enim provident non ab eum ipsum corporis voluptates!
          Libero provident ut ab ea tempore tenetur quasi, cum voluptates voluptate, explicabo reiciendis aliquam qui magnam nihil maxime! Vitae aliquid consectetur illo delectus voluptatibus necessitatibus beatae totam reiciendis sed quasi.</p>
      </article>
    </Wrapper>
  </main>
}

const Wrapper = styled.section`
  display: grid;
  gap: 4rem;
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }
  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }
  .title {
    text-align: left;
  }
  .underline {
    margin-left: 0;
  }
  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage
