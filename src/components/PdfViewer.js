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
          initialDoc: fileUrl || 'https://pdftron.s3.amazonaws.com/downloads/pl/demo-annotated.pdf'
        },
        viewer.current
      )
        .then(instance => {
          const { docViewer } = instance
          console.log(docViewer)
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
