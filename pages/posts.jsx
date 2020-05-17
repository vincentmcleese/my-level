import useSwr from 'swr'
import Link from 'next/link'
import { useCurrentUser } from '../lib/hooks';
import PostCard from '../components/Card'
import { Row, Col, Spinner, Button } from 'reactstrap';
import Loading from '../components/Loading'

const fetcher = url => fetch(url).then(res => res.json())

const match = (words, knownWords) => {
  console.log(words)
  
  const totalWords = words.length
  const matchArray = words.map(word => knownWords.includes(word))
  const totalMatch = matchArray.filter(v => v).length
  const comprehension = ( totalMatch / totalWords ) * 100
  return Math.round(comprehension)
}

export default function Index() {
  const [user] = useCurrentUser();
  const { data, error } = useSwr('/api/posts', fetcher)

  if (!user) return <div>Please log in...</div>
  if (error) return <div>Failed to load posts</div>
  if (!data) return ( <Loading />)

  return (
    <>
    <Row>
    <Link href="/addPost">
       <Button>Add more content</Button>
    </Link>
    </Row>
    
    <Row xs="4">

            {data.map(post => (      
                <Col>
                <Link href="/posts/[id]" as={`/posts/${post._id}`}><a className="clean-link"><PostCard key={post._id} postID={post._id} title={post.title} comprehension={match([].concat(...post.onlyChinese), user.words)} /></a></Link>
                </Col>
            ))}

    </Row>
    </>
  )

}