import Footer from '@/components/Footer/Footer'
import NavbarWithMegaMenu from '@/page-sections/AdminPage/Navbar'
import React, { Fragment, useEffect, useState } from 'react'
import { TagTable } from '@/page-sections/AdminPage/TagTable'

const TagsPage: React.FC = () => {
  const [tags, setTags] = useState<
    Array<{
      id: number
      title: string
      description: string
    }>
  >([])

  useEffect(() => {
    const fetchData = async () => {
      let endpoint = `/api/tags`
      const res = await fetch(endpoint, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      setTags(
        data.map((tag: { id: number; title: string; description: string }) => {
          return {
            id: tag.id,
            title: tag.title,
            description: tag.description,
          }
        })
      )
    }
    fetchData()
  }, [])

  return (
    <Fragment>
      <NavbarWithMegaMenu />
      <div>
        <TagTable tags={tags} />
      </div>
      <Footer />
    </Fragment>
  )
}

export default TagsPage
