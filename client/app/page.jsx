// Components
import ClientComponent from './ClientComponent'
import Loading from './components/Loading'
import Posts from './components/Posts'

export default async function Page() {
  return (
    <>
      <Loading />
      <ClientComponent>
        <Posts />
      </ClientComponent>
    </>
  )
}
