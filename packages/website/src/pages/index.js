import React from 'react'

import classnames from 'classnames'
import Layout from '@theme/Layout'
import Link from '@docusaurus/Link'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import useBaseUrl from '@docusaurus/useBaseUrl'
import styles from './styles.module.css'
import CodeBlock from '../components/CodeBlock'
import basicCode from '../code/basic'

function Home() {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="⚛️ useWorker() Hook: Running heavy task in background, without blocking UI"
    >
       <header className={classnames('hero', styles.heroBanner)}>
          <div className="container">
            <div className="row">
              <div className="col col--5">
                <h2 className="hero__title">useWorker()</h2>
                <p className="hero__subtitle">
                  Running heavy task,
                  <strong className="has-emphasis"> without </strong> 
                  blocking UI
                </p>
                <div>
                <Link
                    className={classnames(
                      'button hero--button button--md button--primary responsive-button',
                      styles.button
                    )}
                    to={useBaseUrl('docs/introduction')}
                    style={{ marginTop: 10 }}
                  >
                    Learn More  →
                  </Link>
                  <Link
                    className={classnames(
                      'button hero--button button--md button--secondary button--outline responsive-button',
                      styles.button
                    )}
                    to={'https://icji4.csb.app/sorting'}
                    target="_blank"
                    style={{ marginLeft: 0, marginTop: 10 }}
                  >
                    Try now →
                  </Link>
                </div>
              </div>
              <div className="col col--7">
                <CodeBlock
                  header=""
                  js={basicCode}
                />
              </div>
            </div>
          </div>
        </header>
    </Layout>
  )
}

export default Home
