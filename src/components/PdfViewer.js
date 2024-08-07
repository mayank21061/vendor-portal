import { CircularProgress } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

export default function PdfViewer({ fileUrl }) {
  console.log(fileUrl)
  let viewer = useRef(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    import('@pdftron/webviewer').then(() => {
      WebViewer(
        {
          path: '/webviewer/lib',
          licenseKey: 'demo:1723009532106:7e7959410300000000cea9ba88d3d46cbf78c57e456d68bdacb7905378',
          initialDoc: fileUrl || '/sample.pdf'
        },
        viewer.current
      )
        .then(instance => {
          console.log(instance)
          const { DocumentViewer } = instance.Core
          // DocumentViewer?.zoomTo(1)
          setLoading(false)
          // you can now call WebViewer APIs here...
        })
        .catch(e => console.log(e))
    })
    return () => {
      viewer = null
    }
  }, [])

  return (
    <>
      {loading && (
        <div
          style={{
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <CircularProgress />
        </div>
      )}
      <div className='MyComponent' style={{ height: '100%' }}>
        <div className='webviewer' ref={viewer} style={{ height: '100%' }}></div>
      </div>
    </>
  )
}
