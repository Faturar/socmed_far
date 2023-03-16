// Components
import ClientComponent from './ClientComponent'
import Posts from './Posts'

export default async function Page() {
  return (
      <ClientComponent>
        <Posts />
      </ClientComponent>
  )
}
