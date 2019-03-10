import { Mutation } from 'react-apollo'
import ContentGenaralForm from './forms/contentGeneral'
import UPDATE_CONTENT from '../queries/contentUpdate.gql'

export default ({ content }) => (
  <Mutation mutation={UPDATE_CONTENT}>
    {(update, { error: errorUpdate, client: clientUpdate }) => (
      <ContentGenaralForm onSubmit={async (values) => {
        const res = await update({ variables: { input: values } })
        console.log(res)
        return clientUpdate.writeData({ data: {
          content: {
            ...res.data.updateContent
          }
        }})
      }} content={content} />
    )}
  </Mutation>
)
