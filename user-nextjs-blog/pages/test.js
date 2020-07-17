import React from 'react';
import Link from 'next/link';
import Head from 'next/head';
import {loadFirebase} from '../lib/db.js'

export default class index extends React.Component {

  static async getInitialProps() {
    let firebase = await loadFirebase() 
    let result = await new Promise((resolve, reject) => {
      firebase.firestore().collection('job')
        .limit(10)
        .get()
        .then(snapshot => {
          let data = []
          snapshot.forEach((doc) => {
            data.push(
              Object.assign({
                id: doc.id
              }, doc.data())
            )
          })
          console.log("Hello")
          console.log(data)
          resolve(data)
        })
      .catch(error => {
        reject([])
      })
    })
    console.log(result)
    return {job: result}
  }

  render() {
    const job = this.props.job
    return (
    <html>
      <Head>
        <title>Job Seeker-Home</title>
    </Head>
    <body>
        {(job && job.length > 0) ?
            <ul>
              {job.map(Job => <li key="Job.id"><h3>{Job.jobName} of Phone Number is {Job.Phone}</h3></li>)}
            </ul>
            : <p>Nothing!!</p>
        }
    </body>
    </html>
    )
  }
}