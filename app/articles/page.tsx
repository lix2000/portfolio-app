import { Card, Title } from '@components'
import { articleMock } from '@lib/settings'

const Articles = () => {
  //to do remove this when api is ready
  const articles = articleMock
  return (
    <div className='w-full h-full pt-[60px] flex flex-col items-center '>
      <Title>Articles</Title>
      <div className='w-fill h-fill min-w-[310px] max-w-[1040px] m-10 '>
        <div className='w-full flex flex-row flex-wrap gap-4 justify-center'>
          {articles.map((article, index) => (
            <Card key={index} {...{ ...article, delay: index * 1000 }} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Articles
