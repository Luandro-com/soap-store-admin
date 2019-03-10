import React from 'react'
import Router from 'next/router'
import { Query, Mutation } from 'react-apollo'
import { withRouter } from 'next/router'

import CREATE_ISSUE from '../queries/issueCreate.gql'
import UPDATE_ISSUE from '../queries/issueUpdate.gql'
import ISSUE from '../queries/issue.gql'
import ALL_ISSUES_LOCAL from '../queries/allIssuesLocal.gql'
import ISSUE_PUBLISH_CALL from '../queries/issuePublishCall.gql'
import ISSUE_PUBLISH from '../queries/issuePublish.gql'

import IssueForm from '../components/forms/issue'
import App from '../components/App'
import Loading from '../components/Loading'

const IssueEdit = ({ router: { query: { key } } }) => {
  return (
    <App>
      {!key && <Mutation mutation={CREATE_ISSUE}>
        {(createIssue, { error: errorCreateIssue, client: clientCreate }) => {
          return (
            <IssueForm
              onSubmit={async (values) => {
                const res = await createIssue({ variables: { input: values } })
                console.log('CREATE RES', res)
                if (errorCreateIssue) console.log('ERROR do something...', errorCreateIssue)
                // const { allIssues } = clientCreate.cache.readQuery({ query: ALL_ISSUES_LOCAL})
                // clientCreate.writeData({ data: {
                //   allIssues: Object.assign(allIssues, res.data.createIssue)
                // }})
                Router.push('/issues')
              }}
            />
          )
        }}
      </Mutation>}
      {key && 
        <Query query={ISSUE} variables={{ issueKey: key }}>
          {({ loading: loadingIssue, error: errorIssue, data: dataIssue }) => {
            if (loadingIssue) return <Loading />
            return (
              <Mutation mutation={UPDATE_ISSUE}>
                {(updateIssue, { error: errorupdateIssue, client: clientUpdate }) => {
                  return (
                    <Mutation mutation={ISSUE_PUBLISH_CALL}>
                      {(publishIssueCall, { error: errorPublishCall, client: clientPublishCall }) => (
                        <Mutation mutation={ISSUE_PUBLISH}>
                          {(publishIssue, { error: errorPublish, client: clientPublish }) => (
                            <IssueForm
                              onSubmit={async (values) => {
                                // console.log('VALUES', values)
                                const res = await updateIssue({ variables: { input: values, issueId: dataIssue.issue.id } })
                                // console.log(res)
                                if (errorupdateIssue) console.log('ERROR do something...')
                                // const localData = clientUpdate.cache.readQuery({ query: ALL_ISSUES_LOCAL})
                                // console.log('Local', localData)
                                // clientUpdate.writeData({ data: {
                                //   issue: res.data.updateIssue
                                // }})
                                Router.push('/issues')
                              }}
                              issue={dataIssue.issue}
                              publishCall={publishIssueCall}
                              publish={publishIssue}
                            />
                          )}
                        </Mutation>
                      )}
                    </Mutation>
                  )
                }}
              </Mutation>
            )
          }}
        </Query>
      }
    </App>
  )
}

export default withRouter(IssueEdit)